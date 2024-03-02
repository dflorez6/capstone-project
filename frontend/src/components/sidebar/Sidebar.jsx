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
    <div className="app-sidebar">
      <ul className="sidebar-nav">
        <li className="sidebar-nav-item">
          <Link className="sidebar-nav-link active" to="/dashboard">
          <i className="fa-solid fa-chart-simple"></i>
            <p>Dashboard</p>
          </Link>

          {/* Vendor */}
          {vendorInfo ? (
            <>
              <Link className="sidebar-nav-link" to={`/vendors/store/${vendorInfo.storeSlug}`}>
                <i className="fa-solid fa-store"></i>
                <p>Store</p>
              </Link>
            </>
          ) : (
            <>
              <Link className="sidebar-nav-link" to="/">
                <i className="fa-solid fa-store"></i>
                <p>Projects</p>
              </Link>
            </>
          )}

          <Link className="sidebar-nav-link" onClick={logoutHandler}>
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
