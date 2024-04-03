//====================
// Controller: Work Orders
//====================
// Import Dependencies
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import WorkOrder from "../../../models/workOrderModel.js";
import Project from "../../../models/projectModel.js";
// Notifications
import { createNotification } from "./notificationsController.js";
import { NotificationTypes } from "../../../constants/notificationTypes.js";
import { NotificationMessages } from "../../../constants/notificationMessages.js";

//--------------------
// GET
//--------------------
// Action: Index
// Description: List of Project's Work Orders (Accessible by Property Manager)
// Route: GET /api/v1/work-orders/property-manager/:propertyManagerId/project/:projectId
// Access: Private
const getPropertyManagerProjectWorkOrders = asyncHandler(async (req, res) => {
  // Destruction req.params
  const { propertyManagerId, projectId } = req.params;

  try {
    // Find work orders related to the project ids
    const workOrders = await WorkOrder.find({
      project: projectId,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "project",
        populate: { path: "propertyManager", select: "-password" },
      })
      .populate("vendor", "-password");

    // Check if work orders were found
    if (!workOrders) {
      res.status(404);
      throw new Error("No Work Orders Found");
    }

    // Check if the property manager is authorized
    if (propertyManagerId === req.propertyManager._id.toString()) {
      res.status(200).json(workOrders);
    } else {
      res.status(401);
      throw new Error("Not authorized.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Action: Index
// Description: List of Project's Work Orders (Accessible by Vendor)
// Route: GET /api/v1/work-orders/vendor/:vendorId/project/:projectId
// Access: Private
const getVendorProjectWorkOrders = asyncHandler(async (req, res) => {
  // Destruction req.params
  const { vendorId, projectId } = req.params;

  try {
    // Find work orders related to the project ids
    const workOrders = await WorkOrder.find({
      project: projectId,
      vendor: vendorId,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "project",
        populate: { path: "propertyManager", select: "-password" },
      })
      .populate("vendor", "-password");

    // Check if work orders were found
    if (!workOrders) {
      res.status(404);
      throw new Error("No Work Orders Found");
    }

    // Check if the property manager is authorized
    if (vendorId === req.vendor._id.toString()) {
      res.status(200).json(workOrders);
    } else {
      res.status(401);
      throw new Error("Not authorized.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Action: Index
// Description: List of all Work Orders (Accessible by Property Manager)
// Route: GET /api/v1/work-orders/property-manager/all/:propertyManagerId
// Access: Private
const getAllPropertyManagerWorkOrders = asyncHandler(async (req, res) => {
  // Destruction req.params
  const { propertyManagerId } = req.params;

  try {
    // Fetch projects managed by the property manager
    const projects = await Project.find({ propertyManager: propertyManagerId });

    // Extract project ids
    const projectIds = projects.map((project) => project._id);

    // Find work orders related to the project ids
    const workOrders = await WorkOrder.find({
      project: { $in: projectIds },
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "project",
        populate: { path: "propertyManager", select: "-password" },
      })
      .populate("vendor", "-password");

    // Check if work orders were found
    if (!workOrders) {
      res.status(404);
      throw new Error("No Work Orders Found");
    }

    // Check if the property manager is authorized
    if (propertyManagerId === req.propertyManager._id.toString()) {
      res.status(200).json(workOrders);
    } else {
      res.status(401);
      throw new Error("Not authorized.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Action: Index
// Description: List of all Work Orders (Accessible by Vendor)
// Route: GET /api/v1/work-orders/vendor/:vendorId
// Access: Private
const getAllVendorWorkOrders = asyncHandler(async (req, res) => {
  // Destruction req.params
  const { vendorId } = req.params;

  try {
    // Fetch work orders related to the vendor
    const workOrders = await WorkOrder.find({
      vendor: vendorId,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "project",
        populate: { path: "propertyManager", select: "-password" },
      })
      .populate("vendor", "-password");

    // Check if work orders were found
    if (!workOrders) {
      res.status(404);
      throw new Error("No Work Orders Found");
    }

    // Check if the property manager is authorized
    if (vendorId === req.vendor._id.toString()) {
      res.status(200).json(workOrders);
    } else {
      res.status(401);
      throw new Error("Not authorized.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Action: Show
// Description: Project's Work Order Details (Accessible by Property Manager)
// Route: GET /api/v1/work-orders/property-manager/order/:workOrderId
// Access: Private
const showPropertyManagerWorkOrder = asyncHandler(async (req, res) => {
  // Destruction req.params
  const { workOrderId } = req.params;

  // Fetch Project
  const workOrder = await WorkOrder.findOne({
    _id: workOrderId,
  }).populate([
    {
      path: "project",
    },
    {
      path: "vendor",
      select: "companyName",
    },
  ]);

  // Check if Project exists
  if (!workOrder) {
    res.status(400); // Bad Request
    throw new Error("Work order doesn't exist");
  }

  try {
    // Check if Property Manager is the owner of the Project
    if (
      workOrder.project.propertyManager.toString() ===
      req.propertyManager._id.toString()
    ) {
      res.status(200).json(workOrder);
    } else {
      res.status(401);
      throw new Error("Not authorized.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Action: Show
// Description: Project's Work Order Details (Accessible by Vendor)
// Route: GET /api/v1/work-orders/vendor/order/:workOrderId
// Access: Private
const showVendorWorkOrder = asyncHandler(async (req, res) => {
  // Destruction req.params
  const { workOrderId } = req.params;

  // Fetch Project
  const workOrder = await WorkOrder.findOne({
    _id: workOrderId,
  }).populate([
    {
      path: "project",
    },
    {
      path: "vendor",
      select: "companyName",
    },
  ]);

  // Check if Project exists
  if (!workOrder) {
    res.status(400); // Bad Request
    throw new Error("Work order doesn't exist");
  }

  try {
    // Check if Property Manager is the owner of the Project
    if (workOrder.vendor._id.toString() === req.vendor._id.toString()) {
      res.status(200).json(workOrder);
    } else {
      res.status(401);
      throw new Error("Not authorized.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//--------------------
// POST
//--------------------
// Action: Create
// Description: Create Project's Work Order
// Route: POST /api/v1/work-orders/property-manager/:projectId
// Access: Private
const createWorkOrder = asyncHandler(async (req, res) => {
  // Destructure req.params
  const { projectId } = req.params;

  // Destructure req.body
  const { name, startDateTime, endDateTime, vendor } = req.body;

  try {
    // Create a new Work Order
    const workOrder = await WorkOrder.create({
      name,
      startDateTime,
      endDateTime,
      vendor,
      project: projectId,
    });

    // Fetch Project Name
    const fetchedProject = await Project.findById(projectId).select(
      "name propertyManager"
    );
    const projectName = fetchedProject.name;
    const propertyManager = fetchedProject.propertyManager;

    // Check if Work Order was created
    if (workOrder) {
      // Response
      res.status(201).json({
        _id: workOrder._id,
        startDateTime: workOrder.startDateTime,
        endDateTime: workOrder.endDateTime,
        workOrderStatus: workOrder.workOrderStatus,
        vendor: workOrder.vendor,
        project: workOrder.project,
      });

      // Build notification data object
      const notificationData = {
        sender: new mongoose.Types.ObjectId(propertyManager), // Casting to ObjectId in case it comes as a string
        senderType: "PropertyManager",
        recipient: new mongoose.Types.ObjectId(vendor), // Casting to ObjectId in case it comes as a string
        recipientType: "Vendor",
        notificationType: NotificationTypes.WORK_ORDER_CREATED,
        message: NotificationMessages.WORK_ORDER_CREATED,
        data: {
          projectId: projectId,
          projectName: projectName,
          // Used to rebuild the url to/projects/:propertyManagerId/:projectId
        },
      };

      // Call Notification Method
      createNotification(notificationData);
      // TODO: Implement: Trigger notification to Vendor
    } else {
      res.status(400);
      throw new Error("Invalid Work Order Data");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//--------------------
// PUT / PATCH
//--------------------
// Action: Update
// Description: Update Project's Work Order (Accessible by Property Manager)
// Route: PUT /api/v1/work-orders/property-manager/:projectId/:workOrderId
// Access: Private
const updateWorkOrder = asyncHandler(async (req, res) => {
  // Destruction req.params
  const { projectId, workOrderId } = req.params;

  // Fetch Project
  const workOrder = await WorkOrder.findOne({
    _id: workOrderId,
  }).populate([
    {
      path: "project",
      select: "name propertyManager",
    },
    {
      path: "vendor",
      select: "companyName",
    },
  ]);

  // Check if Project exists
  if (!workOrder) {
    res.status(400); // Bad Request
    throw new Error("Work order doesn't exist");
  }

  // Fetch Project Name
  const fetchedProject = await Project.findById(projectId).select(
    "name propertyManager"
  );
  const projectName = fetchedProject.name;
  const propertyManager = fetchedProject.propertyManager;

  try {
    // Destructure req.body
    const { name, startDateTime, endDateTime, vendor } = req.body;

    // Check if Property Manager is the owner of the Project
    if (
      workOrder.project.propertyManager.toString() ===
      req.propertyManager._id.toString()
    ) {
      // Update the Work Order
      if (name) workOrder.name = name;
      if (vendor) workOrder.vendor = vendor;
      if (startDateTime) workOrder.startDateTime = startDateTime;
      if (endDateTime) workOrder.endDateTime = endDateTime;
      workOrder.workOrderStatus = "rescheduleByPropertyManager";

      // Save new data
      const updatedProject = await workOrder.save();

      res.status(200).json(updatedProject);

      // Build notification data object
      const notificationData = {
        sender: new mongoose.Types.ObjectId(propertyManager), // Casting to ObjectId in case it comes as a string
        senderType: "PropertyManager",
        recipient: new mongoose.Types.ObjectId(workOrder.vendor._id), // Casting to ObjectId in case it comes as a string
        recipientType: "Vendor",
        notificationType: NotificationTypes.WORK_ORDER_RESCHEDULE_PROP_MANAGER,
        message: NotificationMessages.WORK_ORDER_RESCHEDULE_PROP_MANAGER,
        data: {
          projectId: projectId,
          projectName: projectName,
          // Used to rebuild the url to/projects/:propertyManagerId/:projectId
        },
      };

      // Call Notification Method
      createNotification(notificationData);

      // TODO: Implement: Trigger notification to Vendor
    } else {
      res.status(401);
      throw new Error("Not authorized.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Action: Update
// Description: Reschedule Project's Work Order (Accessible by Vendor)
// Route: PUT /api/v1/work-orders/vendor/accept/:projectId/:workOrderId
// Access: Private
const vendorAcceptWorkOrder = asyncHandler(async (req, res) => {
  // Destruction req.params
  const { projectId, workOrderId } = req.params;

  // Fetch Project
  const workOrder = await WorkOrder.findOne({
    _id: workOrderId,
  }).populate([
    {
      path: "project",
      select: "name propertyManager",
    },
    {
      path: "vendor",
      select: "companyName",
    },
  ]);

  // Check if Project exists
  if (!workOrder) {
    res.status(400); // Bad Request
    throw new Error("Work order doesn't exist");
  }

  // Fetch Project Name
  const fetchedProject = await Project.findById(projectId).select(
    "name propertyManager"
  );
  const projectName = fetchedProject.name;
  const propertyManager = fetchedProject.propertyManager;

  try {
    // Check if logged in Vendor is the same as the Work Order Vendor
    if (workOrder.vendor._id.toString() === req.vendor._id.toString()) {
      // Update the Work Order Status
      workOrder.workOrderStatus = "inProgress";

      // Save new data
      const updatedProject = await workOrder.save();

      res.status(200).json(updatedProject);

      // Build notification data object
      const notificationData = {
        sender: new mongoose.Types.ObjectId(workOrder.vendor._id), // Casting to ObjectId in case it comes as a string
        senderType: "Vendor",
        recipient: new mongoose.Types.ObjectId(propertyManager), // Casting to ObjectId in case it comes as a string
        recipientType: "PropertyManager",
        notificationType: NotificationTypes.WORK_ORDER_ACCEPTED_VENDOR,
        message: NotificationMessages.WORK_ORDER_ACCEPTED_VENDOR,
        data: {
          projectId: projectId,
          projectName: projectName,
          // Used to rebuild the url to/projects/:propertyManagerId/:projectId
        },
      };

      // Call Notification Method
      createNotification(notificationData);

      // TODO: Implement: Trigger notification to Vendor
    } else {
      res.status(401);
      throw new Error("Not authorized.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Action: Update
// Description: Reschedule Project's Work Order (Accessible by Property Manager)
// Route: PUT /api/v1/work-orders/property-manager/accept/:projectId/:workOrderId
// Access: Private
const propertyManagerAcceptWorkOrder = asyncHandler(async (req, res) => {
  // Destruction req.params
  const { projectId, workOrderId } = req.params;

  // Fetch Project
  const workOrder = await WorkOrder.findOne({
    _id: workOrderId,
  }).populate([
    {
      path: "project",
      select: "name propertyManager",
    },
    {
      path: "vendor",
      select: "companyName",
    },
  ]);

  // Check if Project exists
  if (!workOrder) {
    res.status(400); // Bad Request
    throw new Error("Work order doesn't exist");
  }

  // Fetch Project Name
  const fetchedProject = await Project.findById(projectId).select(
    "name propertyManager"
  );
  const projectName = fetchedProject.name;
  const propertyManager = fetchedProject.propertyManager;

  try {
    // Check if logged in Vendor is the same as the Work Order Vendor
    if (
      workOrder.project.propertyManager.toString() ===
      req.propertyManager._id.toString()
    ) {
      // Update the Work Order Status
      workOrder.workOrderStatus = "inProgress";

      // Save new data
      const updatedProject = await workOrder.save();

      res.status(200).json(updatedProject);

      // Build notification data object
      const notificationData = {
        sender: new mongoose.Types.ObjectId(propertyManager), // Casting to ObjectId in case it comes as a string
        senderType: "PropertyManager",
        recipient: new mongoose.Types.ObjectId(workOrder.vendor._id), // Casting to ObjectId in case it comes as a string
        recipientType: "Vendor",
        notificationType: NotificationTypes.WORK_ORDER_ACCEPTED_PROP_MANAGER,
        message: NotificationMessages.WORK_ORDER_ACCEPTED_PROP_MANAGER,
        data: {
          projectId: projectId,
          projectName: projectName,
          // Used to rebuild the url to/projects/:propertyManagerId/:projectId
        },
      };

      // Call Notification Method
      createNotification(notificationData);

      // TODO: Implement: Trigger notification to Vendor
    } else {
      res.status(401);
      throw new Error("Not authorized.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Action: Update
// Description: Reschedule Project's Work Order (Accessible by Vendor)
// Route: PUT /api/v1/work-orders/vendor/reschedule/:projectId/:workOrderId
// Access: Private
const vendorRescheduleWorkOrder = asyncHandler(async (req, res) => {
  // Destruction req.params
  const { projectId, workOrderId } = req.params;

  // Fetch Project
  const workOrder = await WorkOrder.findOne({
    _id: workOrderId,
  }).populate([
    {
      path: "project",
      select: "name propertyManager",
    },
    {
      path: "vendor",
      select: "companyName",
    },
  ]);

  // Check if Project exists
  if (!workOrder) {
    res.status(400); // Bad Request
    throw new Error("Work order doesn't exist");
  }

  // Fetch Project Name
  const fetchedProject = await Project.findById(projectId).select(
    "name propertyManager"
  );
  const projectName = fetchedProject.name;
  const propertyManager = fetchedProject.propertyManager;

  try {
    // Destructure req.body
    const { startDateTime, endDateTime } = req.body;

    // Check if logged in Vendor is the same as the Work Order Vendor
    if (workOrder.vendor._id.toString() === req.vendor._id.toString()) {
      // Update the Work Order Status
      workOrder.workOrderStatus = "rescheduleByVendor";
      workOrder.startDateTime = startDateTime;
      workOrder.endDateTime = endDateTime;

      // Save new data
      const updatedProject = await workOrder.save();

      res.status(200).json(updatedProject);

      // TODO: Notification. Vendor -> Prop Manager
      // Build notification data object
      const notificationData = {
        sender: new mongoose.Types.ObjectId(workOrder.vendor._id), // Casting to ObjectId in case it comes as a string
        senderType: "Vendor",
        recipient: new mongoose.Types.ObjectId(propertyManager), // Casting to ObjectId in case it comes as a string
        recipientType: "PropertyManager",
        notificationType: NotificationTypes.WORK_ORDER_RESCHEDULE_VENDOR,
        message: NotificationMessages.WORK_ORDER_RESCHEDULE_VENDOR,
        data: {
          projectId: projectId,
          projectName: projectName,
          // Used to rebuild the url to/projects/:propertyManagerId/:projectId
        },
      };

      // Call Notification Method
      createNotification(notificationData);

      // TODO: Implement: Trigger notification to Vendor
    } else {
      res.status(401);
      throw new Error("Not authorized.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Action: Update
// Description: Reschedule Project's Work Order (Accessible by Property Manager)
// Route: PUT /api/v1/work-orders/property-manager/reschedule/:projectId/:workOrderId
// Access: Private
const propertyManagerRescheduleWorkOrder = asyncHandler(async (req, res) => {
  // Destruction req.params
  const { projectId, workOrderId } = req.params;

  // Fetch Project
  const workOrder = await WorkOrder.findOne({
    _id: workOrderId,
  }).populate([
    {
      path: "project",
      select: "name propertyManager",
    },
    {
      path: "vendor",
      select: "companyName",
    },
  ]);

  // Check if Project exists
  if (!workOrder) {
    res.status(400); // Bad Request
    throw new Error("Work order doesn't exist");
  }

  // Fetch Project Name
  const fetchedProject = await Project.findById(projectId).select(
    "name propertyManager"
  );
  const projectName = fetchedProject.name;
  const propertyManager = fetchedProject.propertyManager;

  try {
    // Destructure req.body
    const { startDateTime, endDateTime } = req.body;

    // Check if logged in Vendor is the same as the Work Order Vendor
    if (
      workOrder.project.propertyManager.toString() ===
      req.propertyManager._id.toString()
    ) {
      // Update the Work Order Status
      workOrder.workOrderStatus = "rescheduleByPropertyManager";
      workOrder.startDateTime = startDateTime;
      workOrder.endDateTime = endDateTime;

      // Save new data
      const updatedProject = await workOrder.save();

      res.status(200).json(updatedProject);

      // Build notification data object
      const notificationData = {
        sender: new mongoose.Types.ObjectId(propertyManager), // Casting to ObjectId in case it comes as a string
        senderType: "PropertyManager",
        recipient: new mongoose.Types.ObjectId(workOrder.vendor._id), // Casting to ObjectId in case it comes as a string
        recipientType: "Vendor",
        notificationType: NotificationTypes.WORK_ORDER_RESCHEDULE_PROP_MANAGER,
        message: NotificationMessages.WORK_ORDER_RESCHEDULE_PROP_MANAGER,
        data: {
          projectId: projectId,
          projectName: projectName,
          // Used to rebuild the url to/projects/:propertyManagerId/:projectId
        },
      };

      // Call Notification Method
      createNotification(notificationData);

      // TODO: Implement: Trigger notification to Vendor
    } else {
      res.status(401);
      throw new Error("Not authorized.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//--------------------
// DELETE
//--------------------
// Description: Delete Project's Work Order (Accessible by Property Manager)
// Route: DELETE /api/v1/work-orders/property-manager/:projectId/:workOrderId
// Access: Private
const deleteWorkOrder = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Project Deleted - PM" });
});

export {
  getPropertyManagerProjectWorkOrders,
  getVendorProjectWorkOrders,
  getAllPropertyManagerWorkOrders,
  getAllVendorWorkOrders,
  showPropertyManagerWorkOrder,
  showVendorWorkOrder,
  createWorkOrder,
  updateWorkOrder,
  vendorAcceptWorkOrder,
  propertyManagerAcceptWorkOrder,
  vendorRescheduleWorkOrder,
  propertyManagerRescheduleWorkOrder,
  deleteWorkOrder,
};
