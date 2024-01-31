// Dependencies
import { useNavigate, Link } from "react-router-dom";
// Styles
import "./Header.scss";
// Assets
// import avatar from "../../assets/img/df-original-square.jpg";

// Component
const Header = () => {
  //----------
  // Output
  //----------
  return (
    <>
      <nav className="navbar navbar-expand-lg app-navbar">
        <div className="container-fluid app-container">
          <Link to="/" className="navbar-brand">
            {/* <img src={avatar} alt="David Florez" className="img-fluid" /> */}
            <p>VendorLynx Public</p>
          </Link>
          {/* ./Brand */}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <div className="ms-auto">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Vendors
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Property Managers
                  </a>
                </li>

                {/* Login */}
                <li className="nav-item">
                  <Link to="/vendors/login" className="nav-link">
                    <i className="fa-solid fa-right-to-bracket"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
