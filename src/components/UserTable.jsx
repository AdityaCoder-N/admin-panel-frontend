import { useEffect, useState } from 'react';
import axios from 'axios';
import { Edit, Trash, Search, UserPlus } from 'lucide-react';

import AddUserModal from './modals/AddUserModal';
import DeleteUserModal from './modals/DeleteUserModal';
import EditUserModal from './modals/EditUserModal';
import ViewUserModal from './modals/ViewUserModal';

const UserTable = () => {

  // States to handle modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchRole, setSearchRole] = useState('');

  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const openViewModal = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.log('Error fetching users', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filterUsers = users.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchName.toLowerCase()) &&
        user.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
        user.role.toLowerCase().includes(searchRole.toLowerCase())
      );
    });

    setFilteredUsers(filterUsers);
  }, [searchName, searchEmail, searchRole, users]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-md shadow-lg">
          <thead>
            <tr className="w-full bg-violet-600 text-white text-left">
              <th className="py-4 px-6">Name</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Role</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
            <tr className="bg-violet-200">
              <th className="py-2 px-6">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-2 rounded-md border-2 border-violet-500 focus:outline-none focus:border-violet-700"
                    placeholder="Search Name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                  <Search className="absolute right-2 top-2 text-violet-700" size={18} />
                </div>
              </th>
              <th className="py-2 px-6">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-2 rounded-md border-2 border-violet-500 focus:outline-none focus:border-violet-700"
                    placeholder="Search Email"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                  />
                  <Search className="absolute right-2 top-2 text-violet-700" size={18} />
                </div>
              </th>
              <th className="py-2 px-6">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-2 rounded-md border-2 border-violet-500 focus:outline-none focus:border-violet-700"
                    placeholder="Search Role"
                    value={searchRole}
                    onChange={(e) => setSearchRole(e.target.value)}
                  />
                  <Search className="absolute right-2 top-2 text-violet-700" size={18} />
                </div>
              </th>
              <th className="py-2 px-6 flex justify-end">
                <button className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 rounded-lg px-3 py-2 text-white" onClick={() => setIsAddModalOpen(true)}>
                  Add User
                  <UserPlus className="h-5 w-5 text-white" />
                </button>
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-violet-100 transition-all"
                onClick={() => openViewModal(user)} 
              >
                <td className="py-4 px-6">{user.name}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6">{user.role}</td>
                <td className="py-4 px-6 text-right">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded mr-2 inline-flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(user);
                    }}
                  >
                    <Edit size={16} className="mr-1" /> Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded inline-flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      openDeleteModal(user.id);
                    }}
                  >
                    <Trash size={16} className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        refreshUsers={fetchData}
      />}
      {isDeleteModalOpen && <DeleteUserModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        userId={selectedUserId}
        refreshUsers={fetchData}
      />}
      {isEditModalOpen && <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
        refreshUsers={fetchData}
      />}
      {isViewModalOpen && <ViewUserModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        user={selectedUser}
      />}
    </div>
  );
};

export default UserTable;
