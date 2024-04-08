//====================
// Model: Vendor Rating
//====================
// Import Dependencies
import mongoose from "mongoose";

//--------------------
// Schema Definition
//--------------------
const vendorReviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      required: true,
      trim: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    propertyManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PropertyManager",
      required: true,
    },
  },
  { timestamps: true }
);

//--------------------
// Indexes
//--------------------
// Create an index on the fields in ascending order
vendorReviewSchema.index({ vendor: 1, propertyManager: 1 });

//--------------------
// Model Definition
//--------------------
const VendorReview = mongoose.model("VendorReview", vendorReviewSchema);

export default VendorReview;
