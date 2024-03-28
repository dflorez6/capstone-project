//====================
// Controller: Work Orders
//====================
// Import Dependencies
import asyncHandler from "express-async-handler";
import WorkOrder from "../../../models/workOrderModel.js";
import Project from "../../../models/projectModel.js";

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
// Route: GET /api/v1/work-orders/property-manager/:projectId/:workOrderId
// Access: Private
const showPropertyManagerWorkOrder = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Show Work Order - PM" });
});

// Action: Show
// Description: Project's Work Order Details (Accessible by Vendor)
// Route: GET /api/v1/work-orders/vendor/:projectId/:workOrderId
// Access: Private
const showVendorWorkOrder = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Show Work Order - V" });
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

      // TODO: ACA QUEDE
      // TODO: Implement Notification to Vendor
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
  res.status(200).json({ message: "Project Updated - PM" });
});

// Action: Update
// Description: Reschedule Project's Work Order (Accessible by Vendor)
// Route: PUT /api/v1/work-orders/vendor/:projectId/:workOrderId
// Access: Private
const rescheduleWorkOrder = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Project Updated - V" });
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
  rescheduleWorkOrder,
  deleteWorkOrder,
};
