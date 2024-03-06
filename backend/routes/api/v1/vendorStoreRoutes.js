//====================
// Routes: Vendor Store
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
  deleteVendorStoreImage,
} from "../../../controllers/api/v1/vendorStoresController.js";
import { protect } from "../../../middleware/authVendorMiddleware.js"; // Only authenticated Vendor has access
// TODO: For future versions or if there is time, refactor protected route to add ADMIN level permissions
// Image Uploader
import imgUploader from "../../../services/multer.js";

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
  .put(
    protect,
    // Use fields to allow Multer to parse multiple form fields
    imgUploader.fields([
      {
        name: "coverImage",
        maxCount: 1,
      },
      {
        name: "storeImages",
        maxCount: 2,
      },
    ]),
    updateVendorStore
  )
  .patch(
    protect,
    imgUploader.fields([
      {
        name: "coverImage",
        maxCount: 1,
      },
      {
        name: "storeImages",
        maxCount: 2,
      },
    ]),
    updateVendorStore
  )
  /*
  .put(
    protect,
    imgUploader.single("coverImage"),
    imgUploader.array("storeImages", 10),
    updateVendorStore
  )
  */
  // Multiple Multer Middleware
  //  .patch(protect, imgUploaderSingle.single("coverImage"), imgUploaderMultiple.array("storeImages"), updateVendorStore);
  .delete(protect, deleteVendorStore);

router.route("/:storeSlug/:imageId").delete(protect, deleteVendorStoreImage);

export default router;
