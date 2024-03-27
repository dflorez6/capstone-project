//====================
// Controller: Notifications
//====================
// Import Dependencies

import asyncHandler from "express-async-handler";
import Notification from "../../../models/notificationModel.js";
import { NotificationTypes } from "../../../constants/notificationTypes.js";

//====================
// Endpoints
//====================
//--------------------
// GET
//--------------------
// Action: Index
// Description: List of Vendor Notifications. Accessed by Vendor
// Route: GET /api/v1/notifications/vendor/:vendorId
// Access: Private
const getAllVendorNotifications = asyncHandler(async (req, res) => {
  res.status(200).json("Get all vendor notifications");
});

// Action: Index
// Description: List of Property Manager Notifications. Accessed by Property Manager
// Route: GET /api/v1/notifications/propertyManager/:propertyManagerId
// Access: Private
const getAllPropertyManagerNotifications = asyncHandler(async (req, res) => {
  // Desctructure req.params
  const { propertyManagerId } = req.params;

  try {
    // Check if propertyManagerId matches the logged in user's ID
    if (propertyManagerId === req.propertyManager._id.toString()) {
      // Fetch notifications where recipient ID matches property manager ID
      const notifications = await Notification.find({
        recipient: propertyManagerId,
      })
        .sort({ createdAt: -1 })
        .populate("sender", "companyName");

      res.status(200).json(notifications);
    } else {
      res.status(401);
      throw new Error("Not authorized. Not the Property Manger.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//--------------------
// PUT / PATCH
//--------------------
// Action: Update
// Description: Update Vendor Notifications. Accessed by Vendor
// Route: PUT /api/v1/notifications/vendor/:vendorId/:notificationId
// Access: Private
const markReadVendorNotification = asyncHandler(async (req, res) => {
  res.status(200).json("Update vendor notifications");
  /*
    // TODO:
    * When user clicks on notification udapted DB field read to true
    * Once read = true -> Front-end will not show new notifications AND/OR it wont highlight it (like ig/fb notifications)
  */
});

// Action: Update
// Description: Update Property Manager Notifications. Accessed by Property Manager
// Route: PUT /api/v1/notifications/propertyManager/:propertyManagerId/:notificationId
// Access: Private
const markReadPropertyManagerNotification = asyncHandler(async (req, res) => {
  // Destructure req.params
  const { propertyManagerId, notificationId } = req.params;

  try {
    // Fetch notification
    const notification = await Notification.findById(notificationId);

    // Check if notification exists
    if (!notification) {
      res.status(404);
      throw new Error("Notification not found");
    }

    // Check if propertyManagerId matches the logged in user's ID
    if (propertyManagerId === req.propertyManager._id.toString()) {
      // Update notification
      notification.read = true;
      await notification.save();

      res.status(200).json(notification);
    } else {
      res.status(401);
      throw new Error("Not authorized. Not the Property Manger.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//--------------------
// DELETE
//--------------------
// Action: Destroy
// Description: Delete Vendor Notifications. Accessed by Vendor
// Route: DELETE /api/v1/notifications/vendor/:vendorId/:notificationId
// Access: Private
const deleteVendorNotification = asyncHandler(async (req, res) => {
  res.status(200).json("Delete vendor notifications");
});

// Action: Destroy
// Description: Delete Property Manager Notifications. Accessed by Property Manager
// Route: DELETE /api/v1/notifications/propertyManager/:propertyManagerId/:notificationId
// Access: Private
const deletePropertyManagerNotification = asyncHandler(async (req, res) => {
  // Destructure req.params
  const { propertyManagerId, notificationId } = req.params;

  try {
    // Fetch notification
    const notification = await Notification.findById(notificationId);

    // Check if notification exists
    if (!notification) {
      res.status(404);
      throw new Error("Notification not found");
    }

    // Check if propertyManagerId matches the logged in user's ID
    if (propertyManagerId === req.propertyManager._id.toString()) {
      // Perform delete operation
      await Notification.deleteOne({ _id: notification._id });

      res.status(200).json({
        message: "Property manager notification deleted successfully",
      });
    } else {
      res.status(401);
      throw new Error("Not authorized. Not the Property Manger.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//====================
// Utility Functions
//====================
// TODO: Copilot generated this code. It needs to be reviewed and tested.
const createNotification = async (notificationData) => {
  // console.log("notificationsController ------ createNotification ------>");
  // console.log("notificationData: ", notificationData);

  // Switch for handling different notification types
  switch (notificationData.notificationType) {
    case NotificationTypes.PROJECT_APPLICATION_CREATED:
      projectApplicationCreated(notificationData); // TODO: Implement this function
      break;
    case NotificationTypes.PROJECT_APPLICATION_ACCEPTED:
      projectApplicationAccepted(param1, param2, etc); // TODO: Implement this function
      break;
    case NotificationTypes.PROJECT_APPLICATION_REJECTED:
      projectApplicationRejected(param1, param2, etc); // TODO: Implement this function
      break;
    // TODO: Add cases for other notification types
  }
};

// Project Application Created
const projectApplicationCreated = async (notificationData) => {
  console.log("notificationsController: projectApplicationCreated ------>");
  // console.log("notificationData: ", notificationData);

  // Destructure notificationData
  const {
    sender,
    senderType,
    recipient,
    recipientType,
    notificationType,
    message,
    data,
  } = notificationData;

  try {
    // Create notification
    const notification = await Notification.create({
      sender,
      senderType,
      recipient,
      recipientType,
      notificationType,
      message,
      data,
    });

    // Check if Notification was created
    if (notification) {
      console.log("notification: ", notification);
      // Trigger notification to Property Manager
      // TODO: Implement: Trigger notification to Property Manager
      //return notification;
    } else {
      throw new Error("Invalid Notification data");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// Project Application Accepted
const projectApplicationAccepted = (param1, param2, etc) => {
  // Logic for project application accepted notification
};

// Project Application Rejected
const projectApplicationRejected = (param1, param2, etc) => {
  // Logic for project application accepted notification
};

//====================
// Export
//====================
export {
  // Endpoints
  getAllVendorNotifications,
  getAllPropertyManagerNotifications,
  markReadVendorNotification,
  markReadPropertyManagerNotification,
  deleteVendorNotification,
  deletePropertyManagerNotification,
  // Utility Functions
  createNotification,
};
