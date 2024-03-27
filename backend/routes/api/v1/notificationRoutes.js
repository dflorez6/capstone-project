//====================
// Routes: Notifications
//====================
// Import the dependencies
import express from "express";
const router = express.Router();
import {
  getAllVendorNotifications,
  getAllPropertyManagerNotifications,
  markReadVendorNotification,
  markReadPropertyManagerNotification,
  deleteVendorNotification,
  deletePropertyManagerNotification,
} from "../../../controllers/api/v1/notificationsController.js";
import { propertyManagerProtect } from "../../../middleware/authPropertyManagerMiddleware.js"; // Only authenticated Property Mnager has access
import { vendorProtect } from "../../../middleware/authVendorMiddleware.js"; // Only authenticated Vendor has access
import imgUploader from "../../../services/multer.js"; // TODO: In case I need to parse form data. Remove if not used

//--------------------
// Controller Actions
//--------------------
// Vendor
// Index
router.route("/vendor/:vendorId").get(vendorProtect, getAllVendorNotifications);

// Update
router
  .route("/vendor/:vendorId/:notificationId")
  .put(vendorProtect, markReadVendorNotification)
  .patch(vendorProtect, markReadVendorNotification);

// Delete
router
  .route("/vendor/:vendorId/:notificationId")
  .delete(vendorProtect, deleteVendorNotification);

// Property Manager
// Index
router
  .route("/propertyManager/:propertyManagerId")
  .get(propertyManagerProtect, getAllPropertyManagerNotifications);

// Update
router
  .route("/propertyManager/:propertyManagerId/:notificationId")
  .put(propertyManagerProtect, markReadPropertyManagerNotification)
  .patch(propertyManagerProtect, markReadPropertyManagerNotification);

// Delete
router
  .route("/propertyManager/:propertyManagerId/:notificationId")
  .delete(propertyManagerProtect, deletePropertyManagerNotification);

export default router;
