//====================
// Utilities: Generate JSON Web Token for different user types
//====================
// Import Dependencies
import jwt from "jsonwebtoken";

// Generate JSON Web Token
const generateToken = (res, userId) => {
  // Generate the token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set the cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;
