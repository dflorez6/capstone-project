//====================
// Model: Vendor
//====================
// Import Dependencies
import mongoose from "mongoose";
// TODO: Used for future reference. Used to reference object Ids from other collections
// const { Schema } = mongoose; // Destructure Schema from mongoose
import bcrypt from "bcryptjs";

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
    avatar: {
      type: String,
      default: "",
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

      // TODO: Used for future reference. Used to reference object Ids from other collections
      /*
        city: {
        type: Schema.Types.ObjectId,
        ref: "City",
        lowercase: true,
        default: "",
      },
      province: {
        type: Schema.Types.ObjectId,
        ref: "Province",
        default: "",
      },

      */
    },
    // TODO: Add more fields
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
// Hash password before saving (middleware)
vendorSchema.pre("save", async function (next) {
  // If password is not modified, function moves on
  if (!this.isModified("password")) {
    next();
  }

  // If password is modified or is new (admin created)
  const salt = await bcrypt.genSalt(10); // 10 is the number of rounds
  this.password = await bcrypt.hash(this.password, salt); // Hash the password before its saved into the DB
});

// Compare passwords (plain text password vs hashed password)
vendorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//--------------------
// Model Definition
//--------------------
const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
