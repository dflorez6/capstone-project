//====================
// Routes: Project
//====================
// Import the dependencies
import express from "express";
const router = express.Router();
import {
  getAllProjects,
  getPropertyManagerProjects,
  showProject,
  createProject,
  updateProject,
  deleteProject,
} from "../../../controllers/api/v1/projectsController.js";
import { propertyManagerProtect } from "../../../middleware/authPropertyManagerMiddleware.js"; // Only authenticated Property Mnager has access
// TODO: For future versions or if there is time, refactor protected route to add ADMIN level permissions
// Image Uploader
import imgUploader from "../../../services/multer.js";

//--------------------
// Controller Actions
//--------------------
// Index
router.get("/", getAllProjects);

// PropertyManagerProjects & Create
router
  .route("/:propertyManagerId")
  .get(getPropertyManagerProjects)
  .post(propertyManagerProtect, imgUploader.single("coverImage"), createProject);

// Show, Update, Delete
router
  .route("/:propertyManagerId/:projectId")
  .get(propertyManagerProtect, showProject)
  .put(propertyManagerProtect, imgUploader.single("coverImage"), updateProject)
  .patch(propertyManagerProtect, imgUploader.single("coverImage"), updateProject)
  .delete(propertyManagerProtect, deleteProject);

export default router;
