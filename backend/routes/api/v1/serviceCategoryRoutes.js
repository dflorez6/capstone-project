//====================
// Routes: Service Category
//====================
// Import the dependencies
import express from "express";
const router = express.Router();
import {
  getAllServiceCategories,
  showServiceCategory,
  createServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
} from "../../../controllers/api/v1/serviceCategoriesController.js";
import { vendorProtect } from "../../../middleware/authVendorMiddleware.js"; // Only authenticated Vendor has access
// TODO: For future versions or if there is time, refactor protected route to add ADMIN level permissions

//--------------------
// Controller Actions
//--------------------
// Index
router.get("/", getAllServiceCategories);

// Create
router.route("/").post(vendorProtect, createServiceCategory);

// Show, Update, Delete
router
  .route("/:id")
  .get(vendorProtect, showServiceCategory)
  .put(vendorProtect, updateServiceCategory)
  .patch(vendorProtect, updateServiceCategory)
  .delete(vendorProtect, deleteServiceCategory);
// Another way of using router: Chain multiple actions to the same route

export default router;
