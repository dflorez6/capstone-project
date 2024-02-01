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
// Root
import PublicHomePage from "./pages/home/HomePublic.jsx";
//==========
// Public
//==========
import VendorLogin from "./pages/vendors/auth/VendorLogin.jsx";
import VendorRegistration from "./pages/vendors/auth/VendorRegistration.jsx";
//==========
// Private
//==========
import Dashboard from "./layouts/dashboard/Dashboard.jsx";
//----------
// Vendors
//----------
import VendorsProfile from "./pages/vendors/profile/Profile.jsx";
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
      <Route path="/vendors/login" element={<VendorLogin />} />
      <Route path="/vendors/register" element={<VendorRegistration />} />

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
