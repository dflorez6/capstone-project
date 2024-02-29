//====================
// Controller: Vendor Stores
//====================
// Import Dependencies
import asyncHandler from "express-async-handler";
import VendorStore from "../../../models/vendorStoreModel.js";

//--------------------
// GET
//--------------------
// Action: Index
// Description: List of Vendor Stores
// Route: GET /api/v1/vendor-stores
// Access: Public
const getAllVendorStores = asyncHandler(async (req, res) => {
  try {
    // Use the find() method without any conditions to retrieve all records
    const vendorStores = await VendorStore.find().sort({ name: 1 }); // TODO: DB - To get order by DESC use -1
    res.status(200).json(vendorStores);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Action: Show
// Description: Vendor Store Detail
// Route: PUT /api/v1/vendor-stores/:storeSlug
// Access: Private
const showVendorStore = asyncHandler(async (req, res) => {
  try {
    const { storeSlug } = req.params; // Passed

    // Fetch VendorStore
    const vendorStore = await VendorStore.findOne({ storeSlug }).populate({
      path: "storeOwner", // Populate the 'storeOwner' field
      select: "-password", // Exclude 'password' from the query
    });

    res.status(200).json(vendorStore);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//--------------------
// POST
//--------------------
// Action: Create
// Description: Create Vendor Store
// Route: GET /api/v1/vendor-stores
// Access: Private
const createVendorStore = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Vendor Store - Create" });
  // TODO: For now VendorStore creation takes place when a new Vendor is created
});

//--------------------
// PUT / PATCH
//--------------------
// Action: Update
// Description: Update Vendor Store
// Route: PUT /api/v1/vendor-stores/:storeSlug
// Access: Private
const updateVendorStore = asyncHandler(async (req, res) => {
  try {
    const { storeOwner } = req.query; // Passed

    // TODO: POSSIBLE REFACTOR - To update pass the storeOwnerId (VendorId) and if they match it means that the Vendor
    // that created the store will be the only one allowed to update the Store. Do the same for the DELETE ACTION

    // Fetch VendorStore
    const vendorStore = await VendorStore.findOne({ storeOwner }).populate({
      path: "storeOwner", // Populate the 'storeOwner' field
      select: "-password", // Exclude 'password' from the query
    });

    res.status(200).json(vendorStore);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//--------------------
// DELETE
//--------------------
// Description: Delete Vendor Store
// Route: PUT /api/v1/vendor-stores/:storeSlug
// Access: Private
const deleteVendorStore = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Vendor Store - Delete" });
});

export {
  getAllVendorStores,
  showVendorStore,
  createVendorStore,
  updateVendorStore,
  deleteVendorStore,
};
