// Dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// State
import { useDispatch, useSelector } from "react-redux";
import { propertyManagerSetCredentials } from "../../../../slices/propertyManagerAuthSlice";
import { useUpdatePropertyManagerMutation } from "../../../../slices/propertyManagersApiSlice";
import { useGetCitiesQuery } from "../../../../slices/cityApiSlice";
import { useGetProvincesQuery } from "../../../../slices/provinceApiSlice";
// Toast
import { toast } from "react-toastify";
// Components
import FormContainer from "../../../../components/FormContainer";
import Loader from "../../../../components/Loader";
// Styles
import "../../../../styles/styles/Profile.scss";

// Component
function Profile() {
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
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // Redux Store
  // const { vendorInfo } = useSelector((state) => state.vendorAuth); // Gets Vendor Info through the useSelector Hook
  const { propertyManagerInfo } = useSelector(
    (state) => state.propertyManagerAuth
  ); // Gets Vendor Info through the useSelector Hook

  // Redux Toolkit Mutations
  const [updateProfile, { isLoading, error }] = useUpdatePropertyManagerMutation(); // Array destructiring

  // Redux Toolkit Queries Fetch data (Redux Toolkit Slice)
  const { data: cities, isError: citiesError } = useGetCitiesQuery();
  const { data: provinces, isError: provincesError } = useGetProvincesQuery();

  //----------
  // Effects
  //----------
  // Update inputs from Redux Store for vendorInfo
  useEffect(() => {
    setFirstName(propertyManagerInfo.firstName);
    setLastName(propertyManagerInfo.lastName);
    setEmail(propertyManagerInfo.email);
    setPhone(propertyManagerInfo.phone);
    setStreet(propertyManagerInfo.address.street);
    setCity(propertyManagerInfo.address.city);
    setProvince(propertyManagerInfo.address.province);
    setPostalCode(propertyManagerInfo.address.postalCode);
  }, [
    propertyManagerInfo.firstName,
    propertyManagerInfo.lastName,
    propertyManagerInfo.email,
    propertyManagerInfo.phone,
    propertyManagerInfo.address.street,
    propertyManagerInfo.address.city,
    propertyManagerInfo.address.province,
    propertyManagerInfo.address.postalCode,
  ]); // Dependency Array

  //----------
  // Redux Toolkit Slice Errors
  //----------
  if (citiesError) {
    console.log("Cities Error:", citiesError);
  }
  if (provincesError) {
    console.log("Provinces Error:", provincesError);
  }

  //----------
  // Handlers
  //----------
  // Form Submit Handler
  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        // Build Address Object to update Vendor record in DB
        const address = {
          street,
          city,
          province,
          postalCode,
        };

        const res = await updateProfile({
          _id: propertyManagerInfo._id,
          firstName,
          lastName,
          email,
          password,
          phone,
          address,
        }).unwrap(); // Makes API Request
        dispatch(propertyManagerSetCredentials({ ...res })); // Sets Credentials in Redux Store & LocalStorage
        toast.success("Profile Updated");
      } catch (error) {
        toast.error(error?.data?.message || error?.error); // Toastify implementation
        console.log("Update Profile Error:");
        console.log(error?.data?.message || error?.error);
      }
    }
  };

  // CitySelect Component onChange Handler
  const handleCityChange = (selectedCity) => {
    // Do something with the selected city
  };

  //----------
  // Output
  //----------
  return (
    <section className="private-page-wrapper profile-wrapper">
      <FormContainer>
        <h1>Update Property Manager Profile</h1>

        <form className="form" id="" onSubmit={submitHandler}>
          <div className="row">
            <div className="col-12">
              <hr />
              <h2 className="f-h4 m-0">Account</h2>
            </div>
          </div>
          {/* ./Form Section Title */}

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
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
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
            {/* ./Input: Email */}

            <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="form-control"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {/* ./Input: Phone */}
          </div>

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

          {/* Form Section Title */}
          <div className="row">
            <div className="col-12 my-2">
              <hr />
              <h2 className="f-h4 m-0">Address</h2>
            </div>
          </div>
          {/* ./Form Section Title */}

          <div className="row">
            <div className="col-12 my-2">
              <label htmlFor="street">Street</label>
              <input
                type="text"
                name="street"
                id="street"
                className="form-control"
                placeholder="Enter first name"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
          </div>
          {/* ./Input: Street */}

          <div className="row">
            <div className="col-12 col-md-6 col-lg-6 my-2">
              {/* TODO: Create a Select Component */}
              <label htmlFor="city">City</label>
              <select
                name="city"
                id="city"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option disabled>Select...</option>
                {cities &&
                  cities.map((city) => (
                    <option key={city.id} value={city.city}>
                      {city.city}
                    </option>
                  ))}
              </select>
            </div>
            {/* ./Input: City */}

            <div className="col-12 col-md-3 col-lg-3 my-2">
              <label htmlFor="province">Province</label>
              <select
                name="province"
                id="province"
                className="form-control"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              >
                <option disabled>Select...</option>
                {provinces &&
                  provinces.map((province) => (
                    <option key={province.id} value={province.province}>
                      {province.provinceCode}
                    </option>
                  ))}
              </select>
            </div>
            {/* ./Input: Province */}

            <div className="col-12 col-md-3 col-lg-3 my-2">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                className="form-control"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            {/* ./Input: Postal Code */}
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
        </form>
      </FormContainer>
    </section>
  );
}

export default Profile;
