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

// Component
function Sidebar() {
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
  // Global Variables
  //----------
  let authUser;
  let authRoute;
  let authId;
  let vendorStoreSlug;
  if (vendorInfo) {
    authUser = vendorInfo;
    authRoute = "/vendors";
    authId = vendorInfo._id;
    vendorStoreSlug = vendorInfo.storeSlug;
  } else {
    authUser = propertyManagerInfo;
    authRoute = "/property-managers";
    authId = propertyManagerInfo._id;
  }

  //----------
  // Output
  //----------
  return (
    <>
      {/* Off Canvas */}
      <div
        className="offcanvas offcanvas-start app-sidebar"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header app-sidebar-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        {/* Sidebar Header */}
        <div className="offcanvas-body app-sidebar-body">
          <div className="sidebar-navigation-wrapper">
            <ul className="sidebar-navigation">
              <li
                className={`sidebar-navigation-item ${
                  location.pathname === "/notifications" ? "active" : ""
                }`}
              >
                <Link className="sidebar-navigation-link " to="/notifications">
                  <i className="fa-solid fa-bell link-icon"></i>
                  <span className="link-text">Notifications</span>
                </Link>
              </li>
              {/*
              <li
                className={`sidebar-navigation-item ${
                  location.pathname === "/dashboard" ? "active" : ""
                }`}
              >
                <Link className="sidebar-navigation-link " to="/dashboard">
                  <i className="fa-solid fa-chart-simple link-icon"></i>
                  <span className="link-text">Dashboard</span>
                </Link>
              </li>
              */}
              {vendorInfo ? (
                <>
                  {/* Vendor */}
                  <li
                    className={`sidebar-navigation-item ${
                      location.pathname === "/projects" ? "active" : ""
                    }`}
                  >
                    <Link className="sidebar-navigation-link" to={`/projects`}>
                      <i className="fa-solid fa-magnifying-glass link-icon"></i>
                      <span className="link-text">Projects</span>
                    </Link>
                  </li>
                  <li
                    className={`sidebar-navigation-item ${
                      location.pathname.startsWith("/work-orders/vendor")
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link
                      className="sidebar-navigation-link"
                      to={`/work-orders/vendor/${authId}`}
                    >
                      <i className="fa-solid fa-calendar-days link-icon"></i>
                      <span className="link-text">Work Orders</span>
                    </Link>
                  </li>

                  <li
                    className={`sidebar-navigation-item ${
                      location.pathname === `/vendors/store/${vendorStoreSlug}`
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link
                      className="sidebar-navigation-link"
                      to={`/vendors/store/${vendorStoreSlug}`}
                    >
                      <i className="fa-solid fa-store link-icon"></i>
                      <span className="link-text">Store</span>
                    </Link>
                  </li>
                  <li
                    className={`sidebar-navigation-item ${
                      location.pathname ===
                      `/vendors/store/${vendorStoreSlug}/edit`
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link
                      className="sidebar-navigation-link"
                      to={`/vendors/store/${vendorStoreSlug}/edit`}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                      <span className="link-text">Edit Store</span>
                    </Link>
                  </li>

                  <li
                    className={`sidebar-navigation-item ${
                      location.pathname === "/vendors/profile" ? "active" : ""
                    }`}
                  >
                    <Link
                      className="sidebar-navigation-link"
                      to={"/vendors/profile"}
                    >
                      <i className="fa-solid fa-user-gear"></i>
                      <span className="link-text">Profile</span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {/* Property Manager */}
                  <li
                    className={`sidebar-navigation-item ${
                      location.pathname === "/vendors/search" ? "active" : ""
                    }`}
                  >
                    <Link
                      className="sidebar-navigation-link"
                      to={"/vendors/search"}
                    >
                      <i className="fa-solid fa-magnifying-glass link-icon"></i>
                      <span className="link-text">Vendors</span>
                    </Link>
                  </li>
                  <li
                    className={`sidebar-navigation-item ${
                      location.pathname === `/projects/${authId}`
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link
                      className="sidebar-navigation-link"
                      to={`/projects/${authId}`}
                    >
                      <i className="fa-solid fa-briefcase link-icon"></i>
                      <span className="link-text">Projects</span>
                    </Link>
                  </li>
                  <li
                    className={`sidebar-navigation-item ${
                      location.pathname === `/projects/new` ? "active" : ""
                    }`}
                  >
                    <Link
                      className="sidebar-navigation-link"
                      to={`/projects/new`}
                    >
                      <i className="fa-solid fa-pen-to-square link-icon"></i>
                      <span className="link-text">Create Project</span>
                    </Link>
                  </li>
                  <li
                    className={`sidebar-navigation-item ${
                      location.pathname ===
                      `/work-orders/property-manager/${authId}`
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link
                      className="sidebar-navigation-link"
                      to={`/work-orders/property-manager/${authId}`}
                    >
                      <i className="fa-solid fa-calendar-days link-icon"></i>
                      <span className="link-text">Work Orders</span>
                    </Link>
                  </li>

                  <li
                    className={`sidebar-navigation-item ${
                      location.pathname === "/property-managers/profile"
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link
                      className="sidebar-navigation-link"
                      to={"/property-managers/profile"}
                    >
                      <i className="fa-solid fa-user-gear"></i>
                      <span className="link-text">Profile</span>
                    </Link>
                  </li>
                </>
              )}
              <li className="sidebar-navigation-item">
                <Link
                  className="sidebar-navigation-link"
                  onClick={logoutHandler}
                >
                  <i className="fa-solid fa-right-from-bracket link-icon"></i>
                  <span className="link-text">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Sidebar Body */}
      </div>
      {/* Off Canvas*/}
    </>
  );
}

export default Sidebar;
