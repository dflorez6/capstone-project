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
import bodyParser from "body-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"; // Custom Middleware
import connectDB from "./config/db.js"; // Connect to DB

// Initialize App
connectDB();
const app = express();

//====================
// Built-In Middleware
//====================
app.use(express.json()); // Using JSON data throughout the application
app.use(express.urlencoded({ extended: true })); // Decode post information from the URL
app.use(cookieParser()); // Parse cookies
app.use(bodyParser.json()); // Use body-parser middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser to parse URL-encoded bodies

//====================
// Routes
//====================
const baseURL = "/api/v1";
// Users
import vendorRoutes from "./routes/api/v1/vendorRoutes.js";
import propertyManagerRoutes from "./routes/api/v1/propertyManagerRoutes.js";
app.use(`${baseURL}/vendors`, vendorRoutes);
app.use(`${baseURL}/property-managers`, propertyManagerRoutes);
// Auxiliary
import cityRoutes from "./routes/api/v1/cityRoutes.js";
import provinceRoutes from "./routes/api/v1/provinceRoutes.js";
import serviceCategoryRoutes from "./routes/api/v1/serviceCategoryRoutes.js";
import certificateCategoryRoutes from "./routes/api/v1/certificateCategoryRoutes.js";
app.use(`${baseURL}/cities`, cityRoutes);
app.use(`${baseURL}/provinces`, provinceRoutes);
app.use(`${baseURL}/service-categories`, serviceCategoryRoutes);
app.use(`${baseURL}/certificate-categories`, certificateCategoryRoutes);
// Store
import vendorStoreRoutes from "./routes/api/v1/vendorStoreRoutes.js";
import vendorServiceRoutes from "./routes/api/v1/vendorServiceRoutes.js";
import vendorCertificateRoutes from "./routes/api/v1/vendorCertificateRoutes.js";
app.use(`${baseURL}/vendor-stores`, vendorStoreRoutes);
app.use(`${baseURL}/vendor-services`, vendorServiceRoutes);
app.use(`${baseURL}/vendor-certificates`, vendorCertificateRoutes);
// Projects
import projectRoutes from "./routes/api/v1/projectRoutes.js";
import projectApplicationRoutes from "./routes/api/v1/projectApplicationRoutes.js";
app.use(`${baseURL}/projects`, projectRoutes);
app.use(`${baseURL}/project-applications`, projectApplicationRoutes);
// Notifications
import notificationRoutes from "./routes/api/v1/notificationRoutes.js";
app.use(`${baseURL}/notifications`, notificationRoutes);

//====================
// Production
//====================
// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  console.log("Production");

  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist"))); // Set static folder

  // Serve index.html if a route that is not '/api/v1' is hit
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  console.log("Development");
  app.get("/", (req, res) => res.send("Server is ready"));
}

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
