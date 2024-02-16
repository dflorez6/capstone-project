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
import { protect } from "../../../middleware/authVendorMiddleware.js"; // Only authenticated Vendor has access
// TODO: For future versions or if there is time, refactor protected route to add ADMIN level permissions

//--------------------
// Controller Actions
//--------------------
// Index
router.get("/", getAllCities);

// Create
router.route("/").post(protect, createCity);

// Show, Update, Delete
router
  .route("/:id")
  .get(protect, showCity)
  .put(protect, updateCity)
  .patch(protect, updateCity)
  .delete(protect, deleteCity);
// Another way of using router: Chain multiple actions to the same route

export default router;
