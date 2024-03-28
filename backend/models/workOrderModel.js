//====================
// Model: Work Order
//====================
// Import Dependencies
import mongoose from "mongoose";

//--------------------
// Schema Definition
//--------------------
const workOrderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    startDateTime: {
      type: Date,
      required: true,
    },
    endDateTime: {
      type: Date,
      required: true,
    },
    workOrderStatus: {
      type: String,
      required: true,
      enum: ["pending", "accepted", "rejected", "inProgress", "closed"],
      default: "pending",
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },

    // Add more fields
  },
  { timestaps: true }
);

//--------------------
// Indexes
//--------------------
// Create an index on the field in ascending order
workOrderSchema.index({ vendor: 1, project: 1 });

//--------------------
// Model Definition
//--------------------
const WorkOrder = mongoose.model("WorkOrder", workOrderSchema);

export default WorkOrder;
