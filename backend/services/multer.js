//====================
// Multer (image uploader)
//====================
// Dependencies
import multer from "multer";
import cloudinary from "./cloudinary.config.js";
import { createCloudinaryStorage } from "multer-storage-cloudinary";

// Configure Multer Storage for Cloudinary
const storage = new createCloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "vendorLynx", // optional, saves uploaded files to a specified Cloudinary folder
    allowedFormats: ["jpg", "png", "jpeg", "svg"],
    // format: async (req, file) => "png, svg, jpg, jpeg", // supports setting the file format
    //public_id: (req, file) => "sample_image", // optional, sets the public ID of the uploaded file
    /*
    transformation: [
      {
        width: 500,
        height: 500,
        crop: "limit",
      },
    ],
    */
  },
});

const imgUploader = multer({ storage: storage });

export default imgUploader;

/*
// Single File Uploader
const singleImgUploader = multer({ storage: storage }).single('coverImage');;

// Multiple File Uploader
const multipleImgUploader = multer({ storage: storage }).array(
  "storeImages",
  10
); // 'storeImages' is the field name for multiple image uploads, 10 is the maximum number of files allowed

// Export
export { singleImgUploader, multipleImgUploader };
*/
