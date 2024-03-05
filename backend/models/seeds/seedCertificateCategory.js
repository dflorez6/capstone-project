//====================
// Seed Model: Certificate Category
//====================
// ENV
import dotenv from "dotenv";
dotenv.config({ path: "../../../.env" }); // Make sure to target the correct path
// Dependencies
import mongoose from "mongoose";
import connectDB from "../../config/db.js"; // Connect to DB
import CertificateCategory from "../certificateCategoryModel.js";

// Establish DB Connection
connectDB();

//--------------------
// Seed Data
//--------------------
const certificateCategories = [
  {
    name: "Trade Qualification/Certification",
  },
  {
    name: "Business License",
  },
  {
    name: "Insurance Certificate",
  },
  {
    name: "Safety Certification",
  },
  {
    name: "Environmental Certification",
  },
  {
    name: "Building Code Compliance",
  },
  {
    name: "Quality Management Certification",
  },
  {
    name: "Specialized Certification",
  },
];

//--------------------
// Seed DB
//--------------------
const seedDB = async () => {
  try {
    await CertificateCategory.deleteMany({}); // Clears the Collection
    await CertificateCategory.insertMany(certificateCategories); // Adds seed data to DB

    mongoose.connection.close(); // Closes MongoDB connection
    console.log("Database seeding completed. Connection closed.");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

// Call the seedDB function within an async function
(async () => {
  await seedDB();
})();
