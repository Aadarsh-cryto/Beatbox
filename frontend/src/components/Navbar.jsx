import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  // user stored after login
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar">

      {/* LOGO */}
     <Link to="/" className="logo">
  🎧 BeatBox
</Link>



      {/* LEFT LINKS */}
      <div className="nav-links">
        <Link to="/" className="link">Home</Link>

        {user?.role === "artist" && (
          <Link to="/upload" className="link">Upload</Link>
        )}

        {user?.role === "artist" && (
          <Link to="/create-album" className="link">Create Album</Link>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-actions">

        {/* NOT LOGGED IN */}
        {!user && (
          <>
            <Link to="/login" className="auth-btn">Login</Link>
            <Link to="/register" className="auth-btn">Register</Link>
          </>
        )}

        {/* LOGGED IN */}
        {user && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}

      </div>
    </div>
  );
}

export default Navbar;