//====================
// Model: Vendor Rating
//====================
// Import Dependencies
import mongoose from "mongoose";

//--------------------
// Schema Definition
//--------------------
const vendorRatingSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      unique: true,
      default: 0,
      min: 0,
      max: 5,
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
// Create an index on the fields in ascending order & make it unique so that only one rating can
// be created per vendor and property manager
// TODO: The use of compound index will be commented for now. We want to show this functionality
// for the demo day. In a real-world scenario, we would use the unique index to prevent the same property manager
// from rating the same vendor multiple times.
// vendorRatingSchema.index({ vendor: 1, propertyManager: 1 }, { unique: true });

//--------------------
// Model Definition
//--------------------
const VendorRating = mongoose.model("VendorRating", vendorRatingSchema);

export default VendorRating;
