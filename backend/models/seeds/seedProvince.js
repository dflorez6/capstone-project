//====================
// Seed Model: City
//====================
// ENV
import dotenv from "dotenv";
dotenv.config({ path: "../../../.env" }); // Make sure to target the correct path
// Dependencies
import mongoose from "mongoose";
import connectDB from "../../config/db.js"; // Connect to DB
import Province from "../provinceModel.js";

// Establish DB Connection
connectDB();

//--------------------
// Seed Data
//--------------------
const seedProvinces = [
  {
    province: "Alberta",
    provinceCode: "AB",
  },
  {
    province: "British Columbia",
    provinceCode: "BC",
  },
  {
    province: "Manitoba",
    provinceCode: "MB",
  },
  {
    province: "New Brunswick",
    provinceCode: "NB",
  },
  {
    province: "Newfoundland and Labrador",
    provinceCode: "NL",
  },
  {
    province: "Nova Scotia",
    provinceCode: "NS",
  },
  {
    province: "Ontario",
    provinceCode: "ON",
  },
  {
    province: "Prince Edward Island",
    provinceCode: "PE",
  },
  {
    province: "Quebec",
    provinceCode: "QC",
  },
  {
    province: "Saskatchewan",
    provinceCode: "SK",
  },
  {
    province: "Northwest Territories",
    provinceCode: "NT",
  },
  {
    province: "Nunavut",
    provinceCode: "NU",
  },
  {
    province: "Yukon",
    provinceCode: "YT",
  },
];

//--------------------
// Seed DB
//--------------------
const seedDB = async () => {
  try {
    await Province.deleteMany({}); // Clears the Collection
    await Province.insertMany(seedProvinces); // Adds seed data to DB

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
