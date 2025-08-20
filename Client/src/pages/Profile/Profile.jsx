import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../utils/authSlice";

const Profile = () => {
  const { user, isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    profilePic: user?.profilePic || "",
  });
  const [preview, setPreview] = useState(user?.profilePic || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ ...formData, id: user._id }))
      .unwrap()
      .then(() => setIsEditing(false))
      .catch(() => {});
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-6 mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        My Account
      </h1>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col items-center">
            <img
              src={
                preview ||
                "../../../public/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg"
              }
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-md mb-3"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setFormData({ ...formData, profilePic: file });
                  setPreview(URL.createObjectURL(file));
                }
              }}
              className="text-sm text-gray-600"
            />
          </div>

          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4 text-gray-700 text-center">
          <img
            src={
              user?.profilePic ||
              "../../../public/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg"
            }
            alt="User Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-md mx-auto"
          />

          <p>
            <span className="font-medium">Username:</span> {user?.username}
          </p>
          <p>
            <span className="font-medium">Email:</span> {user?.email}
          </p>

          <button
            onClick={() => setIsEditing(true)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-center mt-4 font-medium">{error}</p>
      )}
    </div>
  );
};

export default Profile;
