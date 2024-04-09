// Dependencies
import { useNavigate, Link } from "react-router-dom";
// Styles
import "./Header.scss";
// Assets
import logo from "../../assets/logo.svg";

// Component
const Header = () => {
  //----------
  // Output
  //----------
  return (
    <>
      <nav className="navbar navbar-expand-lg app-navbar">
        <div className="container-fluid app-container">
          <a href="/#home" className="navbar-brand">
            <img src={logo} alt="VendorLynx" className="logo" />
          </a>
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
                  <a className="nav-link" href="#about">
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#property-managers">
                    Property Managers
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#vendors">
                    Vendors
                  </a>
                </li>

                {/* Login */}
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    <i className="fa-solid fa-right-to-bracket"></i>
                    Log In
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

/*
<li className="nav-item">
  <Link to="/vendors/login" className="nav-link">
    <i className="fa-solid fa-right-to-bracket"></i>
    Vendor
  </Link>
</li>
<li className="nav-item">
  <Link to="/property-managers/login" className="nav-link">
    <i className="fa-solid fa-right-to-bracket"></i>
    Prop Manager
  </Link>
</li>
*/
