//====================
// Routes: Vendor Store
//====================
// Import the dependencies
import express from "express";
const router = express.Router();
import {
  getAllVendorServices,
  showVendorService,
  createVendorService,
  updateVendorService,
  deleteVendorService,
} from "../../../controllers/api/v1/vendorServicesController.js";
import { vendorProtect } from "../../../middleware/authVendorMiddleware.js"; // Only authenticated Vendor has access
// TODO: For future versions or if there is time, refactor protected route to add ADMIN level permissions

//--------------------
// Controller Actions
//--------------------
// Index
router.route("/:vendorStore").get(getAllVendorServices);

// Create
router.route("/").post(vendorProtect, createVendorService);

// Show, Update, Delete
router
  .route("/:vendorStore/:serviceId")
  .get(vendorProtect, showVendorService)
  .put(vendorProtect, updateVendorService)
  .patch(vendorProtect, updateVendorService)
  .delete(vendorProtect, deleteVendorService);

export default router;
