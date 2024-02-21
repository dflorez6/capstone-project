//====================
// Routes: Vendor
//====================
// Import the dependencies
import express from "express";
const router = express.Router();
import {
  authVendor,
  registerVendor,
  logoutVendor,
  getVendorProfile,
  updateVendorProfile,
} from "../../../controllers/api/v1/vendorsController.js";
import { protect } from "../../../middleware/authVendorMiddleware.js"; // Only authenticated Vendor has access
// Image Uploader
import imgUploader from "../../../services/multer.js";

//--------------------
// Controller Actions
//--------------------
// Auth
router.post("/register", imgUploader.single("avatar"), registerVendor);
router.post("/auth", authVendor);
router.post("/logout", logoutVendor);

// Profile
// Another way of using router: Chain multiple actions to the same route
router
  .route("/profile")
  .get(protect, getVendorProfile)
  .put(protect, imgUploader.single("avatar"), updateVendorProfile);

// Profile
// router.get("/profile", getVendorProfile);

// Update
// router.put("/profile", updateVendorProfile);

// Index
// router.get("/", index);

// Create
// router.post("/", create);

// Show
// router.get("/:id", show);

// Update
// router.patch("/:id", update);
// router.put("/:id", update);

// Destroy
// router.delete("/:id", destroy);

export default router;
