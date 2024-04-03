//====================
// Model: Work Order Log
//====================
// Import Dependencies
import mongoose from "mongoose";

//--------------------
// Schema Definition
//--------------------
const workOrderLogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    logImages: [
      {
        publicId: {
          type: String,
          default: "",
        },
        url: {
          type: String,
          default: "",
        },
      },
    ],
    workOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkOrder",
      required: true,
    },
  },
  { timestamps: true }
);

//--------------------
// Indexes
//--------------------
// Create an index on the field in ascending order
workOrderLogSchema.index({ workOrder: 1 });

//--------------------
// Model Definition
//--------------------
const WorkOrderLog = mongoose.model("WorkOrderLog", workOrderLogSchema);

export default WorkOrderLog;
