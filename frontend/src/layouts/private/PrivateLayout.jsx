// Dependencies
import { Outlet } from "react-router-dom"; // Injects the corresponding page/screen
// Components
import HeaderPrivate from "../../components/header/HeaderPrivate";
import Sidebar from "../../components/sidebar/Sidebar";
import Footer from "../../layouts/footer/Footer";
// Styles
import "./PrivateLayout.scss";

// Component
function PrivateLayout() {
  //----------
  // Output
  //----------
  return (
    <>
      <header className="fixed-top shadow-sm">
        <HeaderPrivate />
      </header>

      <main className="main-wrapper private-wrapper">
        <div className="sidebar-wrapper" id="sidebarWrapper">
          <Sidebar />
        </div>

        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default PrivateLayout;
