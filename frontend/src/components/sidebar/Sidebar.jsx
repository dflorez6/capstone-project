// Dependencies
import { useNavigate, Link } from "react-router-dom";
// State
import { useSelector, useDispatch } from "react-redux";
import { useVendorLogoutMutation } from "../../slices/vendorsApiSlice";
import { vendorClearCredentials } from "../../slices/vendorAuthSlice";
import { usePropertyManagerLogoutMutation } from "../../slices/propertyManagersApiSlice";
import { propertyManagerClearCredentials } from "../../slices/propertyManagerAuthSlice";

// Component
function Sidebar() {
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
      navigate("/login");
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
              <li className="sidebar-navigation-item">
                <Link className="sidebar-navigation-link " to="/dashboard">
                  <i className="fa-solid fa-chart-simple link-icon"></i>
                  <span className="link-text">Dashboard</span>
                </Link>
              </li>

              {vendorInfo ? (
                <>
                  {/* Vendor */}
                  <li className="sidebar-navigation-item">
                    <Link className="sidebar-navigation-link" to={`/`}>
                      <i className="fa-solid fa-magnifying-glass link-icon"></i>
                      <span className="link-text">Projects</span>
                    </Link>
                  </li>
                  <li className="sidebar-navigation-item">
                    <Link className="sidebar-navigation-link" to={`/`}>
                      <i className="fa-solid fa-calendar-days link-icon"></i>
                      <span className="link-text">Work Orders</span>
                    </Link>
                  </li>

                  <li className="sidebar-navigation-item">
                    <Link
                      className="sidebar-navigation-link"
                      to={`/vendors/store/${vendorInfo.storeSlug}`}
                    >
                      <i className="fa-solid fa-store link-icon"></i>
                      <span className="link-text">Store</span>
                    </Link>
                  </li>
                  <li className="sidebar-navigation-item">
                    <Link
                      className="sidebar-navigation-link"
                      to={`/vendors/store/${vendorInfo.storeSlug}/edit`}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                      <span className="link-text">Edit Store</span>
                    </Link>
                  </li>

                  <li className="sidebar-navigation-item">
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
                  <li className="sidebar-navigation-item">
                    <Link className="sidebar-navigation-link" to={"/vendors/search"}>
                      <i className="fa-solid fa-magnifying-glass link-icon"></i>
                      <span className="link-text">Vendors</span>
                    </Link>
                  </li>
                  <li className="sidebar-navigation-item">
                    <Link className="sidebar-navigation-link" to={`/`}>
                      <i className="fa-solid fa-briefcase link-icon"></i>
                      <span className="link-text">Projects</span>
                    </Link>
                  </li>
                  <li className="sidebar-navigation-item">
                    <Link className="sidebar-navigation-link" to={`/`}>
                      <i className="fa-solid fa-calendar-days link-icon"></i>
                      <span className="link-text">Work Orders</span>
                    </Link>
                  </li>

                  <li className="sidebar-navigation-item">
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
