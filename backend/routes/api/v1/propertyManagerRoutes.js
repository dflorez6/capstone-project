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
import { propertyManagerProtect } from "../../../middleware/authPropertyManagerMiddleware.js"; // Only authenticated Vendor has access
// Image Uploader
import imgUploader from "../../../services/multer.js";

//--------------------
// Controller Actions
//--------------------
// Auth
router.post("/register", imgUploader.single("avatar"), registerPropertyManager);
router.post("/auth", authPropertyManager);
router.post("/logout", logoutPropertyManager);

// Profile
// Another way of using router: Chain multiple actions to the same route
router
  .route("/profile")
  .get(propertyManagerProtect, getPropertyManagerProfile)
  .put(propertyManagerProtect, imgUploader.single("avatar"), updatePropertyManagerProfile);

export default router;
