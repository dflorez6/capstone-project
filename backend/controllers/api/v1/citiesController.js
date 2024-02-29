//====================
// Controller: Cities
//====================
// Import Dependencies
import asyncHandler from "express-async-handler";
import City from "../../../models/cityModel.js";

//--------------------
// GET
//--------------------
// Action: Index
// Description: List of Cities
// Route: GET /api/v1/cities
// Access: Public
const getAllCities = asyncHandler(async (req, res) => {
  try {
    // Use the find() method without any conditions to retrieve all records
    const cities = await City.find().sort({ city: 1 }); // TODO: DB - To get order by DESC use -1
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Action: Show
// Description: City Detail
// Route: PUT /api/v1/cities/:id
// Access: Private
const showCity = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "City - Show" });
});

//--------------------
// POST
//--------------------
// Action: Create
// Description: Create City
// Route: GET /api/v1/cities
// Access: Private
const createCity = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "City - Create" });
});

//--------------------
// PUT / PATCH
//--------------------
// Action: Update
// Description: Update City
// Route: PUT /api/v1/cities/:id
// Access: Private
const updateCity = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "City - Update" });
});

//--------------------
// DELETE
//--------------------
// Description: Delete City
// Route: PUT /api/v1/cities/:id
// Access: Private
const deleteCity = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "City - Delete" });
});

export { getAllCities, showCity, createCity, updateCity, deleteCity };
