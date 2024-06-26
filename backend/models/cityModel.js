//====================
// Model: City
//====================
// Import Dependencies
import mongoose from "mongoose";

//--------------------
// Schema Definition
//--------------------
const citySchema = mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
      trim: true,    
    },
  },
  {
    timestamps: true, // Used to have createdAt & updatedAt fields
  }
);

//--------------------
// Indexes
//--------------------
// Create an index on the 'city' field in ascending order
citySchema.index({ city: 1 });

//--------------------
// Model Definition
//--------------------
const City = mongoose.model("City", citySchema);

export default City;
