import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../utils/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">
        <Link to="/">MyApp</Link>
      </div>
      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link
              to="/login"
              className="px-3 py-2 rounded-lg hover:bg-blue-500 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-2 rounded-lg hover:bg-blue-500 transition"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="font-medium">Welcome, {user.username}</span>
            <Link
              to="/profile"
              className="px-3 py-2 rounded-lg hover:bg-blue-500 transition"
            >
              Profile
            </Link>
            <button
              onClick={() => dispatch(logout())}
              className="px-3 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
