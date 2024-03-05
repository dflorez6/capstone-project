//====================
// Controller: Certificate Categories
//====================
// Import Dependencies
import asyncHandler from "express-async-handler";
import CertificateCategory from "../../../models/certificateCategoryModel.js";

//--------------------
// GET
//--------------------
// Action: Index
// Description: List of Certificate Categories
// Route: GET /api/v1/certificate-categories
// Access: Public
const getAllCertificateCategories = asyncHandler(async (req, res) => {
  try {
    // Use the find() method without any conditions to retrieve all records
    const certificateCategories = await CertificateCategory.find().sort({
      name: 1,
    }); // TODO: DB - To get order by DESC use -1
    res.status(200).json(certificateCategories);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Action: Show
// Description: Certificate Category Detail
// Route: PUT /api/v1/certificate-categories/:id
// Access: Private
const showCertificateCategory = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Certificate Categories - Show" });
});

//--------------------
// POST
//--------------------
// Action: Create
// Description: Create Certificate Category
// Route: GET /api/v1/certificate-categories
// Access: Private
const createCertificateCategory = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Certificate Categories - Create" });
});

//--------------------
// PUT / PATCH
//--------------------
// Action: Update
// Description: Update Certificate Category
// Route: PUT /api/v1/certificate-categories/:id
// Access: Private
const updateCertificateCategory = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Certificate Categories - Update" });
});

//--------------------
// DELETE
//--------------------
// Description: Delete Certificate Category
// Route: PUT /api/v1/certificate-categories/:id
// Access: Private
const deleteCertificateCategory = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Certificate Categories - Delete" });
});

export {
  getAllCertificateCategories,
  showCertificateCategory,
  createCertificateCategory,
  updateCertificateCategory,
  deleteCertificateCategory,
};
