import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
