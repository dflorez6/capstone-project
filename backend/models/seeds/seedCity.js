//====================
// Seed Model: City
//====================
// ENV
import dotenv from "dotenv";
dotenv.config({ path: "../../../.env" }); // Make sure to target the correct path
// Dependencies
import mongoose from "mongoose";
import connectDB from "../../config/db.js"; // Connect to DB
import City from "../cityModel.js";

// Establish DB Connection
connectDB();

//--------------------
// Seed Data
//--------------------
const seedCities = [
  {
    city: "Cambridge",
  },
  {
    city: "Kitchener",
  },
  {
    city: "Waterloo",
  },
];

//--------------------
// Seed DB
//--------------------
const seedDB = async () => {
  try {
    await City.deleteMany({}); // Clears the Collection
    await City.insertMany(seedCities); // Adds seed data to DB

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
