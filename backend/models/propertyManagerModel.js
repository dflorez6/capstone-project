//====================
// Model: Property Manager
//====================
// Import Dependencies
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// TODO: Think about many to many relationships for example: to know which resources have been created by which Vendor

//--------------------
// Schema Definition
//--------------------
const propertyManagerSchema = mongoose.Schema(
  {
    accountType: {
      type: String,
      default: "propertyManager",
    },
    companyName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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
      },
      city: {
        type: String,
      },
      province: {
        type: String,
      },
      postalCode: {
        type: String,
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
// Hooks
//--------------------
// Hash password before saving (middleware)
propertyManagerSchema.pre("save", async function (next) {
  // If password is not modified, function moves on
  if (!this.isModified("password")) {
    next();
  }

  // If password is modified or is new (Property Manager created)
  const salt = await bcrypt.genSalt(10); // 10 is the number of rounds
  this.password = await bcrypt.hash(this.password, salt); // Hash the password before its saved into the DB
});

// Compare passwords (plain text password vs hashed password)
propertyManagerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// TODO: MAKE SURE TO DELETE ALL RELATED PROJECTS WHEN A PROP MANAGER IS DELETED

//--------------------
// Model Definition
//--------------------
const PropertyManager = mongoose.model("PropertyManager", propertyManagerSchema);

export default PropertyManager;