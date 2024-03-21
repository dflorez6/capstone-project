// Dependencies
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// State
import { useDispatch, useSelector } from "react-redux";
import { vendorSetCredentials } from "../../../../slices/vendorAuthSlice";
import {
  useShowVendorQuery,
  useUpdateVendorMutation,
} from "../../../../slices/vendorsApiSlice";
import { useGetCitiesQuery } from "../../../../slices/cityApiSlice";
import { useGetProvincesQuery } from "../../../../slices/provinceApiSlice";
// Toast
import { toast } from "react-toastify";
// Components
import FormContainer from "../../../../components/FormContainer";
import Loader from "../../../../components/Loader";
// Styles
import "../../../../styles/styles/Profile.scss";
// Assets
import profilePlaceholder from "../../../../assets/img/profile_placeholder.png";

// Component
const Profile = () => {
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
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // Create a ref for the file input element
  const inputFileRef = useRef(null);

  // Redux Store
  const { vendorInfo } = useSelector((state) => state.vendorAuth); // Gets Vendor Info through the useSelector Hook

  // Redux Toolkit Queries
  const {
    data: vendor,
    isLoading: vendorLoading,
    error: vendorError,
    refetch: vendorRefetch,
  } = useShowVendorQuery();

  // Redux Toolkit Mutations
  const [
    updateProfile,
    { isLoading: updateProfileLoading, error: updateProfileError },
  ] = useUpdateVendorMutation(); // Array destructiring

  // Redux Toolkit Queries Fetch data (Redux Toolkit Slice)
  const { data: cities, isError: citiesError } = useGetCitiesQuery();
  const { data: provinces, isError: provincesError } = useGetProvincesQuery();

  //----------
  // Effects
  //----------
  // Original code
  /*
  // Update inputs from Redux Store for vendorInfo
  useEffect(() => {
    setCompanyName(vendorInfo.companyName);
    setFirstName(vendorInfo.firstName);
    setLastName(vendorInfo.lastName);
    setEmail(vendorInfo.email);
    setPhone(vendorInfo.phone || "");
    setStreet(vendorInfo.address.street || "");
    setPostalCode(vendorInfo.address.postalCode || "");
    setCity(vendorInfo.address.city || "");
    setProvince(vendorInfo.address.province || "");
  }, [
    vendorInfo.companyName,
    vendorInfo.firstName,
    vendorInfo.lastName,
    vendorInfo.email,
    vendorInfo.phone,
    vendorInfo.address.street,
    vendorInfo.address.city,
    vendorInfo.address.province,
    vendorInfo.address.postalCode,
  ]); // Dependency Array
  */

  // Update inputs from fetched vendor data
  useEffect(() => {
    if (vendor) {
      setCompanyName(vendor?.companyName);
      setFirstName(vendor?.firstName);
      setLastName(vendor?.lastName);
      setEmail(vendor?.email);
      setPhone(vendor?.phone || "");
      setStreet(vendor?.address.street || "");
      setPostalCode(vendor?.address.postalCode || "");
      setCity(vendor?.address.city || "");
      setProvince(vendor?.address.province || "");
    } // TODO: ACA QUEDE
    // vendorRefetch(); // Refetch Vendor Info // TODO: Check if it goes here or in the submit form hanbdler
  }, [
    // vendorRefetch, // TODO: Check if it goes here or in the submit form hanbdler
    vendor,
  ]); // Dependency Array

  //----------
  // Redux Toolkit Slice Errors
  //----------
  if (vendorError) {
    console.log("Fetch Vendor Error:", vendorError);
  }
  if (updateProfileError) {
    console.log("Update Profile Error:", updateProfileError);
  }
  if (citiesError) {
    console.log("Cities Error:", citiesError);
  }
  if (provincesError) {
    console.log("Provinces Error:", provincesError);
  }

  console.log("Profile Update: ");

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

        // Form Data
        const formData = new FormData();
        formData.append("avatar", avatar); // Append selected image file to FormData
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("phone", phone);
        formData.append("address[street]", street);
        formData.append("address[city]", city);
        formData.append("address[province]", province);
        formData.append("address[postalCode]", postalCode);

        const res = await updateProfile(formData).unwrap(); // Pass FormData to updateProfile function & make API call

        vendorRefetch();
        dispatch(vendorSetCredentials({ ...res })); // Sets Credentials in Redux Store & LocalStorage
        toast.success("Profile updated successfully");
      } catch (error) {
        toast.error(error?.data?.message || error?.error); // Toastify implementation
        console.log("Update Profile Error:");
        console.log(error?.data?.message || error?.error);
      }
    }
  };

  // File Change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file); // Update the state with the selected file
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
      {vendorLoading ? (
        <Loader />
      ) : (
        <>
          <FormContainer>
            <h1>Update Vendor Profile</h1>

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
                  <label htmlFor="">Current Photo</label>
                  {vendorInfo.avatar.url === "" ? (
                    <>
                      <img
                        src={profilePlaceholder}
                        alt={vendorInfo.lastName}
                        className="avatar"
                      />
                    </>
                  ) : (
                    <img
                      src={vendorInfo.avatar.url}
                      alt=""
                      className="avatar"
                    />
                  )}
                </div>

                <div className="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
                  <label htmlFor="avatar">Update Photo</label>
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
                <div className="col-12 my-2">
                  <label htmlFor="firstName">Company Legal Name</label>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    className="form-control"
                    placeholder="Enter company's legal name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    disabled
                  />
                </div>
              </div>
              {/* ./Input: Text */}

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
                    <option value="" disabled>
                      Select...
                    </option>
                    {cities &&
                      cities.map((city) => (
                        <option key={city._id} value={city.city}>
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
                    <option value="" disabled>
                      Select...
                    </option>
                    {provinces &&
                      provinces.map((province) => (
                        <option key={province._id} value={province.province}>
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

              {updateProfileLoading && <Loader />}

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
        </>
      )}
    </section>
  );
};

export default Profile;
