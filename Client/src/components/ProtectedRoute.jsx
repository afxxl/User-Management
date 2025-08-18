import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return navigate("/");
  }
  return children;
};

export default ProtectedRoute;
