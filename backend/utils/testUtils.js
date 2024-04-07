//====================
// Utilities: Testing utility file to create a singleton app server instance
//====================
// Dependencies
import app from "../server"; // Import the server app instance

// Global variable
let server;

export const startTestServer = async () => {
  const PORT = 0; // Use 0 to let the system assign an available port
  return new Promise((resolve, reject) => {
    server = app.listen(PORT, () => {
      console.log(`Test server running on port ${server.address().port}`);
      resolve(server);
    });
  });
};

export const closeTestServer = async () => {
  return new Promise((resolve, reject) => {
    if (server) {
      server.close(() => {
        console.log("Test server closed");
        resolve();
      });
    } else {
      resolve();
    }
  });
};
