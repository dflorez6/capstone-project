//====================
// Model: Project Application
//====================
// Import Dependencies
import mongoose from "mongoose";

//--------------------
// Schema Definition
//--------------------
const projectApplicationSchema = mongoose.Schema(
  {
    applicationDate: {
      type: Date,
      required: true,
    },
    applicationStatus: {
      type: String,
      required: true,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    notificationSeen: {
      type: Boolean,
      required: true,
      default: false,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Vendor",
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
// Create an index on the 'project' & 'vendor' fields in ascending order
projectApplicationSchema.index({ project: 1, vendor: 1 });

//--------------------
// Model Definition
//--------------------
const ProjectApplication = mongoose.model(
  "ProjectApplication",
  projectApplicationSchema
);

export default ProjectApplication;