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
import { protect } from "../../../middleware/authVendorMiddleware.js"; // Only authenticated Vendor has access
// TODO: For future versions or if there is time, refactor protected route to add ADMIN level permissions

//--------------------
// Controller Actions
//--------------------
// Index
router.get("/", getAllCertificateCategories);

// Create
router.route("/").post(protect, createCertificateCategory);

// Show, Update, Delete
router
  .route("/:storeSlug")
  .get(protect, showCertificateCategory)
  .put(protect, updateCertificateCategory)
  .patch(protect, updateCertificateCategory)
  .delete(protect, deleteCertificateCategory);
// Another way of using router: Chain multiple actions to the same route

export default router;
