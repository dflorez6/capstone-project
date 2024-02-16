//====================
// Middleware: Authentication - protect Property Manager routes
//====================
// Import dependencies
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Vendor from "../models/propertyManagerModel.js";
import PropertyManager from "../models/propertyManagerModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if token exists
  token = req.cookies.token; // From cookie parser

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // TODO: Think how to refactor this to allow for req.USER depending on the type of user (Vendor or Property Manager)

      // Add the Vendor to the request object minus the password (Sets req.propertyManager)
      req.propertyManager = await PropertyManager.findById(decoded.userId).select("-password"); // decoded.userId comes from utils/generateToke.js
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Export module
export { protect };
