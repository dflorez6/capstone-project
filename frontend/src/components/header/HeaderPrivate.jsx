// Dependencies
import { useNavigate, Link } from "react-router-dom";
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
// import avatar from "../../assets/img/df-original-square.jpg";

// Component
const Header = () => {
  //----------
  // State
  //----------
  const dispatch = useDispatch(); // Initialize
  const navigate = useNavigate(); // Initialize

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
  // Global Variables
  //----------
  let authUser;
  let authRoute;
  if (vendorInfo) {
    authUser = vendorInfo;
    authRoute = "/vendors";
  } else {
    authUser = propertyManagerInfo;
    authRoute = "/property-managers";
  }

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
  // Output
  //----------
  return (
    <>
      <nav className="navbar navbar-expand-lg app-navbar">
        <div className="container-fluid app-container">
          {/* TODO: Refactor when having 2 user types: Vendor & Property Manager */}
          {authUser && (
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
                  <Link className="nav-link" to="/">
                    <i className="fa-solid fa-bell"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>

                {authUser.accountType == "vendor" ? (
                  <>
                    <Link className="nav-link" to={"/"}>
                      Projects
                    </Link>
                    <Link className="nav-link" to={"/"}>
                      Work Orders
                    </Link>
                    <Link
                      className="nav-link"
                      to={`/vendors/store/${vendorInfo.storeSlug}`}
                    >
                      Store
                    </Link>
                    {/* TODO: Update Vendor Links */}
                  </>
                ) : (
                  <>
                    {/* TODO: Update Prop Manager Links */}
                    <Link className="nav-link" to="/">
                      Vendors
                    </Link>
                    <Link className="nav-link" to="/">
                      Projects
                    </Link>
                    <Link className="nav-link" to="/">
                      Work Orders
                    </Link>
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
                    {authUser.email}
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
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
