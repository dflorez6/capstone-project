//====================
// Routes: City
//====================
// Import the dependencies
import express from "express";
const router = express.Router();
import {
  getAllCities,
  showCity,
  createCity,
  updateCity,
  deleteCity,
} from "../../../controllers/api/v1/citiesController.js";
import { vendorProtect } from "../../../middleware/authVendorMiddleware.js"; // Only authenticated Vendor has access
// TODO: For future versions or if there is time, refactor protected route to add ADMIN level permissions

//--------------------
// Controller Actions
//--------------------
// Index
router.get("/", getAllCities);

// Create
router.route("/").post(vendorProtect, createCity);

// Show, Update, Delete
router
  .route("/:id")
  .get(vendorProtect, showCity)
  .put(vendorProtect, updateCity)
  .patch(vendorProtect, updateCity)
  .delete(vendorProtect, deleteCity);
// Another way of using router: Chain multiple actions to the same route

export default router;
