//====================
// Service: Cloudinary
//====================
// ENV
import dotenv from "dotenv";
dotenv.config(); // Make sure to target the correct path
// Dependencies
import { v2 as cloudinary } from "cloudinary";

// Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
