//====================
// Model: Project
//====================
// Import Dependencies
import mongoose from "mongoose";

//--------------------
// Schema Definition
//--------------------
const projectSchema = mongoose.Schema(
  {
    coverImage: {
      publicId: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    managerEmail: {
      type: String,
      trim: true,
      required: true,
    },
    managerPhone: {
      type: String,
      trim: true,
      required: true,
    },
    startDateTime: {
      type: Date,
      required: true,
    },
    endDateTime: {
      type: Date,
      required: true,
    },
    propertyManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PropertyManager",
      required: true,
    },
    serviceCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceCategory",
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
projectSchema.index({ _id: 1, propertyManager: 1, serviceCategory: 1 });

//--------------------
// Model Definition
//--------------------
const Project = mongoose.model("Project", projectSchema);

export default Project;