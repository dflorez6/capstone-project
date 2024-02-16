//====================
// Routes: Property Managers
//====================
// Import the dependencies
import express from "express";
const router = express.Router();
import {
  authPropertyManager,
  registerPropertyManager,
  logoutPropertyManager,
  getPropertyManagerProfile,
  updatePropertyManagerProfile,
} from "../../../controllers/api/v1/propertyManagersController.js";
import { protect } from "../../../middleware/authPropertyManagerMiddleware.js"; // Only authenticated Vendor has access

//--------------------
// Controller Actions
//--------------------
// Auth
router.post("/register", registerPropertyManager);
router.post("/auth", authPropertyManager);
router.post("/logout", logoutPropertyManager);

// Profile
// Another way of using router: Chain multiple actions to the same route
router
  .route("/profile")
  .get(protect, getPropertyManagerProfile)
  .put(protect, updatePropertyManagerProfile);

export default router;