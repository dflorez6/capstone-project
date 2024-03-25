//====================
// Routes: Project Application
//====================
// Import the dependencies
import express from "express";
const router = express.Router();
import {
  getAllProjectApplications,
  showProjectApplication,
  createProjectApplication,
  acceptApplication,
  rejectApplication,
} from "../../../controllers/api/v1/projectApplicationsController.js";
import { vendorProtect } from "../../../middleware/authVendorMiddleware.js"; // Only authenticated Vendor has access
import { propertyManagerProtect } from "../../../middleware/authPropertyManagerMiddleware.js"; // Only authenticated Property Manager has access
// TODO: For future versions or if there is time, refactor protected route to add ADMIN level per
// Image Uploader
import imgUploader from "../../../services/multer.js";

//--------------------
// Controller Actions
//--------------------
// Vendor
// Create
router.route("/").post(vendorProtect, imgUploader.none(), createProjectApplication);

// Property Manager
// Index
router
  .route("/:propertyManagerId")
  .get(propertyManagerProtect, getAllProjectApplications);

// Show
router
  .route("/:propertyManagerId/:projectApplicationId")
  .get(propertyManagerProtect, showProjectApplication)
  .put(propertyManagerProtect, acceptApplication)
  .patch(propertyManagerProtect, acceptApplication)
  .put(propertyManagerProtect, rejectApplication)
  .patch(propertyManagerProtect, rejectApplication);

// Accept, Reject
router
  .route("/accept")
  .put(propertyManagerProtect, acceptApplication)
  .patch(propertyManagerProtect, acceptApplication);
router
  .route("/reject")
  .put(propertyManagerProtect, rejectApplication)
  .patch(propertyManagerProtect, rejectApplication);

export default router;
