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
import { protect } from "../../../middleware/authVendorMiddleware.js"; // Only authenticated Vendor has access
// TODO: For future versions or if there is time, refactor protected route to add ADMIN level permissions

//--------------------
// Controller Actions
//--------------------
// Index
router.get("/", getAllVendorServices);

// Create
router.route("/").post(protect, createVendorService);

// Show, Update, Delete
router
  .route("/:vendorStore/:serviceId")
  .get(protect, showVendorService)
  .put(protect, updateVendorService)
  .patch(protect, updateVendorService)
  .delete(protect, deleteVendorService);

export default router;
