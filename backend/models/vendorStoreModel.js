//====================
// Model: Vendor Store
//====================
// Import Dependencies
import mongoose from "mongoose";

//--------------------
// Schema Definition
//--------------------
const vendorStoreSchema = mongoose.Schema(
  {
    storeSlug: {
      type: String,
      unique: true,
      trim: true,
    },
    storeRating: {
      type: Number,
      default: 0,
    },
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
    storeImages: [
      {
        publicId: {
          type: String,
          default: "",
        },
        url: {
          type: String,
          default: "",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
    },
    // Reference to the Vendor. Used for relationship and validations (only Vendor that created the Store can edit/delete it)
    storeOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
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
// Create an index on the 'storeSlug' & 'storeOwner' fields in ascending order
vendorStoreSchema.index({ storeSlug: 1, storeOwner: 1 });

//--------------------
// Model Definition
//--------------------
const VendorStore = mongoose.model("VendorStore", vendorStoreSchema);

export default VendorStore;
