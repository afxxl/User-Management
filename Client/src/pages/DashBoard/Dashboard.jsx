import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  addUser,
} from "../../utils/adminSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state.admin);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({ username: "", email: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [newUserForm, setNewUserForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(getAllUsers(search));
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search, dispatch]);

  const handleSaveClick = () => {
    dispatch(updateUser({ id: editingUserId, ...editForm }));
    setEditingUserId(null);
    setEditForm({ username: "", email: "" });
  };

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setEditForm({ username: user.username, email: user.email });
  };

  const handleDeleteClick = (user) => {
    dispatch(deleteUser(user._id));
  };

  if (isLoading)
    return <p className="text-center text-gray-600">Loading users...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search Here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => dispatch(getAllUsers(search))}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          + Add User
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Add New User</h2>
            <input
              type="text"
              placeholder="Username"
              value={newUserForm.username}
              onChange={(e) =>
                setNewUserForm({ ...newUserForm, username: e.target.value })
              }
              className="w-full border border-gray-300 p-2 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUserForm.email}
              onChange={(e) =>
                setNewUserForm({ ...newUserForm, email: e.target.value })
              }
              className="w-full border border-gray-300 p-2 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUserForm.password}
              onChange={(e) =>
                setNewUserForm({ ...newUserForm, password: e.target.value })
              }
              className="w-full border border-gray-300 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  dispatch(addUser(newUserForm));
                  setIsModalOpen(false);
                  setNewUserForm({ username: "", email: "", password: "" });
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user._id}
            className="flex items-center justify-between bg-white shadow rounded-lg p-4 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <img
                className="w-12 h-12 rounded-full object-cover border"
                src={
                  user.profilePic
                    ? user.profilePic
                    : "../../../public/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg"
                }
                alt={user.username + " profile pic"}
              />
              {editingUserId === user._id ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={editForm.username}
                    onChange={(e) =>
                      setEditForm({ ...editForm, username: e.target.value })
                    }
                    className="border border-gray-300 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                    className="border border-gray-300 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ) : (
                <span className="text-gray-800 font-medium">
                  {user.username} - {user.email}{" "}
                  {user.isAdmin && (
                    <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded ml-2">
                      Admin
                    </span>
                  )}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              {editingUserId === user._id ? (
                <>
                  <button
                    onClick={handleSaveClick}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingUserId(null)}
                    className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditClick(user)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(user)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
