//====================
// Controller: Property Managers
//====================
// Import Dependencies
import asyncHandler from "express-async-handler";
import generateToken from "../../../utils/generateToken.js";
import PropertyManager from "../../../models/propertyManagerModel.js";
// Image Uploader
import cloudinary from "../../../services/cloudinary.config.js"; // Used when using cloudinary node package instead of multer

//--------------------
// POST
//--------------------
// Description: Register a new Property Manager user && authenticate the Property Manager
// Route: POST /api/v1/property-managers/register
// Access: Public
const registerPropertyManager = asyncHandler(async (req, res) => {
  // Desctructure the request body
  const { firstName, lastName, email, password, avatar, phone, address } =
    req.body;

  // Check if Property Manager exists
  const propertyManagerExists = await PropertyManager.findOne({ email }); // findOne() returns a promise

  if (propertyManagerExists) {
    res.status(400); // Bad Request
    throw new Error("Property Manager already exists");
  }

  try {
    // Check if file is uploaded
    let avatarData = {};
    if (req.file) {
      // If file is uploaded, access the file URL and publicId from Cloudinary
      avatarData.url = req.file.path; // The file path will be the Cloudinary URL
      avatarData.publicId = req.file.filename; // The public ID provided by Cloudinary
    }

    // Create the Property Manager
    const propertyManager = await PropertyManager.create({
      firstName,
      lastName,
      email,
      password,
      avatar,
      phone,
      avatar: avatarData, // Assign avatar data to the vendor
    });

    // Check if Property Manager was created
    if (propertyManager) {
      // Token
      generateToken(res, propertyManager._id);

      // Response
      res.status(201).json({
        _id: propertyManager._id,
        accountType: propertyManager.accountType,
        firstName: propertyManager.firstName,
        lastName: propertyManager.lastName,
        email: propertyManager.email,
        avatar: propertyManager.avatar,
        phone: propertyManager.phone,
        address: propertyManager.address,
      });
    } else {
      res.status(400); // Bad Request
      throw new Error("Invalid Property Manager data");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Description: Authenticates a Property Manager user/sets token
// Route: POST /api/v1/property-managers/auth
// Access: Public
const authPropertyManager = asyncHandler(async (req, res) => {
  // Desctructure the request body
  const { email, password } = req.body;
  const propertyManager = await PropertyManager.findOne({ email }); // Checks DB for user with email

  // Check if Property Manager exists && password matches
  if (propertyManager && (await propertyManager.matchPassword(password))) {
    // Token
    generateToken(res, propertyManager._id);

    // Response
    res.status(201).json({
      _id: propertyManager._id,
      accountType: propertyManager.accountType,
      firstName: propertyManager.firstName,
      lastName: propertyManager.lastName,
      email: propertyManager.email,
      avatar: propertyManager.avatar,
      phone: propertyManager.phone,
      address: propertyManager.address,
    });
  } else {
    res.status(401); // Bad Request
    throw new Error("Invalid email or password");
  }
});

// Description: Logout Property Manager user
// Route: POST /api/v1/property-managers/logout
// Access: Public
const logoutPropertyManager = asyncHandler(async (req, res) => {
  // Destroy the cookie/session
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "Property Manager logged out",
  });
});

//--------------------
// GET
//--------------------
// Description: Get Property Manager profile
// Route: GET /api/v1/property-managers/profile
// Access: Private
const getPropertyManagerProfile = asyncHandler(async (req, res) => {
  // Get the Property Manager from the request object
  const propertyManager = {
    _id: req.propertyManager._id,
    accountType: req.propertyManager.accountType,
    firstName: req.propertyManager.firstName,
    lastName: req.propertyManager.lastName,
    email: req.propertyManager.email,
    avatar: req.propertyManager.avatar,
    phone: req.propertyManager.phone,
    address: req.propertyManager.address,
  };

  res.status(200).json(propertyManager);
});

//--------------------
// PUT / PATCH
//--------------------
// Description: Update Property Manager profile
// Route: PUT /api/v1/property-managers/profile
// Access: Private
const updatePropertyManagerProfile = asyncHandler(async (req, res) => {
  // Because the password is excluded from req.propertyManager, get Property Manager from the DB
  const propertyManager = await PropertyManager.findById(
    req.propertyManager._id
  );

  // Check if Property Manager exists
  if (!propertyManager) {
    res.status(404);
    throw new Error("Property Manager not found");
  }

  try {
    // Check if a new avatar is uploaded
    let avatarData = {};

    // Check if a new file is uploaded
    if (req.file) {
      // If a new file is uploaded, delete the old image from Cloudinary
      if (propertyManager.avatar.publicId) {
        await cloudinary.uploader.destroy(propertyManager.avatar.publicId);
      }

      // If file is uploaded (multer), access the file URL and publicId from Cloudinary
      avatarData.url = req.file.path; // The file path will be the Cloudinary URL
      avatarData.publicId = req.file.filename; // The public ID provided by Cloudinary
    }

    // Update the Property Manager
    propertyManager.firstName = req.body.firstName || propertyManager.firstName;
    propertyManager.lastName = req.body.lastName || propertyManager.lastName;
    propertyManager.email = req.body.email || propertyManager.email;
    propertyManager.avatar.url = req.file
      ? avatarData.url
      : propertyManager.avatar.url; // Update the url only if a new file is uploaded
    propertyManager.avatar.publicId = req.file
      ? avatarData.publicId
      : propertyManager.avatar.publicId; // Update the publicId only if a new file is uploaded
    propertyManager.phone = req.body.phone || propertyManager.phone;
    propertyManager.address.street =
      req.body.address.street || propertyManager.address.street;
    propertyManager.address.city =
      req.body.address.city || propertyManager.address.city;
    propertyManager.address.province =
      req.body.address.province || propertyManager.address.province;
    propertyManager.address.postalCode =
      req.body.address.postalCode || propertyManager.address.postalCode;

    // Check if password was sent
    if (req.body.password) {
      propertyManager.password = req.body.password;
    }

    // Save Property Manager new data
    const updatedPropertyManager = await propertyManager.save();

    res.status(200).json({
      _id: updatedPropertyManager._id,
      firstName: updatedPropertyManager.firstName,
      lastName: updatedPropertyManager.lastName,
      email: updatedPropertyManager.email,
      avatar: updatedPropertyManager.avatar,
      phone: updatedPropertyManager.phone,
      address: updatedPropertyManager.address,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//--------------------
// DELETE
//--------------------
// Description: Delete Property Manager profile
// Route: PUT /api/v1/property-managers/delete
// Access: Private

export {
  authPropertyManager,
  registerPropertyManager,
  logoutPropertyManager,
  getPropertyManagerProfile,
  updatePropertyManagerProfile,
};
