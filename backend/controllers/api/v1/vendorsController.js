//====================
// Controller: Vendors
//====================
// Import Dependencies
import asyncHandler from "express-async-handler";
import generateToken from "../../../utils/generateToken.js";
import Vendor from "../../../models/vendorModel.js";

//--------------------
// POST
//--------------------
// Description: Register a new vendor user && authenticate the vendor
// Route: POST /api/v1/vendors/register
// Access: Public
const registerVendor = asyncHandler(async (req, res) => {
  // Desctructure the request body
  const { firstName, lastName, email, password, avatar, phone, address } =
    req.body;

  // Check if Vendor exists
  const vendorExists = await Vendor.findOne({ email }); // findOne() returns a promise

  if (vendorExists) {
    res.status(400); // Bad Request
    throw new Error("Vendor already exists");
  }

  // Create the Vendor
  const vendor = await Vendor.create({
    firstName,
    lastName,
    email,
    password,
    avatar,
    phone,
  });

  // Check if Vendor was created
  if (vendor) {
    // Token
    generateToken(res, vendor._id);

    // Response
    res.status(201).json({
      _id: vendor._id,
      accountType: vendor.accountType,
      firstName: vendor.firstName,
      lastName: vendor.lastName,
      email: vendor.email,
      avatar: vendor.avatar,
      phone: vendor.phone,
      address: vendor.address,
    });
  } else {
    res.status(400); // Bad Request
    throw new Error("Invalid Vendor data");
  }
});

// Description: Authenticates a vendor user/sets token
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
      firstName: vendor.firstName,
      lastName: vendor.lastName,
      email: vendor.email,
      avatar: vendor.avatar,
      phone: vendor.phone,
      address: vendor.address,
    });
  } else {
    res.status(401); // Bad Request
    throw new Error("Invalid email or password");
  }
});

// Description: Logout vendor user
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
// Description: Get vendor profile
// Route: GET /api/v1/vendors/profile
// Access: Private
const getVendorProfile = asyncHandler(async (req, res) => {
  // Get the vendor from the request object
  const vendor = {
    _id: req.vendor._id,
    accountType: req.vendor.accountType,
    firstName: req.vendor.firstName,
    lastName: req.vendor.lastName,
    email: req.vendor.email,
    avatar: req.vendor.avatar,
    phone: req.vendor.phone,
    address: req.vendor.address,
  };

  res.status(200).json(vendor);
});

//--------------------
// PUT / PATCH
//--------------------
// Description: Update vendor profile
// Route: PUT /api/v1/vendors/profile
// Access: Private
const updateVendorProfile = asyncHandler(async (req, res) => {
  // Because the password is excluded from req.vendor, get vendor from the DB
  const vendor = await Vendor.findById(req.vendor._id);

  // Check if Vendor exists
  if (vendor) {
    // Update the Vendor
    vendor.firstName = req.body.firstName || vendor.firstName;
    vendor.lastName = req.body.lastName || vendor.lastName;
    vendor.email = req.body.email || vendor.email;
    vendor.avatar = req.body.avatar || vendor.avatar;
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
      firstName: updatedVendor.firstName,
      lastName: updatedVendor.lastName,
      email: updatedVendor.email,
      avatar: updatedVendor.avatar,
      phone: updatedVendor.phone,
      address: updatedVendor.address,
    });
  } else {
    res.status(404);
    throw new Error("Vendor not found");
  }
});

// accountType: vendor.accountType,

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
