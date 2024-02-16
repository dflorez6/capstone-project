// State
import { useSelector, useDispatch } from "react-redux";
// Toatsify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Components
import PublicLayout from "./layouts/public/PublicLayout";
import PrivateLayout from "./layouts/private/PrivateLayout";

// Component
function App() {
  //----------
  // State
  //----------
  const dispatch = useDispatch(); // Initialize

  const { vendorInfo } = useSelector((state) => state.vendorAuth); // Gets Vendor Info through the useSelector Hook
  const { propertyManagerInfo } = useSelector(
    (state) => state.propertyManagerAuth
  ); // Gets Property Manager Info through the useSelector Hook

  // Conditional layout rendering
  let layoutComponent;
  if (vendorInfo || propertyManagerInfo) {
    layoutComponent = <PrivateLayout />;
  } else {
    layoutComponent = <PublicLayout />;
  }

  //----------
  // Output
  //----------
  return (
    <>
      <ToastContainer />
      {layoutComponent} {/* Displays UI Layout depending on access level */}
    </>
  );
}

export default App;
