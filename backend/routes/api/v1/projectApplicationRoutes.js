//====================
// Routes: Project Application
//====================
// Import the dependencies
import express from "express";
const router = express.Router();
import {
  getAllProjectApplications,
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
router
  .route("/")
  .post(vendorProtect, imgUploader.none(), createProjectApplication);

// Property Manager
// Index
router
  .route("/:projectId")
  .get(propertyManagerProtect, getAllProjectApplications);

// Accept, Reject
router
  .route("/accept")
  .put(propertyManagerProtect, imgUploader.none(), acceptApplication)
  .patch(propertyManagerProtect, imgUploader.none(), acceptApplication);
router
  .route("/reject")
  .put(propertyManagerProtect, imgUploader.none(), rejectApplication)
  .patch(propertyManagerProtect, imgUploader.none(), rejectApplication);

export default router;
