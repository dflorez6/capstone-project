//====================
// Controller: Work Order Logs
//====================
// Import Dependencies
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import WorkOrder from "../../../models/workOrderModel.js";
import WorkOrderLog from "../../../models/workOrderLogModel.js";
// Notifications
import { createNotification } from "./notificationsController.js";
import { NotificationTypes } from "../../../constants/notificationTypes.js";
import { NotificationMessages } from "../../../constants/notificationMessages.js";

//--------------------
// GET
//--------------------
// Action: Index
// Description: List of Work Order Logs (Accessible by Property Manager)
// Route: GET /api/v1/work-orders/property-manager/logs/:workOrderId
// Access: Private
const getPropertyManagerWorkOrderLogs = asyncHandler(async (req, res) => {
  // Destructure req.params
  const { workOrderId } = req.params;

  // Find work order
  const workOrder = await WorkOrder.findOne({ _id: workOrderId }).populate(
    "project",
    "propertyManager"
  );
  const propertyManagerId = workOrder.project.propertyManager.toString();

  // Check if Work Order exists
  if (!workOrder) {
    res.status(404);
    throw new Error("Work order not found");
  }

  // Find work order logs
  const workOrderLogs = await WorkOrderLog.find({
    workOrder: workOrderId,
  })
    .sort({ createdAt: -1 })
    .populate({
      path: "workOrder",
    });

  try {
    // Check if property manager is authorized to create a work order log
    if (propertyManagerId === req.propertyManager._id.toString()) {
      res.status(200).json(workOrderLogs);
    } else {
      res.status(401);
      throw new Error("Not authorized.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Action: Index
// Description: List of Work Order Logs (Accessible by Property Manager)
// Route: GET /api/v1/work-orders/vendor/logs/:workOrderId
// Access: Private
const getVendorWorkOrderLogs = asyncHandler(async (req, res) => {
  // Destructure req.params
  const { workOrderId } = req.params;

  // Find work order
  const workOrder = await WorkOrder.findOne({ _id: workOrderId });
  const vendorId = workOrder.vendor.toString();

  // Check if Work Order exists
  if (!workOrder) {
    res.status(404);
    throw new Error("Work order not found");
  }

  // Find work order logs
  const workOrderLogs = await WorkOrderLog.find({
    workOrder: workOrderId,
  })
    .sort({ createdAt: -1 })
    .populate({
      path: "workOrder",
    });

  try {
    // Check if vendor is authorized to create a work order log
    if (vendorId === req.vendor._id.toString()) {
      res.status(200).json(workOrderLogs);
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
// Route: POST /api/v1/work-orders/vendor/logs
// Access: Private
const createVendorWorkOrderLogs = asyncHandler(async (req, res) => {
  // Destructure req.body
  const { title, comment, workOrderId } = req.body;

  // Find workOrder
  const workOrder = await WorkOrder.findOne({
    _id: workOrderId,
  });

  // Check if Work Order exists
  if (!workOrder) {
    res.status(404);
    throw new Error("Work order not found");
  }

  try {
    // Check if vendor is authorized to create a work order log
    if (workOrder.vendor.toString() === req.vendor._id.toString()) {
      // Initialize variables for coverImage and storeImages data
      let logImagesData = [];

      if (req.files) {
        // Iterate over uploaded files & upload them to Cloudinary
        for (const file of req.files) {
          logImagesData.push({
            url: file.path,
            publicId: file.filename,
          });
        }
      }

      // Create Work Order Log
      const workOrderLog = await WorkOrderLog.create({
        title,
        comment,
        logImages: logImagesData,
        workOrder: workOrderId,
      });

      res.status(200).json(workOrderLog);
    } else {
      res.status(401);
      throw new Error("Not authorized.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export {
  getPropertyManagerWorkOrderLogs,
  getVendorWorkOrderLogs,
  createVendorWorkOrderLogs,
};
