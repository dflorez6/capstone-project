//====================
// Controller: Project Applications
//====================
// Import Dependencies
import asyncHandler from "express-async-handler";
import ProjectApplication from "../../../models/projectApplicationModel.js";
import Project from "../../../models/projectModel.js";

//--------------------
// GET
//--------------------
// Action: Index
// Description: List of Project Applications. Accessed by Property Manager
// Route: GET /api/v1/project-applications/:propertyManagerId
// Access: Private
const getAllProjectApplications = asyncHandler(async (req, res) => {
  // Destructure req.params
  const { propertyManagerId } = req.params;

  try {
    // Find projects with passed query param
    const projects = await Project.find({ propertyManager: propertyManagerId });

    // Store only the projects that match the query param
    const filteredProjects = projects.filter((project) => project._id !== null);

    // Extract project IDs from the projects array
    const projectIds = projects.map((project) => project._id);

    // Find projectApplications where project IDs match
    const projectApplications = await ProjectApplication.find({
      project: { $in: projectIds }, // Find project applications with project IDs in projectIds array
    })
      .sort({ createdAt: -1 })
      .populate("project")
      .populate("vendor", "-password");

    res.status(200).json(projectApplications);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Action: Show
// Description: Project Application Detail. Accessed by Property Manager
// Route: GET /api/v1/project-applications/:propertyManagerId/:projectApplicationId
// Access: Private
const showProjectApplication = asyncHandler(async (req, res) => {
  // TODO: Implement if needed
  res.status(200).json("Show project application");
});

//--------------------
// POST
//--------------------
// Action: Create
// Description: Create Project Application. Accessed by Vendor
// Route: GET /api/v1/project-applications
// Access: Private
const createProjectApplication = asyncHandler(async (req, res) => {
  // Destructure req.body
  const { applicationDate, project, vendor } = req.body;

  try {
    // Create the Project Application
    const projectApplication = await ProjectApplication.create({
      applicationDate,
      project,
      vendor,
    });

    // Check if Project Application was created
    if (projectApplication) {
      // Response
      res.status(201).json({
        _id: projectApplication._id,
        applicationDate: projectApplication.applicationDate,
        applicationStatus: projectApplication.applicationStatus,
        notificationSeen: projectApplication.notificationSeen,
        project: projectApplication.project,
        vendor: projectApplication.vendor,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Project Application data");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//--------------------
// PUT / PATCH
//--------------------
// Action: Accept
// Description: Update Project Application Status. Accessed by Property Manager
// Route: PUT /api/v1/project-applications/accept
// Access: Private
const acceptApplication = asyncHandler(async (req, res) => {
  // Destructure req.body
  const { projectApplicationId } = req.body;

  // Fetch Project Application
  const projectApplication = await ProjectApplication.findById(
    projectApplicationId
  ).populate({
    path: "project",
    select: "propertyManager",
  });

  // Check if Project Application exists
  if (!projectApplication) {
    res.status(404);
    throw new Error("Project Application not found");
  }

  try {
    // Check if Project Application's propertyManager matches the authenticated propertyManager
    if (
      projectApplication.project.propertyManager.toString() ===
      req.propertyManager._id.toString()
    ) {
      // Update Project Application
      projectApplication.applicationStatus = "accepted"; // Set to the enum value
      const updatedProjectApplication = await projectApplication.save();

      res.status(200).json(updatedProjectApplication);
    } else {
      res.status(401);
      throw new Error("Not authorized. Not the Project owner.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Action: Reject
// Description: Update Project Application Status. Accessed by Property Manager
// Route: PUT /api/v1/project-applications/reject
// Access: Private
const rejectApplication = asyncHandler(async (req, res) => {
  // Destructure req.body
  const { projectApplicationId } = req.body;

  // Fetch Project Application
  const projectApplication = await ProjectApplication.findById(
    projectApplicationId
  ).populate({
    path: "project",
    select: "propertyManager",
  });

  // Check if Project Application exists
  if (!projectApplication) {
    res.status(404);
    throw new Error("Project Application not found");
  }

  try {
    // Check if Project Application's propertyManager matches the authenticated propertyManager
    if (
      projectApplication.project.propertyManager.toString() ===
      req.propertyManager._id.toString()
    ) {
      // Update Project Application
      projectApplication.applicationStatus = "rejected"; // Set to the enum value
      const updatedProjectApplication = await projectApplication.save();

      res.status(200).json(updatedProjectApplication);
    } else {
      res.status(401);
      throw new Error("Not authorized. Not the Project owner.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// TODO: Implement: Update Notification Status 
// TODO: I HAVE TO THINK ABOUT HOW TO HANDLE THIS PART. ONCE I GET INTO THE NOTIFICATIONS PART I WILL REVISIT THIS
// Action: Reject
// Description: Update Project Application Status. Accessed by Property Manager
// Route: PUT /api/v1/project-applications/reject
// Access: Private

export {
  getAllProjectApplications,
  showProjectApplication,
  createProjectApplication,
  acceptApplication,
  rejectApplication,
};
