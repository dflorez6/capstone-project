// Dependencies
import { useNavigate, Link } from "react-router-dom";
// State
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/vendorsApiSlice";
import { clearCredentials } from "../../slices/vendorAuthSlice";
// Styles
import "./Header.scss";
// Assets
// import avatar from "../../assets/img/df-original-square.jpg";

// Component
const Header = () => {
  //----------
  // State
  //----------
  const dispatch = useDispatch(); // Initialize
  const navigate = useNavigate(); // Initialize

  const { vendorInfo } = useSelector((state) => state.vendorAuth); // Gets Vendor Info through the useSelector Hook

  const [logout, { isLoading, error }] = useLogoutMutation(); // Redux Toolkit Query

  //----------
  // Handlers
  //----------
  // TODO: Refactor when having 2 user types: Vendor & Property Manager
  const logoutHandler = async () => {
    try {
      await logout().unwrap(); // Makes API Request + destroy cookie
      dispatch(clearCredentials()); // Clears Credentials in Redux Store & LocalStorage
      navigate("/");
    } catch (err) {
      console.log("Logout Error:");
      console.log(err?.data?.message || err?.error);
    }
  };

  //----------
  // Output
  //----------
  return (
    <>
      <nav className="navbar navbar-expand-lg app-navbar">
        <div className="container-fluid app-container">
          {/* TODO: Refactor when having 2 user types: Vendor & Property Manager */}
          {vendorInfo && (
            <>
              <Link to="/dashboard" className="navbar-brand">
                {/* <img src={avatar} alt="David Florez" className="img-fluid" /> */}
                <p>VendorLynx Private</p>
              </Link>
            </>
          )}
          {/* ./Brand */}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <div className="ms-auto">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>

                {/* Dropdown */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {/* TODO: Refactor when having 2 user types: Vendor & Property Manager */}
                    {vendorInfo.email}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/dashboard" className="dropdown-item">
                        <i className="fa-solid fa-gear"></i>
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link to="/profile" className="dropdown-item">
                        <i className="fa-solid fa-user"></i>
                        Profile
                      </Link>
                    </li>
                    <li>
                      {/* TODO: Refactor when having 2 user types: Vendor & Property Manager */}
                      <a
                        className="dropdown-item cursor-pointer"
                        onClick={logoutHandler}
                      >
                        <i className="fa-solid fa-right-from-bracket"></i>
                        Log Out
                      </a>
                    </li>
                  </ul>
                </li>
                {/* ./Dropdown */}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
