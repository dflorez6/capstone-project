//====================
// Controller: Vendors
//====================
// Import Dependencies
import asyncHandler from "express-async-handler";
import generateToken from "../../../utils/generateToken.js";
import Vendor from "../../../models/vendorModel.js";
// Image Uploader
import cloudinary from "../../../services/cloudinary.config.js"; // Used when using cloudinary node package instead of multer

//--------------------
// POST
//--------------------
// Description: Register a new Vendor user && authenticate the Vendor
// Route: POST /api/v1/vendors/register
// Access: Public
const registerVendor = asyncHandler(async (req, res) => {
  // Desctructure the request body
  const {
    companyName,
    firstName,
    lastName,
    email,
    password,
    avatar,
    phone,
    address,
  } = req.body;

  // Check if Vendor exists
  const vendorExists = await Vendor.findOne({ email }); // findOne() returns a promise

  if (vendorExists) {
    res.status(400); // Bad Request
    throw new Error("Vendor already exists");
  }

  try {
    // Check if file is uploaded
    let avatarData = {};
    if (req.file) {
      // If file is uploaded, access the file URL and publicId from Cloudinary
      avatarData.url = req.file.path; // The file path will be the Cloudinary URL
      avatarData.publicId = req.file.filename; // The public ID provided by Cloudinary
    }

    // Create the Vendor
    const vendor = await Vendor.create({
      companyName,
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      avatar: avatarData, // Assign avatar data to the vendor
    });

    // Check if Vendor was created
    if (vendor) {
      // Token
      generateToken(res, vendor._id);

      // Response
      res.status(201).json({
        _id: vendor._id,
        accountType: vendor.accountType,
        companyName: vendor.companyName,
        firstName: vendor.firstName,
        lastName: vendor.lastName,
        email: vendor.email,
        avatar: vendor.avatar,
        phone: vendor.phone,
        address: vendor.address,
        storeSlug: vendor.storeSlug,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Vendor data");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Description: Authenticates a Vendor user/sets token
// Route: POST /api/v1/vendors/auth
// Access: Public
const authVendor = asyncHandler(async (req, res) => {
  // Desctructure the request body
  const { email, password } = req.body;
  const vendor = await Vendor.findOne({ email }); // Checks DB for user with email

  // Check if Vendor exists && password matches
  if (vendor && (await vendor.matchPassword(password))) {
    // Token
    generateToken(res, vendor._id);

    // Response
    res.status(201).json({
      _id: vendor._id,
      accountType: vendor.accountType,
      companyName: vendor.companyName,
      firstName: vendor.firstName,
      lastName: vendor.lastName,
      email: vendor.email,
      avatar: vendor.avatar,
      phone: vendor.phone,
      address: vendor.address,
      storeSlug: vendor.storeSlug,
    });
  } else {
    res.status(401); // Bad Request
    throw new Error("Invalid email or password");
  }
});

// Description: Logout Vendor user
// Route: POST /api/v1/vendors/logout
// Access: Public
const logoutVendor = asyncHandler(async (req, res) => {
  // Destroy the cookie/session
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "Vendor logged out",
  });
});

//--------------------
// GET
//--------------------
// Description: Get Vendor profile
// Route: GET /api/v1/vendors/profile
// Access: Private
const getVendorProfile = asyncHandler(async (req, res) => {
  // Get the vendor from the request object
  const vendor = {
    _id: req.vendor._id,
    accountType: req.vendor.accountType,
    companyName: req.vendor.companyName,
    firstName: req.vendor.firstName,
    lastName: req.vendor.lastName,
    email: req.vendor.email,
    avatar: req.vendor.avatar,
    phone: req.vendor.phone,
    address: req.vendor.address,
    storeSlug: req.storeSlug,
  };

  res.status(200).json(vendor);
});

//--------------------
// PUT / PATCH
//--------------------
// Description: Update Vendor profile
// Route: PUT /api/v1/vendors/profile
// Access: Private
const updateVendorProfile = asyncHandler(async (req, res) => {
  // Because the password is excluded from req.vendor, get vendor from the DB
  const vendor = await Vendor.findById(req.vendor._id);

  // Check if Vendor exists
  if (!vendor) {
    res.status(404);
    throw new Error("Vendor not found");
  }

  console.log("Profile Update req.body outside Try: ", req.body);

  try {
    // Initialization
    let avatarData = {};

    // Check if a new file is uploaded
    if (req.file) {
      // If a new file is uploaded, delete the old image from Cloudinary
      if (vendor.avatar.publicId) {
        await cloudinary.uploader.destroy(vendor.avatar.publicId);
      }

      // If file is uploaded (multer), access the file URL and publicId from Cloudinary
      avatarData.url = req.file.path; // The file path will be the Cloudinary URL
      avatarData.publicId = req.file.filename; // The public ID provided by Cloudinary
    }

    console.log("Profile Update req.body inside Try: ", req.body);

    // Update the Vendor
    vendor.firstName = req.body.firstName || vendor.firstName;
    vendor.lastName = req.body.lastName || vendor.lastName;
    vendor.email = req.body.email || vendor.email;
    // vendor.avatar.url = avatarUrl;
    vendor.avatar.url = req.file ? avatarData.url : vendor.avatar.url; // Update the url only if a new file is uploaded
    vendor.avatar.publicId = req.file
      ? avatarData.publicId
      : vendor.avatar.publicId; // Update the publicId only if a new file is uploaded
    vendor.phone = req.body.phone || vendor.phone;
    vendor.address.street = req.body.address.street || vendor.address.street;
    vendor.address.city = req.body.address.city || vendor.address.city;
    vendor.address.province =
      req.body.address.province || vendor.address.province;
    vendor.address.postalCode =
      req.body.address.postalCode || vendor.address.postalCode;

    // Check if password was sent
    if (req.body.password) {
      vendor.password = req.body.password;
    }

    // Save Vendor new data
    const updatedVendor = await vendor.save();

    res.status(200).json({
      _id: updatedVendor._id,
      companyName: updatedVendor.companyName,
      firstName: updatedVendor.firstName,
      lastName: updatedVendor.lastName,
      email: updatedVendor.email,
      avatar: updatedVendor.avatar,
      phone: updatedVendor.phone,
      address: updatedVendor.address,
      storeSlug: updatedVendor.storeSlug,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//--------------------
// DELETE
//--------------------
// Description: Delete vendor profile
// Route: PUT /api/v1/vendors/delete
// Access: Private

export {
  authVendor,
  registerVendor,
  logoutVendor,
  getVendorProfile,
  updateVendorProfile,
};

/*
// TODO: Left for reference. Upload directly to Cloudinary using the node package and not multer
// Upload the new avatar to Cloudinary
result = await cloudinary.uploader.upload(req.file.path, {
  folder: "vendorLynx",
});
avatarUrl = result.secure_url;
*/
