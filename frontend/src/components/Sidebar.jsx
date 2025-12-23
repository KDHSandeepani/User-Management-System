import { Link, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    /*token / session clear karanna (thiyenawanam)*/
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    /*login page ekata redirect*/
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2>User Management System</h2><br></br>
      
        <Link to="/dashboard"> Dashboard</Link><br></br><br></br>
        <Link to="/users">View Users</Link>

        {/* LOGOUT */}
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Sidebar;