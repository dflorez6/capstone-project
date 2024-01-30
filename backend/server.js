/* server.js
    CAPSTONE PROJECT

    Revision History
    David Florez, 2024.01.20: Created
*/
//====================
// ENV
//====================
import dotenv from "dotenv";
dotenv.config();

//====================
// Import the dependencies
//====================
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"; // Custom Middleware
import connectDB from "./config/db.js";

// Initialize App
connectDB();
const app = express();

//====================
// Built-In Middleware
//====================
app.use(express.json()); // Using JSON data throughout the application
app.use(express.urlencoded({ extended: true })); // Decode post information from the URL
app.use(cookieParser()); // Parse cookies

//====================
// Routes
//====================
const baseURL = "/api/v1";
import vendorRoutes from "./routes/api/v1/vendorRoutes.js";
// import tagRoutes from "./routes/api/v1/tagRoutes.js";
//
app.use(`${baseURL}/vendors`, vendorRoutes);
// app.use(`${baseURL}/tags`, tagRoutes);

app.get('/', (req, res) => {
    res.send("Hello Server!");
})

//====================
// Production
//====================
// TODO: Uncomment when ready for the first production test
// Serve static assets if in production
/*
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist"))); // Set static folder

  // Serve index.html if a route that is not '/api/v1' is hit
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Server is ready"));
}
*/

//====================
// Custom Middleware
//====================
app.use(notFound);
app.use(errorHandler);

//====================
// Run Server
//====================
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});