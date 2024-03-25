//====================
// Routes: City
//====================
// Import the dependencies
import express from "express";
const router = express.Router();
import {
  getAllProvinces,
  showProvince,
  createProvince,
  updateProvince,
  deleteProvince,
} from "../../../controllers/api/v1/provincesController.js";
import { vendorProtect } from "../../../middleware/authVendorMiddleware.js"; // Only authenticated Vendor has access
// TODO: For future versions or if there is time, refactor protected route to add ADMIN level permissions

//--------------------
// Controller Actions
//--------------------
// Index
router.get("/", getAllProvinces);

// Create
router.route("/").post(vendorProtect, createProvince);

// Show, Update, Delete
router
  .route("/:id")
  .get(vendorProtect, showProvince)
  .put(vendorProtect, updateProvince)
  .patch(vendorProtect, updateProvince)
  .delete(vendorProtect, deleteProvince);
// Another way of using router: Chain multiple actions to the same route

export default router;
