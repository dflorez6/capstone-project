//====================
// Controller: Provinces
//====================
// Import Dependencies
import asyncHandler from "express-async-handler";
import Province from "../../../models/provinceModel.js";

//--------------------
// GET
//--------------------
// Action: Index
// Description: List of Provinces
// Route: GET /api/v1/provinces
// Access: Public
const getAllProvinces = asyncHandler(async (req, res) => {
  try {
    // Use the find() method without any conditions to retrieve all records
    const provinces = await Province.find().sort({ province: 1 });
    res.status(200).json(provinces);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Action: Show
// Description: Province Detail
// Route: PUT /api/v1/provinces/:id
// Access: Private
const showProvince = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Province - Show" });
});

//--------------------
// POST
//--------------------
// Action: Create
// Description: Create Province
// Route: GET /api/v1/provinces
// Access: Private
const createProvince = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Province - Create" });
});

//--------------------
// PUT / PATCH
//--------------------
// Action: Update
// Description: Update Province
// Route: PUT /api/v1/provinces/:id
// Access: Private
const updateProvince = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Province - Update" });
});

//--------------------
// DELETE
//--------------------
// Description: Delete Province
// Route: PUT /api/v1/provinces/:id
// Access: Private
const deleteProvince = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Province - Delete" });
});

export {
  getAllProvinces,
  showProvince,
  createProvince,
  updateProvince,
  deleteProvince,
};
