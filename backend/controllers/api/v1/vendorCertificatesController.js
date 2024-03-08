//====================
// Controller: Vendor Certificates
//====================
// Import Dependencies
import asyncHandler from "express-async-handler";
import VendorCertificate from "../../../models/vendorCertificateModel.js";
// Image Uploader
import cloudinary from "../../../services/cloudinary.config.js"; // Used when using cloudinary node package instead of multer

//--------------------
// GET
//--------------------
// Action: Index
// Description: List of Vendor Certificates
// Route: GET /api/v1/vendor-certificates/:vendorStore
// Access: Public
const getAllVendorCertificates = asyncHandler(async (req, res) => {
  // Destructure req.params
  const { vendorStore } = req.params;

  try {
    // Fetch Vendor Services with passed param vendorStore
    const vendorCertificates = await VendorCertificate.find({ vendorStore })
      .sort({
        name: 1,
      })
      .populate([
        {
          path: "certificateCategory",
        },
      ]);
    res.status(200).json(vendorCertificates);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Action: Show
// Description: Vendor Certificate Detail
// Route: GET /api/v1/vendor-certificates/:vendorStore/:certificateId
// Access: Private
const showVendorCertificate = asyncHandler(async (req, res) => {
  // Destructure req.params
  const { vendorStore, certificateId } = req.params;

  try {
    // Fetch Vendor Service
    const vendorCertificate = await VendorCertificate.findOne({
      _id: certificateId,
      vendorStore,
    }).populate([
      {
        path: "certificateCategory",
      },
      // TODO: Uncomment in case that I need the returned object to include data from the vendorStore
      /*
    {
      path: "vendorStore",
    },
    */
    ]);

    // Check if Vendor Service exists
    if (!vendorCertificate) {
      res.status(404);
      throw new Error("Vendor Certificate not found");
    }

    res.status(200).json(vendorCertificate);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//--------------------
// POST
//--------------------
// Action: Create
// Description: Create Vendor Certificate
// Route: GET /api/v1/vendor-certificates
// Access: Private
const createVendorCertificate = asyncHandler(async (req, res) => {
  // Destructure req.body
  const { name, certificateCategory, vendorStore } = req.body;

  try {
    // Initialization
    let certificateImageData = {};
    // Check if files are being passed in the request object
    if (req.file) {
      // If file is uploaded, access the file URL and publicId from Cloudinary
      certificateImageData.url = req.file.path; // The file path will be the Cloudinary URL
      certificateImageData.publicId = req.file.filename; // The public ID provided by Cloudinary
    }

    // Create the Vendor Certificate
    const vendorCertificate = await VendorCertificate.create({
      name,
      certificateImage: certificateImageData,
      certificateCategory,
      vendorStore,
    });

    console.log(vendorCertificate);

    // Check if Vendor Certificate was created
    if (vendorCertificate) {
      // Response
      res.status(201).json({
        _id: vendorCertificate._id,
        name: vendorCertificate.name,
        certificateImage: vendorCertificate.certificateImage,
        certificateCategory: vendorCertificate.certificateCategory,
        vendorStore: vendorCertificate.vendorStore,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Vendor Certificate data");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//--------------------
// PUT / PATCH
//--------------------
// Action: Update
// Description: Update Vendor Certificate
// Route: PUT /api/v1/vendor-certificates/:vendorStore/:certificateId
// Access: Private
const updateVendorCertificate = asyncHandler(async (req, res) => {
  // Destructure req.params
  const { vendorStore, certificateId } = req.params;

  // Fetch Vendor Service
  const vendorCertificate = await VendorCertificate.findOne({
    _id: certificateId,
    vendorStore,
  }).populate([
    {
      path: "certificateCategory",
    },
    {
      path: "vendorStore",
      select: "storeOwner", // To exclude a field from the query '-fieldName'
    },
  ]);

  // Check if Vendor Service exists
  if (!vendorCertificate) {
    res.status(400); // Bad Request
    throw new Error("Vendor Certificate doesn't exist");
  }

  try {
    // Destructure body request
    const { name, certificateCategory } = req.body;

    // Check if passed req.param vendorStore id === fetched vendorCertificate vendorStore id
    // AND fetched vendorCertificate storeOwner id === authenticated vendor id
    if (
      vendorStore === vendorCertificate.vendorStore._id.toString() &&
      vendorCertificate.vendorStore.storeOwner.toString() ==
        req.vendor._id.toString()
    ) {
      // Initialization
      let certificateImageData = {};

      // Check if a new file is uploaded
      if (req.file) {
        // If a new file is uploaded, delete the old image from Cloudinary
        if (vendorCertificate.certificateImage.publicId) {
          await cloudinary.uploader.destroy(
            vendorCertificate.certificateImage.publicId
          );
        }
        // If file is uploaded (multer), access the file URL and publicId from Cloudinary
        certificateImageData.url = req.file.path; // The file path will be the Cloudinary URL
        certificateImageData.publicId = req.file.filename; // The public ID provided by Cloudinary
      }

      // Update the Vendor Certificate
      if (name) vendorCertificate.name = name;
      if (certificateCategory)
        vendorCertificate.certificateCategory = certificateCategory;
      if (req.file) {
        vendorCertificate.certificateImage.url = certificateImageData.url;
        vendorCertificate.certificateImage.publicId =
          certificateImageData.publicId;
      }

      // Save new data
      const updatedVendorCertificate = await vendorCertificate.save();

      res.status(200).json(updatedVendorCertificate);
    } else {
      res.status(401);
      throw new Error("Not authorized. Not the Store owner.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//--------------------
// DELETE
//--------------------
// Description: Delete Vendor Certificate
// Route: DELETE /api/v1/vendor-certificates/:vendorStore/:certificateId
// Access: Private
const deleteVendorCertificate = asyncHandler(async (req, res) => {
  // Destructure req.params
  const { vendorStore, certificateId } = req.params;

  try {
    // Fetch Vendor Certificate
    const vendorCertificate = await VendorCertificate.findOne({
      _id: certificateId,
      vendorStore,
    }).populate([
      {
        path: "vendorStore",
        select: "storeOwner", // To exclude a field from the query '-fieldName'
      },
    ]);

    // Check if Vendor Certificate exists
    if (!vendorCertificate) {
      res.status(400); // Bad Request
      throw new Error("Vendor Service doesn't exist");
    }

    // Check if passed req.param vendorStore id === fetched vendorCertificate vendorStore id
    // AND fetched vendorCertificate storeOwner id === authenticated vendor id
    if (
      vendorStore === vendorCertificate.vendorStore._id.toString() &&
      vendorCertificate.vendorStore.storeOwner.toString() ==
        req.vendor._id.toString()
    ) {
      // Perform delete operation
      await VendorCertificate.deleteOne({ _id: certificateId });

      res.status(200).json({ message: "Vendor Certificate deleted successfully" });
    } else {
      res.status(401);
      throw new Error("Not authorized. Not the Store owner.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export {
  getAllVendorCertificates,
  showVendorCertificate,
  createVendorCertificate,
  updateVendorCertificate,
  deleteVendorCertificate,
};
