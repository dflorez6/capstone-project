// Dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// State
import { useDispatch, useSelector } from "react-redux";
import { useVendorLoginMutation } from "../../../slices/vendorsApiSlice";
import { vendorSetCredentials } from "../../../slices/vendorAuthSlice";
import { usePropertyManagerLoginMutation } from "../../../slices/propertyManagersApiSlice";
import { propertyManagerSetCredentials } from "../../../slices/propertyManagerAuthSlice";
// Components
import Loader from "../../../components/Loader";
// Styles
import "./AuthPage.scss";

// Component
const Login = () => {
  //----------
  // State
  //----------
  const navigate = useNavigate(); // Initialize
  const dispatch = useDispatch(); // Initialize

  // Form Fields
  const [vendorEmail, setVendorEmail] = useState("");
  const [vendorPassword, setVendorPassword] = useState("");
  const [propertyManagerEmail, setPropertyManagerEmail] = useState("");
  const [propertyManagerPassword, setPropertyManagerPassword] = useState("");

  // Redux Toolkit
  const [vendorLogin, { isLoading: vendorLoading, error: vendorError }] =
    useVendorLoginMutation(); // Mutation
  const { vendorInfo } = useSelector((state) => state.vendorAuth); // Gets Vendor Info through the useSelector Hook

  const [
    login,
    { isLoading: propertyManagerLoading, error: propertyManagerError },
  ] = usePropertyManagerLoginMutation(); // Mutation
  const { propertyManagerInfo } = useSelector(
    (state) => state.propertyManagerAuth
  ); // Gets Property Manager Info through the useSelector Hook

  //----------
  // Effects
  //----------
  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (vendorInfo || propertyManagerInfo) {
      navigate("/dashboard");
    }
  }, [navigate, vendorInfo, propertyManagerInfo]); // Dependency Array

  //----------
  // Handlers
  //----------
  // Vendor Login Form Submit
  const vendorSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await vendorLogin({
        email: vendorEmail,
        password: vendorPassword,
      }).unwrap(); // Makes API Request
      dispatch(vendorSetCredentials({ ...res })); // Sets Credentials in Redux Store & LocalStorage
      navigate("/dashboard"); // Redirects to Dashboard Page
    } catch (err) {
      toast.error(err?.data?.message || err?.error); // Toastify implementation
      console.log("Login Error:");
      console.log(err?.data?.message || err?.error);
    }
  };

  // Property Manager Login Form Submit
  const propertyManagerSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({
        email: propertyManagerEmail,
        password: propertyManagerPassword,
      }).unwrap(); // Makes API Request
      dispatch(propertyManagerSetCredentials({ ...res })); // Sets Credentials in Redux Store & LocalStorage
      navigate("/dashboard"); // Redirects to Dashboard Page
    } catch (err) {
      toast.error(err?.data?.message || err?.error); // Toastify implementation
      console.log("Login Error:");
      console.log(err?.data?.message || err?.error);
    }
  };

  //----------
  // Redux Toolkit Slice Errors
  //----------
  if (vendorError) {
    console.log("Vendor Login Errors:", vendorError);
  }
  if (propertyManagerError) {
    console.log("Property Manager Login Errors:", propertyManagerError);
  }

  //----------
  // Component
  //----------
  return (
    <section className="public-page-wrapper auth-page-wrapper">
      <div className="app-container">
        <div className="row">
          <div className="col-12 text-center mb-3">
            <h1>User Log In</h1>
          </div>
        </div>

        {/* Forms Container */}
        <div className="forms-container shadow">
          {/* Vendor Form */}
          <div className="vendor-form-container">
            <div className="row">
              <div className="col-12">
                <h2>Vendor</h2>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <form className="form" id="" onSubmit={vendorSubmitHandler}>
                  <div className="row">
                    <div className="col-12 my-2">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={vendorEmail}
                        onChange={(e) => setVendorEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* ./Input: Email */}

                  <div className="row">
                    <div className="col-12 my-2">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter Password"
                        value={vendorPassword}
                        onChange={(e) => setVendorPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* ./Input: Password */}

                  {vendorLoading && <Loader />}

                  <div className="row">
                    <div className="col-12">
                      <div className="submit-wrapper">
                        <button
                          type="submit"
                          className="btn-app btn-app-purple"
                        >
                          Log In
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* ./Submit */}

                  <div className="row py-3">
                    <div className="col-12">
                      New Customer? <Link to="/vendors/register">Register</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* ./Vendor Form */}

          {/* Property Manager Form */}
          <div className="prop-manager-form-container">
            <div className="row">
              <div className="col-12">
                <h2>Property Manager</h2>
              </div>
            </div>

            <form
              className="form"
              id=""
              onSubmit={propertyManagerSubmitHandler}
            >
              <div className="row">
                <div className="col-12 my-2">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={propertyManagerEmail}
                    onChange={(e) => setPropertyManagerEmail(e.target.value)}
                  />
                </div>
              </div>
              {/* ./Input: Email */}

              <div className="row">
                <div className="col-12 my-2">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter Password"
                    value={propertyManagerPassword}
                    onChange={(e) => setPropertyManagerPassword(e.target.value)}
                  />
                </div>
              </div>
              {/* ./Input: Password */}

              {propertyManagerLoading && <Loader />}

              <div className="row">
                <div className="col-12">
                  <div className="submit-wrapper">
                    <button type="submit" className="btn-app btn-app-purple">
                      Log In
                    </button>
                  </div>
                </div>
              </div>
              {/* ./Submit */}

              <div className="row py-3">
                <div className="col-12">
                  New Customer?{" "}
                  <Link to="/property-managers/register">Register</Link>
                </div>
              </div>
            </form>
          </div>
          {/* ./Property Manager Form */}
        </div>
        {/* Forms */}
      </div>
    </section>
  );
};

export default Login;
