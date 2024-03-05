// Dependencies
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// State
import { useDispatch, useSelector } from "react-redux";
import { useVendorRegisterMutation } from "../../../slices/vendorsApiSlice";
import { vendorSetCredentials } from "../../../slices/vendorAuthSlice";
// Components
import FormContainer from "../../../components/FormContainer";
import Loader from "../../../components/Loader";

// Component
function VendorRegistration() {
  //----------
  // State
  //----------
  const navigate = useNavigate(); // Initialize
  const dispatch = useDispatch(); // Initialize

  // Form Fields
  const [avatar, setAvatar] = useState(null); // Store the selected image file
  const [companyName, setCompanyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Create a ref for the file input element
  const inputFileRef = useRef(null);

  // Redux Toolkit
  const [register, { isLoading, error }] = useVendorRegisterMutation(); // Mutation
  const { vendorInfo } = useSelector((state) => state.vendorAuth); // Gets Vendor Info through the useSelector Hook

  //----------
  // Effects
  //----------
  // Redirect to home page if already logged in
  useEffect(() => {
    if (vendorInfo) {
      navigate("/dashboard");
    }
  }, [navigate, vendorInfo]); // Dependency Array

  //----------
  // Handlers
  //----------
  // Form Submit
  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const formData = new FormData();
        formData.append("avatar", avatar); // Append selected image file to FormData
        formData.append("companyName", companyName);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("password", password);

        const res = await register(formData).unwrap(); // Pass FormData to register function & make API call
        dispatch(vendorSetCredentials({ ...res })); // Sets Credentials in Redux Store & LocalStorage
        navigate("/");
      } catch (error) {
        toast.error(error?.data?.message || error?.error); // Toastify implementation
        console.log(error?.data?.message || error?.error);
      }
    }
  };

  // File Change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file); // Update the state with the selected file
  };

  //----------
  // Redux Toolkit Slice Errors
  //----------
  if (error) {
    console.log("Login Errors:", error);
  }

  //----------
  // Output
  //----------
  return (
    <section className="page-wrapper">
      <FormContainer>
        <h1>Vendor Registration</h1>

        <form className="form" id="" onSubmit={submitHandler}>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
              <label htmlFor="lastName">Company Name</label>
              <input
                type="text"
                name="companyName"
                id="companyName"
                className="form-control"
                placeholder="Enter company's legal name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            {/* ./Input: Text */}

            <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
              <label htmlFor="avatar">Profile Picture</label>
              <input
                type="file"
                name="avatar"
                id="avatar"
                className="form-control"
                ref={inputFileRef} // Attach the ref to the input element
                onChange={handleFileChange} // Call handleFileChange on file selection
              />
            </div>
          </div>
          {/* ./Input: Image Upload */}

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
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </div>
        </form>
      </FormContainer>
    </section>
  );
}

export default VendorRegistration;
