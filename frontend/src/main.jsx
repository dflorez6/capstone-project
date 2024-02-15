// Dependencies
import React from "react";
import ReactDOM from "react-dom/client";
// Router
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// Redux Store
import store from "./store.js";
import { Provider } from "react-redux";
// Components
import App from "./App.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
// Pages/Screens
//==========
// Public
//==========
import PublicHomePage from "./pages/public/home/HomePublic.jsx"; // Root
import Login from "./pages/public/auth/Login.jsx";
import VendorRegistration from "./pages/public/auth/VendorRegistration.jsx";
import PropertyManagerRegistration from "./pages/public/auth/PropertyManagerRegistration.jsx";
// import VendorLogin from "./pages/public/auth/VendorLogin.jsx";
// import PropertyManagerLogin from "./pages/public/auth/PropertyManagerLogin.jsx";
//==========
// Private
//==========
import Dashboard from "./pages/private/dashboard/Dashboard.jsx";
//----------
// Vendors
//----------
import VendorsProfile from "./pages/private/vendors/profile/Profile.jsx";
// TODO: Prop Manager Profile
//----------
// Property Managers
//----------
// TODO: Property Managers Pages
// Styles
import "./style.scss";

// Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* index={true} to let it know this is the root/index/home page/screen */}
      <Route index={true} path="/" element={<PublicHomePage />} />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/vendors/register" element={<VendorRegistration />} />
      <Route
        path="/property-managers/register"
        element={<PropertyManagerRegistration />}
      />

      {/* Private Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vendors/profile" element={<VendorsProfile />} />
      </Route>
    </Route>
  )
);

// Entry Point
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);

/*
// Independent Login per user
<Route path="/vendors/login" element={<VendorLogin />} />
<Route
  path="/property-managers/login"
  element={<PropertyManagerLogin />}
/>
*/
