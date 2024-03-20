//====================
// Model: Vendor
//====================
// Import Dependencies
import mongoose from "mongoose";
// TODO: Used for future reference. Used to reference object Ids from other collections
// const { Schema } = mongoose; // Destructure Schema from mongoose
import bcrypt from "bcryptjs";
// Models
import VendorStore from "./vendorStoreModel.js";

// TODO: Think about many to many relationships for example: to know which resources have been created by which Vendor

//--------------------
// Schema Definition
//--------------------
const vendorSchema = mongoose.Schema(
  {
    accountType: {
      type: String,
      default: "vendor",
    },
    companyName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    storeSlug: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      street: {
        type: String,
        // default: "",
      },
      city: {
        type: String,
        // default: "",
      },
      province: {
        type: String,
        // default: "",
      },
      postalCode: {
        type: String,
        // default: "",
      },
    },
    avatar: {
      publicId: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },

    // TODO: Add more fields
  },
  {
    timestamps: true, // Used to have createdAt & updatedAt fields
  }
);

//--------------------
// Indexes
//--------------------
// Create an index on the 'city' field in ascending order
vendorSchema.index({ _id: 1, email: 1 });

//--------------------
// Hooks
//--------------------
// Hash password before saving (middleware)
vendorSchema.pre("save", async function (next) {
  // If password is not modified, function moves on
  if (!this.isModified("password")) {
    next();
  }

  console.log("Log before checking if the document is new", this.isNew);

  // Only create a new VendorStore if the document is new (created for the first time)
  if (!this.isNew) {
    next();
    return; // Exit early as we don't need to create a new VendorStore for updates
  }

  console.log("Log after checking if the document is new", this.isNew);

  // If password is modified or is new (Vendor created)
  const salt = await bcrypt.genSalt(10); // 10 is the number of rounds
  this.password = await bcrypt.hash(this.password, salt); // Hash the password before its saved into the DB

  // Generate & format storeSlug based on the companyName
  let companyName = this.companyName.toLowerCase();
  let formattedStoreSlug = companyName.replace(/\s+/g, "-");

  try {
    // Create a new VendorStore when the new Vendor is created
    const newVendorStore = new VendorStore({
      storeSlug: formattedStoreSlug,
      storeOwner: this._id, // Reference the Vendor's ObjectId as storeOwner
    });

    // Save the new VendorStore record
    await newVendorStore.save();

    // Update the storeSlug value
    this.storeSlug = formattedStoreSlug;

    next();
  } catch (error) {
    console.log("VendorStore Creation Error", error);
    next(error); // Pass any errors to the next middleware
  }
});

// Compare passwords (plain text password vs hashed password)
vendorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Will delete children collections (similar to dependent destroy in Rails)
vendorSchema.pre("remove", async function (next) {
  try {
    // Find and remove all child documents associated with this parent
    await VendorStore.deleteMany({ parentId: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

//--------------------
// Model Definition
//--------------------
const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
