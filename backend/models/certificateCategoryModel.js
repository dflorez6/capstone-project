//====================
// Model: Certificate Category
//====================
// Import Dependencies
import mongoose from "mongoose";

//--------------------
// Schema Definition
//--------------------
const certificateCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

//--------------------
// Indexes
//--------------------
// Create an index on the 'name' field in ascending order
certificateCategorySchema.index({ name: 1 });

//--------------------
// Model Definition
//--------------------
const CertificateCategory = mongoose.model(
  "CertificateCategory",
  certificateCategorySchema
);

export default CertificateCategory;
