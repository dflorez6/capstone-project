//====================
// Controller: Project Applications
//====================
// Import Dependencies
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import ProjectApplication from "../../../models/projectApplicationModel.js";
import Project from "../../../models/projectModel.js";
// Notifications
import { createNotification } from "./notificationsController.js";
import { NotificationTypes } from "../../../constants/notificationTypes.js";
import { NotificationMessages } from "../../../constants/notificationMessages.js";

//--------------------
// GET
//--------------------
// Action: Index
// Description: List of Project Applications. Accessed by Property Manager
// Route: GET /api/v1/project-applications/:projectId
// Access: Private
const getAllProjectApplications = asyncHandler(async (req, res) => {
  // Destructure req.params
  const { projectId } = req.params;

  try {
    // Find project applications where project ID and property manager ID match
    const projectApplications = await ProjectApplication.find({
      project: projectId,
    })
      .sort({ createdAt: -1 })
      .populate("project")
      .populate("vendor", "-password");

    res.status(200).json(projectApplications);
  } catch (error) {
    res.status(500).json(error.message);
  }
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
  const { applicationDate, project, vendor, propertyManager } = req.body;

  try {
    // Create the Project Application
    const projectApplication = await ProjectApplication.create({
      applicationDate,
      project,
      vendor,
    });

    // Fetch Project Name
    const fetchedProject = await Project.findById(project).select("name");
    const projectName = fetchedProject.name;

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

      // Build notification data object
      const notificationData = {
        sender: new mongoose.Types.ObjectId(projectApplication.vendor), // Casting to ObjectId in case it comes as a string
        senderType: "Vendor",
        recipient: new mongoose.Types.ObjectId(propertyManager), // Casting to ObjectId in case it comes as a string
        recipientType: "PropertyManager",
        notificationType: NotificationTypes.PROJECT_APPLICATION_CREATED,
        message: NotificationMessages.PROJECT_APPLICATION_CREATED,
        data: {
          projectId: projectApplication.project,
          projectName: projectName,
          // Used to rebuild the url to/projects/:propertyManagerId/:projectId
        },
      };

      // Call Notification Method
      createNotification(notificationData);
      // Trigger notification to Property Manager
      // TODO: Implement: Trigger notification to Property Manager
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
// Action: Update
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

      // Fetch Project Name
      const fetchedProject = await Project.findById(
        projectApplication.project
      ).select("name");
      const projectName = fetchedProject.name;

      // Build notification data object
      const notificationData = {
        sender: new mongoose.Types.ObjectId(
          projectApplication.project.propertyManager
        ), // Casting to ObjectId in case it comes as a string
        senderType: "PropertyManager",
        recipient: new mongoose.Types.ObjectId(projectApplication.vendor), // Casting to ObjectId in case it comes as a string
        recipientType: "Vendor",
        notificationType: NotificationTypes.PROJECT_APPLICATION_ACCEPTED,
        message: NotificationMessages.PROJECT_APPLICATION_ACCEPTED,
        data: {
          projectId: projectApplication.project,
          projectName: projectName,
          // Used to rebuild the url to/projects/:propertyManagerId/:projectId
        },
      };

      // Call Notification Method
      createNotification(notificationData);
      // TODO: Trigger notification to Vendor

      res.status(200).json(updatedProjectApplication);
    } else {
      res.status(401);
      throw new Error("Not authorized. Not the Project owner.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Action: Update
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

      // Fetch Project Name
      const fetchedProject = await Project.findById(
        projectApplication.project
      ).select("name");
      const projectName = fetchedProject.name;

      // Build notification data object
      const notificationData = {
        sender: new mongoose.Types.ObjectId(
          projectApplication.project.propertyManager
        ), // Casting to ObjectId in case it comes as a string
        senderType: "PropertyManager",
        recipient: new mongoose.Types.ObjectId(projectApplication.vendor), // Casting to ObjectId in case it comes as a string
        recipientType: "Vendor",
        notificationType: NotificationTypes.PROJECT_APPLICATION_REJECTED,
        message: NotificationMessages.PROJECT_APPLICATION_REJECTED,
        data: {
          projectId: projectApplication.project,
          projectName: projectName,
          // Used to rebuild the url to/projects/:propertyManagerId/:projectId
        },
      };

      // Call Notification Method
      createNotification(notificationData);
      // TODO: Trigger notification to Vendor

      res.status(200).json(updatedProjectApplication);
    } else {
      res.status(401);
      throw new Error("Not authorized.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// TODO: Implement: Update Notification Status
// TODO: I HAVE TO THINK ABOUT HOW TO HANDLE THIS PART. ONCE I GET INTO THE NOTIFICATIONS PART I WILL REVISIT THIS LATER

export {
  getAllProjectApplications,
  createProjectApplication,
  acceptApplication,
  rejectApplication,
};
