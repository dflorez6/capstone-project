//====================
// Routes: Work Order
//====================
// Import the dependencies
import express from "express";
const router = express.Router();
import {
  getPropertyManagerWorkOrderLogs,
  getVendorWorkOrderLogs,
  createVendorWorkOrderLogs,
} from "../../../controllers/api/v1/workOrderLogsController.js";
import { propertyManagerProtect } from "../../../middleware/authPropertyManagerMiddleware.js"; // Only authenticated Property Mnager has access
import { vendorProtect } from "../../../middleware/authVendorMiddleware.js"; // Only authenticated Vendor has access
// TODO: For future versions or if there is time, refactor protected route to add ADMIN level permissions
// Image Uploader
import imgUploader from "../../../services/multer.js";

//--------------------
// Controller Actions
//--------------------
// Vendor
// Index
router.get("/vendor/logs/:workOrderId", vendorProtect, getVendorWorkOrderLogs);

// Show

// Create
router.post(
  "/vendor/logs",
  vendorProtect,
  imgUploader.array("logImages", 3),
  createVendorWorkOrderLogs
);

// Update

// Update

// Delete

// Property Manager
// Index
router.get(
  "/property-manager/logs/:workOrderId",
  propertyManagerProtect,
  getPropertyManagerWorkOrderLogs
);

// Show

// Create

// Update

// Delete

export default router;
