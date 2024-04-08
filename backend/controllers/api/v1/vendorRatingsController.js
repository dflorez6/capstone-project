//====================
// Controller: Vendor Ratings
//====================
// Import Dependencies
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import VendorRating from "../../../models/vendorRatingModel.js";
import Vendor from "../../../models/vendorModel.js";
import VendorStore from "../../../models/vendorStoreModel.js";
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
// Description: Returns Average Vendor Ratings (Accessible by Property Manager)
// Route: GET /api/v1/vendor-ratings/:vendorId
// Access: Public
const getVendorAverageRatings = asyncHandler(async (req, res) => {
  // Destructure req.params
  const { vendorId } = req.params;

  const vendorRecord = await Vendor.findOne({ _id: vendorId });

  // Check if Vendor exists
  if (!vendorRecord) {
    res.status(404);
    throw new Error("Vendor not found");
  }

  try {
    const result = await VendorRating.aggregate([
      {
        $match: { vendor: new mongoose.Types.ObjectId(vendorId) },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length > 0) {
      res.json({ averageRating: result[0].averageRating });
    } else {
      res.status(404).json({ error: "No ratings found for the vendor" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//--------------------
// POST
//--------------------
// Action: Create
// Description: Create Vendor Rating. (Accessible by Property Manager)
// Route: POST /api/v1/vendor-ratings
// Access: Private
const createVendorRating = asyncHandler(async (req, res) => {
  // Destructure req.body
  const { rating, vendor, propertyManager } = req.body;

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
      const vendorRating = await VendorRating.create({
        rating,
        vendor,
        propertyManager,
      });

      // Calculate average rating for the vendor
      const averageRating = await calculateAverageRating(vendor);

      // Update storeRating in VendorStore model
      await VendorStore.updateOne(
        { storeOwner: vendor },
        { $set: { storeRating: averageRating } }
      );

      res.status(201).json(vendorRating);

      // TODO: Send notification to the vendor
    } else {
      res.status(401);
      throw new Error("Not authorized.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//--------------------
// Methods
//--------------------
const calculateAverageRating = async (vendorId) => {
  try {
    const result = await VendorRating.aggregate([
      {
        $match: { vendor: new mongoose.Types.ObjectId(vendorId) },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    return result.length > 0 ? result[0].averageRating : 0;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { getVendorAverageRatings, createVendorRating };
