// Dependencies
import { Outlet } from "react-router-dom"; // Injects the corresponding page/screen
// State
import { useSelector, useDispatch } from "react-redux";
// Toatsify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Components
// import Header from "./layouts/header/Header";
import HeaderPublic from "./layouts/header/HeaderPublic";
import HeaderPrivate from "./layouts/header/HeaderPrivate";
import Footer from "./layouts/footer/Footer";

// Component
function App() {
  //----------
  // State
  //----------
  const dispatch = useDispatch(); // Initialize

  const { vendorInfo } = useSelector((state) => state.vendorAuth); // Gets Vendor Info through the useSelector Hook

  return (
    <>
      <ToastContainer />
      {/* TODO: Create 2 component layouts: Public & Private to display different UIs */}
      <header className="fixed-top shadow-sm">
        {vendorInfo ? <HeaderPrivate /> : <HeaderPublic />}
      </header>
      <main className="main-wrapper">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
