//====================
// Controller: Vendor Stores
//====================
// Import Dependencies
import asyncHandler from "express-async-handler";
import VendorStore from "../../../models/vendorStoreModel.js";
// Image Uploader
import cloudinary from "../../../services/cloudinary.config.js"; // Used when using cloudinary node package instead of multer

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
  // Destructured /:storeSlug
  const { storeSlug } = req.params;

  // Find vendorStore
  /*
  const vendorStore = await VendorStore.findOne({ storeSlug });
  */
  const vendorStore = await VendorStore.findOne({ storeSlug }).populate({
    path: "storeOwner", // Populate the 'storeOwner' field
    select: "-password", // Exclude 'password' from the query
  });

  // Check if Vendor exists
  if (!vendorStore) {
    res.status(404);
    throw new Error("Vendor Store not found");
  }

  try {
    // Destructure body request
    const { title, description, storeOwner, storeImages } = req.body;

    // Check if authenticatedUser(req.vendor) is the storeOwner
    if (storeOwner === req.vendor._id.toString()) {
      // Initialize variables for coverImage and storeImages data
      let coverImageData = {};
      let storeImagesData = [];

      // Update coverImage if provided
      if (req.files && req.files.coverImage) {
        // Get the first file object for coverImage
        const coverImage = req.files.coverImage[0];

        // If a new file is uploaded, delete the old image from Cloudinary
        if (vendorStore.coverImage.publicId) {
          await cloudinary.uploader.destroy(vendorStore.coverImage.publicId);
        }

        coverImageData.url = coverImage.path; // The file path will be the Cloudinary URL
        coverImageData.publicId = coverImage.filename; // The public ID provided by Cloudinary
      }

      // Update storeImages if provided
      if (req.files && req.files.storeImages) {
        // Iterate over uploaded files & upload them to Cloudinary
        for (const file of req.files.storeImages) {
          storeImagesData.push({
            url: file.path,
            publicId: file.filename,
          });
        }

        // Append newly uploaded images to the existing array
        vendorStore.storeImages = [
          ...vendorStore.storeImages,
          ...storeImagesData,
        ];
      }

      // Update the Vendor Store
      vendorStore.title = title;
      vendorStore.description = description;
      vendorStore.coverImage.url = req.files.coverImage
        ? coverImageData.url
        : vendorStore.coverImage.url; // Update the url only if a new file is uploaded
      vendorStore.coverImage.publicId = req.files.coverImage
        ? coverImageData.publicId
        : vendorStore.coverImage.publicId; // Update the publicId only if a new file is uploaded

      // Save Vendor Store new data
      const updatedVendorStore = await vendorStore.save();

      res.status(200).json(updatedVendorStore);
    } else {
      res.status(401);
      throw new Error("Not authorized. Not the Store owner.");
    }
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
