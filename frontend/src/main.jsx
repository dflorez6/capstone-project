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
import Notification from "./pages/private/notifications/Notification.jsx";
//----------
// Vendors
//----------
import VendorsProfile from "./pages/private/vendors/profile/Profile.jsx";
import VendorStore from "./pages/private/vendors/store/VendorStore.jsx";
import VendorStoreEdit from "./pages/private/vendors/store/VendorStoreEdit.jsx";
import ProjectSearch from "./pages/private/vendors/project-search/ProjectSearch.jsx";
//----------
// Property Managers
//----------
import PropertyManagersProfile from "./pages/private/property-managers/profile/Profile.jsx";
import VendorSearch from "./pages/private/property-managers/vendor-search/VendorSearch.jsx";
import Projects from "./pages/private/property-managers/projects/Projects.jsx";
import Project from "./pages/private/property-managers/projects/Project.jsx";
import ProjectNew from "./pages/private/property-managers/projects/ProjectNew.jsx";
import ProjectEdit from "./pages/private/property-managers/projects/ProjectEdit.jsx";
//----------
// Work Orders
//----------
import WorkOrdersVendor from "./pages/private/work-orders/WorkOrdersVendor.jsx";
import WorkOrdersPropManager from "./pages/private/work-orders/WorkOrdersPropManager.jsx";
import WorkOrderNew from "./pages/private/work-orders/WorkOrderNew.jsx";
import WorkOrderEdit from "./pages/private/work-orders/WorkOrderEdit.jsx";
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
        <Route path="/notifications" element={<Notification />} />

        {/* Vendors */}
        <Route path="/vendors/store/:storeSlug" element={<VendorStore />} />
        <Route path="/projects" element={<ProjectSearch />} />
        <Route path="/vendors/profile" element={<VendorsProfile />} />
        <Route
          path="/vendors/store/:storeSlug/edit"
          element={<VendorStoreEdit />}
        />

        {/* Property Managers */}
        <Route
          path="/property-managers/profile"
          element={<PropertyManagersProfile />}
        />
        <Route path="/vendors/search" element={<VendorSearch />} />
        <Route path="/projects/:propertyManagerId" element={<Projects />} />
        <Route
          path="/projects/:propertyManagerId/:projectId"
          element={<Project />}
        />
        <Route path="/projects/new" element={<ProjectNew />} />
        <Route
          path="/projects/:propertyManagerId/:projectId/edit"
          element={<ProjectEdit />}
        />

        {/* Work Orders */}
        <Route path="/work-orders/vendor/:vendorId" element={<WorkOrdersVendor />} />
        <Route path="/work-orders/property-manager/:propertyManagerId" element={<WorkOrdersPropManager />} />        
        <Route path="/work-orders/new/:projectId" element={<WorkOrderNew />} />
        <Route
          path="/work-orders/edit/:projectId/:workOrderId"
          element={<WorkOrderEdit />}
        />
        {/* Route: */}
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
