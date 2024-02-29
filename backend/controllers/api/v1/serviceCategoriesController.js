//====================
// Controller: Service Categories
//====================
// Import Dependencies
import asyncHandler from "express-async-handler";
import ServiceCategory from "../../../models/serviceCategoryModel.js";

//--------------------
// GET
//--------------------
// Action: Index
// Description: List of Service Categories
// Route: GET /api/v1/service-categories
// Access: Public
const getAllServiceCategories = asyncHandler(async (req, res) => {
  try {
    // Use the find() method without any conditions to retrieve all records
    const serviceCategories = await ServiceCategory.find().sort({ name: 1 }); // TODO: DB - To get order by DESC use -1
    res.status(200).json(serviceCategories);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Action: Show
// Description: Service Category Detail
// Route: PUT /api/v1/service-categories/:id
// Access: Private
const showServiceCategory = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Service Categories - Show" });
});

//--------------------
// POST
//--------------------
// Action: Create
// Description: Create Service Category
// Route: GET /api/v1/service-categories
// Access: Private
const createServiceCategory = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Service Categories - Create" });
});

//--------------------
// PUT / PATCH
//--------------------
// Action: Update
// Description: Update Service Category
// Route: PUT /api/v1/service-categories/:id
// Access: Private
const updateServiceCategory = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Service Categories - Update" });
});

//--------------------
// DELETE
//--------------------
// Description: Delete Service Category
// Route: PUT /api/v1/service-categories/:id
// Access: Private
const deleteServiceCategory = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Service Categories - Delete" });
});

export {
  getAllServiceCategories,
  showServiceCategory,
  createServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
};
