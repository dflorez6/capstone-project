//====================
// Model: Vendor Certificate
//====================
// Import Dependencies
import mongoose from "mongoose";

//--------------------
// Schema Definition
//--------------------
const vendorCertificateSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    certificateImage: {
      publicId: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },
    certificateCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CertificateCategory",
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
// Create an index on the 'name' field in ascending order
vendorCertificateSchema.index({ name: 1 });

//--------------------
// Model Definition
//--------------------
const VendorCertificate = mongoose.model(
  "VendorCertificate",
  vendorCertificateSchema
);

export default VendorCertificate;
