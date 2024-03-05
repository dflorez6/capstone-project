//====================
// Seed Model: Service Category
//====================
// ENV
import dotenv from "dotenv";
dotenv.config({ path: "../../../.env" }); // Make sure to target the correct path
// Dependencies
import mongoose from "mongoose";
import connectDB from "../../config/db.js"; // Connect to DB
import ServiceCategory from "../serviceCategoryModel.js";

// Establish DB Connection
connectDB();

//--------------------
// Seed Data
//--------------------
const seedServiceCategories = [
  {
    name: "Plumbing",
  },
  {
    name: "Electrical",
  },
  {
    name: "HVAC",
  },
  {
    name: "Landscaping/Gardening",
  },
  {
    name: "General Maintenance and Repair",
  },
  {
    name: "Cleaning",
  },
  {
    name: "Pest Control",
  },
  {
    name: "Roofing",
  },
  {
    name: "Appliance Repair",
  },
  {
    name: "Waste Management",
  },
  {
    name: "Flooring",
  },
  {
    name: "Window and Door",
  },
  {
    name: "Janitorial",
  },
  {
    name: "Snow Removal",
  },
  {
    name: "ISP",
  },
  {
    name: "TV/Cable",
  },
];

//--------------------
// Seed DB
//--------------------
const seedDB = async () => {
  try {
    await ServiceCategory.deleteMany({}); // Clears the Collection
    await ServiceCategory.insertMany(seedServiceCategories); // Adds seed data to DB

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
