// Dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// State
import { useDispatch, useSelector } from "react-redux";
import { usePropertyManagerRegisterMutation } from "../../../slices/propertyManagersApiSlice";
import { propertyManagerSetCredentials } from "../../../slices/propertyManagerAuthSlice";
// Components
import FormContainer from "../../../components/FormContainer";
import Loader from "../../../components/Loader";

// Component
function PropertyManagerRegistration() {
  //----------
  // State
  //----------
  const navigate = useNavigate(); // Initialize
  const dispatch = useDispatch(); // Initialize

  // Form Fields
  // TODO: Avatar pending for implementation
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Redux Toolkit
  const [register, { isLoading, error }] = usePropertyManagerRegisterMutation(); // Mutation
  const { propertyManagerInfo } = useSelector(
    (state) => state.propertyManagerAuth
  ); // Gets Property Manager Info through the useSelector Hook

  //----------
  // Effects
  //----------
  // Redirect to home page if already logged in
  useEffect(() => {
    if (propertyManagerInfo) {
      navigate("/dashboard");
    }
  }, [navigate, propertyManagerInfo]); // Dependency Array

  //----------
  // Handlers
  //----------
  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({
          // TODO: Implement Avatar
          firstName,
          lastName,
          email,
          password,
        }).unwrap(); // Makes API Request
        dispatch(propertyManagerSetCredentials({ ...res })); // Sets Credentials in Redux Store & LocalStorage
        navigate("/"); // Redirects to Home Page
      } catch (error) {
        toast.error(error?.data?.message || error?.error); // Toastify implementation
        console.log(error?.data?.message || error?.error);
      }
    }
  };

  //----------
  // Redux Toolkit Slice Errors
  //----------
  if (error) {
    console.log("Registration Errors:", error);
  }

  return (
    <section className="page-wrapper">
      <FormContainer>
        <h1>Property Manager Registration</h1>

        <form className="form" id="" onSubmit={submitHandler}>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="form-control"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            {/* ./Input: Text */}

            <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="form-control"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            {/* ./Input: Text */}
          </div>

          <div className="row">
            <div className="col-12 my-2">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          {/* ./Input: Email */}

          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* ./Input: Password */}

            <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {/* ./Input: Password */}
          </div>

          {isLoading && <Loader />}

          <div className="row">
            <div className="col-12">
              <div className="submit-wrapper">
                <button type="submit" className="btn-app btn-app-purple">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
          {/* ./Submit */}

          <div className="row py-3">
            <div className="col-12">
              Already have an account?{" "}
              <Link to="/property-managers/login">Login</Link>
            </div>
          </div>
        </form>
      </FormContainer>
    </section>
  );
}

export default PropertyManagerRegistration;
