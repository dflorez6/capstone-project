// Dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// State
import { useDispatch, useSelector } from "react-redux";
import { useUpdateVendorMutation } from "../../../../slices/vendorsApiSlice";
import { setCredentials } from "../../../../slices/vendorAuthSlice";
// Toast
import { toast } from "react-toastify";
// Components
import FormContainer from "../../../../components/FormContainer";
import Loader from "../../../../components/Loader";
// Styles
import "./Profile.scss";

// Component
const Profile = () => {
  //----------
  // State
  //----------
  const navigate = useNavigate(); // Initialize
  const dispatch = useDispatch(); // Initialize

  // TODO: Avatar pending for implementation
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { vendorInfo } = useSelector((state) => state.vendorAuth); // Gets Vendor Info through the useSelector Hook

  const [updateProfile, { isLoading, error }] = useUpdateVendorMutation(); // Redux Toolkit Mutation (array destructiring)

  //----------
  // Effects
  //----------
  // Redirect to login if not logged in
  useEffect(() => {
    setFirstName(vendorInfo.firstName);
    setLastName(vendorInfo.lastName);
    setEmail(vendorInfo.email);
  }, [vendorInfo.setFirstName, vendorInfo.setLastName, vendorInfo.setEmail]); // Dependency Array

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
        const res = await updateProfile({
          _id: vendorInfo._id,
          firstName,
          lastName,
          email,
          password,
        }).unwrap(); // Makes API Request

        dispatch(setCredentials({ ...res })); // Sets Credentials in Redux Store & LocalStorage
        toast.success("Profile Updated");
      } catch (error) {
        toast.error(error?.data?.message || error?.error); // Toastify implementation
        console.log("Update Profile Error:");
        console.log(error?.data?.message || error?.error);
      }
    }
  };

  //----------
  // Output
  //----------
  return (
    <section className="private-page-wrapper profile-wrapper">
      <FormContainer>
        <h1>Update Vendor Profile</h1>

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
                  Update
                </button>
              </div>
            </div>
          </div>
          {/* ./Submit */}

          <div className="row py-3">
            <div className="col-12">
              Already have an account? <Link to="/vendors/login">Login</Link>
            </div>
          </div>
        </form>
      </FormContainer>
    </section>
  );
};

export default Profile;
