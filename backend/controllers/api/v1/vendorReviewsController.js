//====================
// Controller: Vendor Ratings
//====================
// Import Dependencies
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import VendorReview from "../../../models/vendorReviewModel.js";
import Vendor from "../../../models/vendorModel.js";
import PropertyManager from "../../../models/propertyManagerModel.js";
// Notifications
import { createNotification } from "./notificationsController.js";
import { NotificationTypes } from "../../../constants/notificationTypes.js";
import { NotificationMessages } from "../../../constants/notificationMessages.js";

//--------------------
// Endpoints
//--------------------
//--------------------
// GET
//--------------------
// Action: Index
// Description: Returns a list of Vendor Reviews
// Route: GET /api/v1/vendor-reviews/:storeSlug
// Access: Public
const getVendorReviews = asyncHandler(async (req, res) => {
  // Destructure req.params
  const { storeSlug } = req.params;

  const vendorRecord = await Vendor.findOne({ storeSlug });

  // Check if Vendor exists
  if (!vendorRecord) {
    res.status(404);
    throw new Error("Vendor not found");
  }

  try {
    const vendorReviews = await VendorReview.find({
      vendor: vendorRecord._id,
    }).populate({
      path: "propertyManager",
      select: "-password",
    });
    res.status(200).json(vendorReviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//--------------------
// POST
//--------------------
// Action: Create
// Description: Create Project's Work Order. (Accessible by Property Manager)
// Route: POST /api/v1/vendor-reviews
// Access: Private
const createVendorReview = asyncHandler(async (req, res) => {
  // Destructure req.body
  const { review, vendor, propertyManager } = req.body;

  // Find Vendor
  const vendorRecord = await Vendor.findOne({
    _id: vendor,
  });

  // Check if Vendor exists
  if (!vendorRecord) {
    res.status(404);
    throw new Error("Vendor not found");
  }

  // Find Property Manager
  const propertyManagerRecord = await PropertyManager.findOne({
    _id: propertyManager,
  });

  // Check if Work Order exists
  if (!propertyManagerRecord) {
    res.status(404);
    throw new Error("Property Manager not found");
  }

  try {
    if (propertyManager === req.propertyManager._id.toString()) {
      // Create Vendor Rating
      const vendorReview = await VendorReview.create({
        review,
        vendor,
        propertyManager,
      });

      res.status(201).json(vendorReview);

      // TODO: Send notification to the vendor
    } else {
      res.status(401);
      throw new Error("Not authorized.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { getVendorReviews, createVendorReview };
