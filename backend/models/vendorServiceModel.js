//====================
// Model: Vendor Service
//====================
// Import Dependencies
import mongoose from "mongoose";

//--------------------
// Schema Definition
//--------------------
const vendorServiceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    yearsExperience: {
      type: Number,
      required: true,
    },
    costHour: {
      type: Number,
      required: true,
    },
    serviceCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceCategory",
      required: true,
    },
    vendorStore: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VendorStore",
      required: true,
    },

    // Add more fields
  },
  {
    timestamps: true,
  }
);

//--------------------
// Indexes
//--------------------
// Create an index on the field in ascending order
vendorServiceSchema.index({ _id: 1, serviceCategory: 1, vendorStore: 1});

//--------------------
// Model Definition
//--------------------
const VendorService = mongoose.model("VendorService", vendorServiceSchema);

export default VendorService;

// TODO: In case we need to add serviceImages
/*
  serviceImages: [
    {
      publicId: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
*/
