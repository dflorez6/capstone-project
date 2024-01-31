// Dependencies
import { Outlet } from "react-router-dom"; // Injects the corresponding page/screen
// Toatsify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Components
import Header from "./layouts/header/Header";
import Footer from "./layouts/footer/Footer";

function App() {
  return (
    <>
      <header className="fixed-top shadow-sm">
        <Header />
      </header>
      <ToastContainer />
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
