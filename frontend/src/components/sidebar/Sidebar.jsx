// Dependencies
import { Link } from "react-router-dom";
// State

// Component
function Sidebar() {
  //----------
  // Output
  //----------
  return (
    <div className="app-sidebar">
      <ul className="sidebar-nav">
        <li className="sidebar-nav-item">
          <Link className="sidebar-nav-link active" to="/">
            <i className="fa-solid fa-house"></i>
            <p>Home</p>
          </Link>
          <Link className="sidebar-nav-link" to="/">
            <i className="fa-solid fa-users"></i>
            <p>Users</p>
          </Link>
          <Link className="sidebar-nav-link" to="/">
            <i className="fa-solid fa-right-from-bracket"></i>
            <p>Log Out</p>
          </Link>
        </li>
      </ul>
      {/* ./Sidebar Links */}
    </div>
  );
}

export default Sidebar;
