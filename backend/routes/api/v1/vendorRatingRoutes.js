//====================
// Routes: Vendor Rating
//====================
// Import the dependencies
import express from "express";
const router = express.Router();
import {
  getVendorAverageRatings,
  createVendorRating,
} from "../../../controllers/api/v1/vendorRatingsController.js";
import { propertyManagerProtect } from "../../../middleware/authPropertyManagerMiddleware.js"; // Only authenticated Property Mnager has access
import { vendorProtect } from "../../../middleware/authVendorMiddleware.js"; // Only authenticated Vendor has access
// TODO: For future versions or if there is time, refactor protected route to add ADMIN level permissions
// Image Uploader
import imgUploader from "../../../services/multer.js";

//--------------------
// Controller Actions
//--------------------
// Index
router.get("/:vendorId", getVendorAverageRatings);

// Show

// Create
router.post(
  "/",
  propertyManagerProtect,
  imgUploader.none(),
  createVendorRating
);

export default router;
