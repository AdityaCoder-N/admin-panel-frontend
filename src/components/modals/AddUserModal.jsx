import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import PropTypes from "prop-types";

const addUserSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  role: z.enum(['user', 'admin'], { errorMap: () => ({ message: 'Role must be either user or admin' }) }),
});

const AddUserModal = ({ isOpen, onClose, refreshUsers }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addUserSchema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3000/users", data);
      refreshUsers(); 
      onClose(); 
      reset(); 
    } catch (error) {
      console.error("Error adding user", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md w-[400px]">
        <h2 className="text-2xl mb-4">Add New User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              {...register("name")}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-violet-700"
              placeholder="Enter name"
            />
            {errors.name && <p className="text-red-600">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              {...register("email")}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-violet-700"
              placeholder="Enter email"
            />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium">Role</label>
            <select
                {...register("role")}
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-violet-700"
            >
                <option value="" disabled>Select role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            {errors.role && <p className="text-red-600">{errors.role.message}</p>}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-md"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddUserModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,        
    onClose: PropTypes.func.isRequired,      
    refreshUsers: PropTypes.func.isRequired,  
};

  

export default AddUserModal;
