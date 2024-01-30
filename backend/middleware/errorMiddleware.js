//====================
// Middleware: Custom Error Handling
//====================
// General error handler for a resource/route not found
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404); // Set status to 404 (Not Found)
  next(error); // Pass error to the next middleware
};

// Custom error handler
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode; // If status code is 200, set it to 500 (Internal Server Error)
  let message = err.message; // Get the error message

  // Mongoose Specific Error
  // Trying to get a user with an invalid ID error
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404; // Bad Request
    message = "Resource not found";
  }

  // Stack trace will be shown in development/test environments
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
