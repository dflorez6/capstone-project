// Dependencies
import { Link } from "react-router-dom";
// Styles
import "./Footer.scss";

// Component
const Footer = () => {
  // Output
  return (
    <div className="footer-wrapper">
      <p>
        <div className="vendor-lynx">VendorLynx &copy;2024</div>
      </p>
      <p className="team-dal">Capstone Project | Team DAL</p>
    </div>
  );
};

export default Footer;
