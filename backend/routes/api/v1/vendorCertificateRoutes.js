//====================
// Routes: Vendor Certificate
//====================
// Import the dependencies
import express from "express";
const router = express.Router();
import {
  getAllVendorCertificates,
  showVendorCertificate,
  createVendorCertificate,
  updateVendorCertificate,
  deleteVendorCertificate,
} from "../../../controllers/api/v1/vendorCertificatesController.js";
import { vendorProtect } from "../../../middleware/authVendorMiddleware.js"; // Only authenticated Vendor has access
// TODO: For future versions or if there is time, refactor protected route to add ADMIN level permissions
// Image Uploader
import imgUploader from "../../../services/multer.js";

//--------------------
// Controller Actions
//--------------------
// Index
router.route("/:vendorStore").get(getAllVendorCertificates);

// Create
router
  .route("/")
  .post(
    vendorProtect,
    imgUploader.single("certificateImage"),
    createVendorCertificate
  );

// Show, Update, Delete
router
  .route("/:vendorStore/:certificateId")
  .get(vendorProtect, showVendorCertificate)
  .put(
    vendorProtect,
    imgUploader.single("certificateImage"),
    updateVendorCertificate
  )
  .patch(
    vendorProtect,
    imgUploader.single("certificateImage"),
    updateVendorCertificate
  )
  .delete(vendorProtect, deleteVendorCertificate);

export default router;
