// Dependencies
import { Navigate, Outlet } from "react-router-dom";
// State
import { useSelector } from "react-redux"; // Get Vendor Info from State

const PrivateRoute = () => {
  //----------
  // State
  //----------
  // TODO: Refactor when there are 2 types of users: Vendor & Property Manager
  const { vendorInfo } = useSelector((state) => state.vendorAuth); // Gets Vendor Info through the useSelector Hook
  const { propertyManagerInfo } = useSelector(
    (state) => state.propertyManagerAuth
  ); // Gets Property Manager Info through the useSelector Hook

  // Output
  // If vendorInfo exists, render protected page (Outlet (children)), else redirect to login page
  return (vendorInfo || propertyManagerInfo) ? <Outlet /> : <Navigate to="/login" replace />;

  // TODO: CREATE A UNIQUE LOGIN PAGE WHERE PERSON CAN CHOOSE TYPE OF USER TO LOG IN
};

export default PrivateRoute;
