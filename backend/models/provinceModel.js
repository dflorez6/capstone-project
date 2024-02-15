//====================
// Model: Province
//====================
// Import Dependencies
import mongoose from "mongoose";

//--------------------
// Schema Definition
//--------------------
const provinceSchema = mongoose.Schema(
  {
    province: {
      type: String,
      required: true,
      trim: true,
    },
    provinceCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
  },
  {
    timestamps: true, // Used to have createdAt & updatedAt fields
  }
);

//--------------------
// Methods
//--------------------

//--------------------
// Hooks
//--------------------

//--------------------
// Model Definition
//--------------------
const Province = mongoose.model("Province", provinceSchema);

export default Province;
