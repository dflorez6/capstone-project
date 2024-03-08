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
import { protect } from "../../../middleware/authVendorMiddleware.js"; // Only authenticated Vendor has access
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
    protect,
    imgUploader.single("certificateImage"),
    createVendorCertificate
  );

// Show, Update, Delete
router
  .route("/:vendorStore/:certificateId")
  .get(protect, showVendorCertificate)
  .put(protect, imgUploader.single("certificateImage"), updateVendorCertificate)
  .patch(
    protect,
    imgUploader.single("certificateImage"),
    updateVendorCertificate
  )
  .delete(protect, deleteVendorCertificate);

export default router;
