// Dependencies
import { Outlet } from "react-router-dom"; // Injects the corresponding page/screen
// State

// Components
import HeaderPublic from "../../components/header/HeaderPublic";
import Footer from "../../layouts/footer/Footer";
// Styles
import "./PublicLayout.scss";

// Component
function PublicLayout() {
  return (
    <>
      <header className="fixed-top shadow-sm">
        <HeaderPublic />
      </header>
      <main className="main-wrapper">
        <Outlet />
        <p>Public Layout</p>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default PublicLayout;
