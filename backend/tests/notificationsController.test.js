const request = require("supertest");
const { startTestServer, closeTestServer } = require("../utils/testUtils");
const app = require("../server");
const Notification = require("../models/notificationModel");

// Mocking the Notification model
jest.mock("../models/notificationModel", () => ({
  find: jest.fn(),
}));

// getAllPropertyManagerNotifications
describe("Notifications Controller", () => {
  let server;

  // Start the test server before all tests
  beforeAll(async () => {
    server = await startTestServer(app);
  });

  // Close the test server after all tests
  afterAll(async () => {
    await closeTestServer(server);
  });

  // Test case to fetch property manager notifications successfully
  it("should fetch property manager notifications successfully", async () => {
    // Mock Notification.find method to return mock notifications
    Notification.find.mockResolvedValue([
      {
        sender: { companyName: "Sender Company 1" },
        createdAt: "2022-04-01T12:00:00.000Z",
      },
      {
        sender: { companyName: "Sender Company 2" },
        createdAt: "2022-04-02T12:00:00.000Z",
      },
    ]);

    // Make a GET request to fetch property manager notifications
    const res = await request(server).get(
      "/api/v1/notifications/propertyManager/PropertyManagerID"
    );

    // Expect the response status to be 200
    expect(res.status).toBe(200);

    // Expect the response data to contain the mock notifications
    expect(res.body).toEqual([
      { sender: "Sender Company 1", createdAt: "2022-04-01T12:00:00.000Z" },
      { sender: "Sender Company 2", createdAt: "2022-04-02T12:00:00.000Z" },
    ]);

    // Expect the Notification.find method to be called with the correct parameters
    expect(Notification.find).toHaveBeenCalledWith({
      recipient: "PropertyManagerID",
    });

    // Expect the notifications to be sorted by createdAt date in descending order
    expect(res.body[0].createdAt).toBe("2022-04-02T12:00:00.000Z");
    expect(res.body[1].createdAt).toBe("2022-04-01T12:00:00.000Z");
  });

  // Test case to handle unauthorized access
  it("should handle unauthorized access", async () => {
    // Make a GET request with a different property manager ID
    const res = await request(server).get(
      "/api/v1/notifications/propertyManager/OtherPropertyManagerID"
    );

    // Expect the response status to be 401
    expect(res.status).toBe(401);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ message: "Not authorized." });

    // Expect the Notification.find method not to be called
    expect(Notification.find).not.toHaveBeenCalled();
  });

  // Test case to handle errors and return 500 status code
  it("should handle errors and return 500 status code", async () => {
    // Mock Notification.find method to throw an error
    Notification.find.mockRejectedValue(new Error("Database error"));

    // Make a GET request to fetch property manager notifications
    const res = await request(server).get(
      "/api/v1/notifications/propertyManager/PropertyManagerID"
    );

    // Expect the response status to be 500
    expect(res.status).toBe(500);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ message: "Database error" });

    // Expect the Notification.find method to be called
    expect(Notification.find).toHaveBeenCalled();
  });
});

// markReadPropertyManagerNotification



// deletePropertyManagerNotification