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
  // Handlers
  //----------
  const sidebarCollapse = () => {
    const sidebarWrapper = document.getElementById("sidebarWrapper");
    sidebarWrapper.classList.toggle("collapsed");

    const btnCollapseIcon = document.getElementById("btnCollapseIcon");
    btnCollapseIcon.classList.toggle("collapsed-icon");
  };

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
          <div className="btn-collapse">
            <button onClick={sidebarCollapse} id="btnCollapse">
              <i
                className="fa-solid fa-circle-chevron-left"
                id="btnCollapseIcon"
              ></i>
            </button>
          </div>
          {/* ./Collapse Button */}

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
