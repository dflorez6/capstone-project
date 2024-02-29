//====================
// Routes: City
//====================
// Import the dependencies
import express from "express";
const router = express.Router();
import {
  getAllVendorStores,
  showVendorStore,
  createVendorStore,
  updateVendorStore,
  deleteVendorStore,
} from "../../../controllers/api/v1/vendorStoresController.js";
import { protect } from "../../../middleware/authVendorMiddleware.js"; // Only authenticated Vendor has access
// TODO: For future versions or if there is time, refactor protected route to add ADMIN level permissions

//--------------------
// Controller Actions
//--------------------
// Index
router.get("/", getAllVendorStores);

// Create
router.route("/").post(protect, createVendorStore);

// Show, Update, Delete
router
  .route("/:storeSlug")
  .get(protect, showVendorStore)
  .put(protect, updateVendorStore)
  .patch(protect, updateVendorStore)
  .delete(protect, deleteVendorStore);
// Another way of using router: Chain multiple actions to the same route

export default router;