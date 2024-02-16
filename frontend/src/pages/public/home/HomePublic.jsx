// Dependencies
import { Link } from "react-router-dom";
// Components
// import Hero from "../components/hero/Hero";
// Styles
// TODO: Add custom style for Home

// Component
function HomePublic() {
  return (
    <section className="page-wrapper">
      <div className="container">
        <h1>VendorLynx</h1>
        <p>HomePublic</p>

        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 offset-md-3 offset-lg-3">
            <h3 className="text-center">Select user type to sign up</h3>

            <div className="row mt-5">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <Link to="/vendors/register" className="btn-app btn-app-purple width-100">
                  Vendor
                </Link>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <Link to="/property-managers/register" className="btn-app btn-app-yellow width-100">
                  Property Manager
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePublic;
