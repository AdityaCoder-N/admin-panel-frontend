import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PropTypes from 'prop-types';
import axios from 'axios';

// Zod schema for validation
const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['user', 'admin'], { errorMap: () => ({ message: 'Role must be either user or admin' }) }),
});

const EditUserModal = ({ isOpen, onClose, user, refreshUsers }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('role', user.role);
    }
  }, [setValue, user]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:3000/users/${user.id}`, data);
      refreshUsers(); 
      onClose(); 
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
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

          <div className="mb-4">
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

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded"
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }),
  refreshUsers: PropTypes.func.isRequired,
};

export default EditUserModal;
