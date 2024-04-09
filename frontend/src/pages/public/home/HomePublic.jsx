// Dependencies
import { Link } from "react-router-dom";
// Components
// import Hero from "../components/hero/Hero";
// Styles
import "./HomePublic.scss";
// Assets
import vendor from "../../../assets/img/contractor.svg";
import propManager from "../../../assets/img/prop-manager.svg";

// Component
function HomePublic() {
  return (
    <section className="page-wrapper home-page-wrapper" id="home">
      {/* Hero */}
      <div className="hero-wrapper">
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="app-container">
              <h1 className="title">Simplify Vendor Management</h1>
              <h2 className="subtitle">
                Connect, Collaborate, and Manage <br />
                Projects Effortlessly with VendorLynx
              </h2>

              <div className="cta-wrapper">
                <a
                  href="#property-managers"
                  className="btn-app btn-app-sm btn-app-yellow me-4"
                >
                  Property Managers
                </a>
                <a
                  href="/#vendors"
                  className="btn-app btn-app-sm btn-app-purple"
                >
                  Vendors
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ./Hero */}

      {/* About */}
      <div className="about-wrapper" id="about">
        <div className="container">
          <div className="hero-content">
            <div className="section-title">
              <h3>About Us</h3>
            </div>
            <div className="section-content">
              <p>
                We offer a platform for simplifying{" "}
                <strong>vendor management</strong> and enhancing{" "}
                <strong>project collaboration</strong>. Discover why property
                managers and vendors choose <strong>VendorLynx</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ./About */}

      {/* Content Divider */}
      <div className="content-divider-wrapper">
        <p>Marketing Copy Here</p>
      </div>
      {/* ./Content Divider */}

      {/* Property Manager */}
      <div className="property-managers-wrapper" id="property-managers">
        <div className="container">
          <div className="property-managers-content-wrapper">
            {/* Image */}
            <div className="property-managers-image-wrapper">
              <img src={propManager} alt="VendorLynx | Property Managers" />
              <Link
                to="/property-managers/register"
                className="btn-app btn-app-yellow"
              >
                Register
              </Link>
            </div>
            {/* ./Image */}

            {/* Description */}
            <div className="property-managers-description-wrapper">
              <div className="section-title">
                <h3>Property Managers</h3>
                <p className="description">
                  Simplify Vendor Management, Enhance Project Efficiency
                </p>
                <div className="benefits-wrapper">
                  <p>
                    <strong>Access Qualified Vendors:</strong>
                    Quickly find and connect with vendors who meet your project
                    criteria.
                  </p>
                  <p>
                    <strong>Clear Project Oversight:</strong> Manage work
                    orders, track progress, and communicate effectively with
                    vendors.
                  </p>
                  <p>
                    <strong>Transparent Feedback Loop:</strong> Rate and review
                    vendors based on their performance to maintain quality
                    standards.
                  </p>
                </div>
              </div>
            </div>
            {/* ./Description */}
          </div>
        </div>
      </div>
      {/* ./Property Manager */}

      {/* Content Divider */}
      <div className="content-divider-wrapper">
        <p>Marketing Copy Here</p>
      </div>
      {/* ./Content Divider */}

      {/* Vendor */}
      <div className="vendors-wrapper" id="vendors">
        <div className="container">
          <div className="vendors-content-wrapper">
            {/* Description */}
            <div className="vendors-description-wrapper">
              <div className="section-title">
                <h3>Vendors</h3>
                <p className="description">
                  Showcase Your Expertise, Secure More Contracts
                </p>
                <div className="benefits-wrapper">
                  <p>
                    <strong>Expand Your Reach:</strong>
                    Showcase your services to property managers actively seeking
                    contractors like you.
                  </p>
                  <p>
                    <strong>Boost Your Reputation:</strong> Receive ratings and
                    reviews from satisfied clients to enhance your credibility.
                  </p>
                  <p>
                    <strong>Simplified Bidding Process:</strong> Easily discover
                    and apply to projects that align with your skills and
                    capabilities. standards.
                  </p>
                </div>
              </div>
            </div>
            {/* ./Description */}

            {/* Image */}
            <div className="vendors-image-wrapper">
              <img src={vendor} alt="VendorLynx | Vendors" />
              <Link to="/vendors/register" className="btn-app btn-app-purple">
                Register
              </Link>
            </div>
            {/* ./Image */}
          </div>
        </div>
      </div>
      {/* ./Vendor */}
    </section>
  );
}

export default HomePublic;

/*



About Us Section:

Description: 

    Simplified Vendor Connections: Easily connect with qualified vendors or explore new project opportunities hassle-free.
    Efficient Project Management: From creating work orders to tracking progress, VendorLynx streamlines every aspect of your projects.
    Expanded Opportunities: Grow your network, secure more contracts, and elevate your business with VendorLynx.

Join us today and experience the difference.

---------------------------------------------------------------------------------------

Vendor Section:

Description: Showcase Your Expertise, Secure More Contracts

VendorLynx is your gateway to success in the Greater Toronto Area. Present your services, certifications, and past projects to property managers searching for your expertise. With VendorLynx, you can:

    Expand Your Reach: Showcase your services to property managers actively seeking contractors like you.
    Simplified Bidding Process: Easily discover and apply to projects that align with your skills and capabilities.
    Boost Your Reputation: Receive ratings and reviews from satisfied clients to enhance your credibility.
    Direct Communication: Engage directly with property managers to discuss project details and requirements.

Join VendorLynx today and elevate your business.

---------------------------------------------------------------------------------------

Property Manager Section:

Description: Simplify Vendor Management, Enhance Project Efficiency

VendorLynx empowers property managers to efficiently manage vendors and projects. Here's how we improve your workflow:

    Access to Qualified Vendors: Quickly find and connect with vendors who meet your project criteria.
    Clear Project Oversight: Manage work orders, track progress, and communicate effectively with vendors.
    Collaborative Environment: Work closely with vendors to ensure projects are completed to your satisfaction.
    Transparent Feedback Loop: Rate and review vendors based on their performance to maintain quality standards.

Join VendorLynx today and experience seamless vendor management.

*/
