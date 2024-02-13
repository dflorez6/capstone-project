// Dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// State
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../../slices/vendorsApiSlice";
import { setCredentials } from "../../../slices/vendorAuthSlice";
// Components
import FormContainer from "../../../components/FormContainer";
import Loader from "../../../components/Loader";

// Component
function VendorLogin() {
  //----------
  // State
  //----------
  const navigate = useNavigate(); // Initialize
  const dispatch = useDispatch(); // Initialize

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, error }] = useLoginMutation(); // Redux Toolkit Query

  const { vendorInfo } = useSelector((state) => state.vendorAuth); // Gets Vendor Info through the useSelector Hook

  //----------
  // Effects
  //----------
  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (vendorInfo) {
      navigate("/dashboard");
    }
  }, [navigate, vendorInfo]); // Dependency Array

  //----------
  // Handlers
  //----------
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap(); // Makes API Request
      dispatch(setCredentials({ ...res })); // Sets Credentials in Redux Store & LocalStorage
      navigate("/dashboard"); // Redirects to Dashboard Page
    } catch (err) {
      toast.error(err?.data?.message || err?.error); // Toastify implementation
      console.log("Login Error:");
      console.log(err?.data?.message || err?.error);
    }
  };

  //----------
  // Output
  //----------
  return (
    <section className="page-wrapper">
      <FormContainer>
        <h1>Vendor Log In</h1>

        <form className="form" id="" onSubmit={submitHandler}>
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
            <div className="col-12 my-2">
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
          </div>
          {/* ./Input: Password */}

          {isLoading && <Loader />}

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
              New Customer? <Link to="/vendors/register">Register</Link>
            </div>
          </div>
        </form>
      </FormContainer>
    </section>
  );
}

export default VendorLogin;
