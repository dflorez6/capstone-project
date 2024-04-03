//====================
// Routes: Work Order
//====================
// Import the dependencies
import express from "express";
const router = express.Router();
import {
  // Index
  getPropertyManagerProjectWorkOrders,
  getVendorProjectWorkOrders,
  getAllPropertyManagerWorkOrders,
  getAllVendorWorkOrders,
  // Show
  showPropertyManagerWorkOrder,
  showVendorWorkOrder,
  // Create
  createWorkOrder,
  // Update
  updateWorkOrder,
  vendorAcceptWorkOrder,
  propertyManagerAcceptWorkOrder,
  vendorRescheduleWorkOrder,
  propertyManagerRescheduleWorkOrder,
  propertyManagerCloseWorkOrder,
  // Delete
  deleteWorkOrder,
} from "../../../controllers/api/v1/workOrdersController.js";
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
router.get("/vendor/:vendorId", vendorProtect, getAllVendorWorkOrders);
router.get(
  "/vendor/:vendorId/project/:projectId",
  vendorProtect,
  getVendorProjectWorkOrders
);

// Show
router.get("/vendor/order/:workOrderId", vendorProtect, showVendorWorkOrder);

// Update
router.put(
  "/vendor/accept/:projectId/:workOrderId",
  vendorProtect,
  imgUploader.none(),
  vendorAcceptWorkOrder
);
router.put(
  "/vendor/reschedule/:projectId/:workOrderId",
  vendorProtect,
  imgUploader.none(),
  vendorRescheduleWorkOrder
);

// Property Manager
// Index
router.get(
  "/property-manager/:propertyManagerId/project/:projectId",
  propertyManagerProtect,
  getPropertyManagerProjectWorkOrders
);
router.get(
  "/property-manager/all/:propertyManagerId",
  propertyManagerProtect,
  getAllPropertyManagerWorkOrders
);

// Show
router.get(
  "/property-manager/order/:workOrderId",
  propertyManagerProtect,
  showPropertyManagerWorkOrder
);

// Create
router.post(
  "/property-manager/:projectId",
  propertyManagerProtect,
  imgUploader.none(),
  createWorkOrder
);

// Update
router.put(
  "/property-manager/:projectId/:workOrderId",
  propertyManagerProtect,
  imgUploader.none(),
  updateWorkOrder
);
router.put(
  "/property-manager/accept/:projectId/:workOrderId",
  propertyManagerProtect,
  imgUploader.none(),
  propertyManagerAcceptWorkOrder
);
router.put(
  "/property-manager/reschedule/:projectId/:workOrderId",
  propertyManagerProtect,
  imgUploader.none(),
  propertyManagerRescheduleWorkOrder
);
router.put(
  "/property-manager/close/:projectId/:workOrderId",
  propertyManagerProtect,
  imgUploader.none(),
  propertyManagerCloseWorkOrder
);

// Delete
router.delete(
  "/property-manager/:projectId/:workOrderId",
  propertyManagerProtect,
  deleteWorkOrder
);

export default router;
