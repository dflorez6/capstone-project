// Dependencies
import { useNavigate, Link, useLocation } from "react-router-dom";
// State
import { useSelector, useDispatch } from "react-redux";
import { useVendorLogoutMutation } from "../../slices/vendorsApiSlice";
import { vendorClearCredentials } from "../../slices/vendorAuthSlice";
import { usePropertyManagerLogoutMutation } from "../../slices/propertyManagersApiSlice";
import { propertyManagerClearCredentials } from "../../slices/propertyManagerAuthSlice";
// Toast
import { toast } from "react-toastify";
// Styles
import "./Header.scss";
// Assets
import placeholderSquare from "../../assets/img/placeholder-square.jpg";
import logo from "../../assets/logo.svg";

// Component
const Header = () => {
  //----------
  // State
  //----------
  const dispatch = useDispatch(); // Initialize
  const navigate = useNavigate(); // Initialize
  const location = useLocation(); // Initialize

  // Redux Store
  const { vendorInfo } = useSelector((state) => state.vendorAuth); // Gets Vendor Info through the useSelector Hook
  const { propertyManagerInfo } = useSelector(
    (state) => state.propertyManagerAuth
  ); // Gets Property Manager Info through the useSelector Hook

  // Redux Toolkit
  const [vendorLogout, { isLoading: vendorLoading, error: vendorError }] =
    useVendorLogoutMutation(); // Mutation
  const [
    propertyManagerLogout,
    { isLoading: propertyManagerLoading, error: propertyManagerError },
  ] = usePropertyManagerLogoutMutation(); // Mutation

  //----------
  // Handlers
  //----------
  const logoutHandler = async () => {
    try {
      // Checks which user type is logged in
      if (vendorInfo) {
        await vendorLogout().unwrap(); // Makes API Request + destroy cookie
        dispatch(vendorClearCredentials()); // Clears Credentials in Redux Store & LocalStorage
      } else {
        // Property Manager
        await propertyManagerLogout().unwrap();
        dispatch(propertyManagerClearCredentials());
      }
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
      console.log("Logout Error:");
      console.log(error?.data?.message || error?.error);
    }
  };

  //----------
  // Redux Toolkit Slice Errors
  //----------
  if (vendorError) {
    console.log("Vendor Error: ", vendorError);
  }
  if (propertyManagerError) {
    console.log("property Manager Error: ", propertyManagerError);
  }

  //----------
  // Global Variables
  //----------
  let authUser;
  let authRoute;
  let authId;
  let vendorStoreSlug;
  let authAvatar;
  if (vendorInfo) {
    authUser = vendorInfo;
    authRoute = "/vendors";
    authId = vendorInfo?._id;
    authAvatar = vendorInfo?.avatar.url;
    vendorStoreSlug = vendorInfo?.storeSlug;
  } else {
    authUser = propertyManagerInfo;
    authRoute = "/property-managers";
    authId = propertyManagerInfo?._id;
    authAvatar = propertyManagerInfo?.avatar.url;
  }

  //----------
  // Output
  //----------
  return (
    <>
      <nav className="navbar navbar-expand-lg app-navbar">
        <div className="container-fluid app-container">
          {authUser && (
            <>
              <Link to="/dashboard" className="navbar-brand">
                <img src={logo} alt="VendorLynx" className="logo" />
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
              <ul className="navbar-nav align-items-center">
                <li
                  className={`nav-item ${
                    location.pathname === "/notifications" ? "active" : ""
                  }`}
                >
                  <Link className="nav-link" to="/notifications">
                    <i className="fa-solid fa-bell"></i>
                  </Link>
                </li>
                {/*
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                 */}

                {authUser.accountType == "vendor" ? (
                  <>
                    <li
                      className={`nav-item ${
                        location.pathname === "/projects" ? "active" : ""
                      }`}
                    >
                      <Link className="nav-link" to="/projects">
                        Projects
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        location.pathname === `/work-orders/vendor/${authId}`
                          ? "active"
                          : ""
                      }`}
                    >
                      <Link
                        className="nav-link"
                        to={`/work-orders/vendor/${authId}`}
                      >
                        Work Orders
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        location.pathname ===
                        `/vendors/store/${vendorStoreSlug}`
                          ? "active"
                          : ""
                      }`}
                    >
                      <Link
                        className="nav-link"
                        to={`/vendors/store/${vendorStoreSlug}`}
                      >
                        Store
                      </Link>
                    </li>
                    {/* TODO: Update Vendor Links */}
                  </>
                ) : (
                  <>
                    {/* TODO: Update Prop Manager Links */}
                    <li
                      className={`nav-item ${
                        location.pathname === "/vendors/search" ? "active" : ""
                      }`}
                    >
                      <Link className="nav-link" to="/vendors/search">
                        Vendors
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        location.pathname === `/projects/${authId}`
                          ? "active"
                          : ""
                      }`}
                    >
                      <Link className="nav-link" to={`/projects/${authId}`}>
                        Projects
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${
                        location.pathname ===
                        `/work-orders/property-manager/${authId}`
                          ? "active"
                          : ""
                      }`}
                    >
                      <Link
                        className="nav-link"
                        to={`/work-orders/property-manager/${authId}`}
                      >
                        Work Orders
                      </Link>
                    </li>
                  </>
                )}

                {/* Dropdown */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {authAvatar === "" ? (
                      <img src={placeholderSquare} alt="" className="avatar" />
                    ) : (
                      <img src={authAvatar} alt="" className="avatar" />
                    )}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        to={authRoute + "/profile"}
                        className="dropdown-item"
                      >
                        <i className="fa-solid fa-user"></i>
                        Profile
                      </Link>
                    </li>
                    <li>
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

                <button
                  className="btn-sidebar-trigger"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasExample"
                  aria-controls="offcanvasExample"
                >
                  <i className="fa-solid fa-bars"></i>
                  <span className="ms-2">Menu</span>
                </button>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
