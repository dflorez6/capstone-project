//====================
// Routes: Certificate Category
//====================
// Import the dependencies
import express from "express";
const router = express.Router();
import {
  getAllCertificateCategories,
  showCertificateCategory,
  createCertificateCategory,
  updateCertificateCategory,
  deleteCertificateCategory,
} from "../../../controllers/api/v1/certificateCategoriesController.js";
import { vendorProtect } from "../../../middleware/authVendorMiddleware.js"; // Only authenticated Vendor has access
// TODO: For future versions or if there is time, refactor protected route to add ADMIN level permissions

//--------------------
// Controller Actions
//--------------------
// Index
router.get("/", getAllCertificateCategories);

// Create
router.route("/").post(vendorProtect, createCertificateCategory);

// Show, Update, Delete
router
  .route("/:storeSlug")
  .get(vendorProtect, showCertificateCategory)
  .put(vendorProtect, updateCertificateCategory)
  .patch(vendorProtect, updateCertificateCategory)
  .delete(vendorProtect, deleteCertificateCategory);
// Another way of using router: Chain multiple actions to the same route

export default router;
