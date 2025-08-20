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

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <input
        type="text"
        placeholder="Search Here..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={() => dispatch(getAllUsers(search))}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Search
      </button>{" "}
      <button onClick={() => setIsModalOpen(true)}>+ Add User</button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <input
              type="text"
              placeholder="Username"
              value={newUserForm.username}
              onChange={(e) =>
                setNewUserForm({ ...newUserForm, username: e.target.value })
              }
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUserForm.email}
              onChange={(e) =>
                setNewUserForm({ ...newUserForm, email: e.target.value })
              }
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUserForm.password}
              onChange={(e) =>
                setNewUserForm({ ...newUserForm, password: e.target.value })
              }
              className="w-full border p-2 mb-4 rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  dispatch(addUser(newUserForm));
                  setIsModalOpen(false);
                  setNewUserForm({ username: "", email: "", password: "" });
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <img
              className="w-10 h-10 rounded-full"
              src={
                user.profilePic
                  ? user.profilePic
                  : "../../../public/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg"
              }
              alt={user.username + " profile pic"}
            />
            {editingUserId === user._id ? (
              <>
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) =>
                    setEditForm({ ...editForm, username: e.target.value })
                  }
                />
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                />
                <button onClick={handleSaveClick}>Save</button>
                <button onClick={() => setEditingUserId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>
                  {user.username} - {user.email} {user.isAdmin ? "(Admin)" : ""}
                </span>
                <button onClick={() => handleEditClick(user)}>Edit</button>
                <button onClick={() => handleDeleteClick(user)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
