//====================
// Routes: Project
//====================
// Import the dependencies
import express from "express";
const router = express.Router();
import {
  getAllProjects,
  showProject,
  createProject,
  updateProject,
  deleteProject,
} from "../../../controllers/api/v1/projectsController.js";
import { protect } from "../../../middleware/authPropertyManagerMiddleware.js"; // Only authenticated Property Mnager has access
// TODO: For future versions or if there is time, refactor protected route to add ADMIN level permissions
// Image Uploader
import imgUploader from "../../../services/multer.js";

//--------------------
// Controller Actions
//--------------------
// Index & Create
router
  .route("/:propertyManagerId")
  .get(getAllProjects)
  .post(protect, imgUploader.single("coverImage"), createProject);

// Show, Update, Delete
router
  .route("/:propertyManagerId/:projectId")
  .get(protect, showProject)
  .put(protect, imgUploader.single("coverImage"), updateProject)
  .patch(protect, imgUploader.single("coverImage"), updateProject)
  .delete(protect, deleteProject);

export default router;
