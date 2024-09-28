import PropTypes from 'prop-types';

const ViewUserModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-violet-600 mb-4 text-center">User Details</h2>
        <div className="mb-3">
          <strong >ID:</strong> <span className="text-gray-700 ml-2">{user.id}</span>
        </div>
        <div className="mb-3">
          <strong >Name:</strong> <span className="text-gray-700 ml-2">{user.name}</span>
        </div>
        <div className="mb-3">
          <strong >Email:</strong> <span className="text-gray-700 ml-2">{user.email}</span>
        </div>
        <div className="mb-3">
          <strong >Role:</strong> <span className="text-gray-700 ml-2">{user.role}</span>
        </div>
        <div className="mb-3">
          <strong >Created At:</strong> <span className="text-gray-700 ml-2">{new Date(user.createdAt).toLocaleString()}</span>
        </div>
        <div className="mb-3">
          <strong >Updated At:</strong> <span className="text-gray-700 ml-2">{new Date(user.updatedAt).toLocaleString()}</span>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

ViewUserModal.propTypes = {
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
};

export default ViewUserModal;
