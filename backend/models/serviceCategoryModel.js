//====================
// Model: Service Category
//====================
// Import Dependencies
import mongoose from "mongoose";

//--------------------
// Schema Definition
//--------------------
const serviceCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    categoryImage: {
      publicId: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
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
// Create an index on the 'city' field in ascending order
serviceCategorySchema.index({ _id: 1, name: 1 });

//--------------------
// Model Definition
//--------------------
const ServiceCategory = mongoose.model(
  "ServiceCategory",
  serviceCategorySchema
);

export default ServiceCategory;
