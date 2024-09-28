import axios from "axios";
import PropTypes from "prop-types";

const DeleteUserModal = ({ isOpen, onClose, userId, refreshUsers }) => {

    console.log("User id : ",userId)
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      refreshUsers(); 
      onClose();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-[400px]">
        <h2 className="text-2xl mb-4">Delete User</h2>
        <p className="mb-6">
          Are you sure you want to delete this user? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteUserModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    refreshUsers: PropTypes.func.isRequired,
};

export default DeleteUserModal;
