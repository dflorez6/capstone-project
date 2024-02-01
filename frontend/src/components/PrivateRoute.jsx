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

  // Output
  // If vendorInfo exists, render protected page (Outlet (children)), else redirect to login page
  return vendorInfo ? <Outlet /> : <Navigate to="/vendors/login" replace />;
};

export default PrivateRoute;
