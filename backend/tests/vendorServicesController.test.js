const request = require("supertest");
const { startTestServer, closeTestServer } = require("../utils/testUtils");
const app = require("../server");
const VendorService = require("../models/vendorServiceModel");

// Mocking the VendorService model
jest.mock("../models/vendorServiceModel", () => ({
  findOne: jest.fn(),
}));

// showVendorService
describe("Vendor Services Controller", () => {
  let server;

  // Start the test server before all tests
  beforeAll(async () => {
    server = await startTestServer(app);
  });

  // Close the test server after all tests
  afterAll(async () => {
    await closeTestServer(server);
  });

  // Test case to fetch vendor service details successfully
  it("should fetch vendor service details successfully", async () => {
    // Mock vendor service data
    const vendorService = {
      _id: "1",
      name: "Service 1",
      serviceCategory: { name: "Category A" },
    };

    // Mock findOne method to return vendor service
    VendorService.findOne.mockResolvedValue(vendorService);

    // Make a GET request to fetch vendor service details
    const res = await request(server).get("/api/v1/vendor-services/123/1");

    // Expect the response status to be 200
    expect(res.status).toBe(200);

    // Expect the response data to match the returned vendor service
    expect(res.body).toEqual(vendorService);
  });

  // Test case to ensure the serviceCategory field is populated
  it("should populate the serviceCategory field for the vendor service", async () => {
    // Mock vendor service data
    const vendorService = {
      _id: "1",
      name: "Service 1",
      serviceCategory: { name: "Category A" },
    };

    // Mock findOne method to return vendor service
    VendorService.findOne.mockResolvedValue(vendorService);

    // Make a GET request to fetch vendor service details
    const res = await request(server).get("/api/v1/vendor-services/123/1");

    // Expect the serviceCategory field to be populated
    expect(res.body.serviceCategory).toHaveProperty("name");
  });

  // Test case to handle vendor service not found
  it("should handle vendor service not found", async () => {
    // Mock findOne method to return null
    VendorService.findOne.mockResolvedValue(null);

    // Make a GET request to fetch vendor service details
    const res = await request(server).get("/api/v1/vendor-services/123/1");

    // Expect the response status to be 404
    expect(res.status).toBe(404);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ message: "Vendor Service not found" });
  });

  // Test case to handle errors and return 500 status code
  it("should handle errors and return 500 status code", async () => {
    // Mock findOne method to throw an error
    VendorService.findOne.mockRejectedValue(new Error("Database error"));

    // Make a GET request to fetch vendor service details
    const res = await request(server).get("/api/v1/vendor-services/123/1");

    // Expect the response status to be 500
    expect(res.status).toBe(500);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ message: "Database error" });
  });
});

// createVendorService
describe("Vendor Services Controller", () => {
  let server;

  // Start the test server before all tests
  beforeAll(async () => {
    server = await startTestServer(app);
  });

  // Close the test server after all tests
  afterAll(async () => {
    await closeTestServer(server);
  });

  // Test case to create a new vendor service successfully
  it("should create a new vendor service successfully", async () => {
    // Mock vendor service data
    const newVendorService = {
      _id: "1",
      name: "Service 1",
      description: "Description of Service 1",
      yearsExperience: 5,
      costHour: 50,
      serviceCategory: "Category ID",
      vendorStore: "Vendor Store ID",
    };

    // Mock create method to return the new vendor service
    VendorService.create.mockResolvedValue(newVendorService);

    // Make a POST request to create a new vendor service
    const res = await request(server)
      .post("/api/v1/vendor-services")
      .send(newVendorService);

    // Expect the response status to be 201
    expect(res.status).toBe(201);

    // Expect the response body to match the new vendor service data
    expect(res.body).toEqual(newVendorService);
  });

  // Test case to handle invalid vendor service data
  it("should handle invalid vendor service data", async () => {
    // Mock create method to return null (indicating invalid data)
    VendorService.create.mockResolvedValue(null);

    // Make a POST request to create a new vendor service
    const res = await request(server).post("/api/v1/vendor-services");

    // Expect the response status to be 400
    expect(res.status).toBe(400);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ message: "Invalid Vendor Service data" });
  });

  // Test case to handle errors and return 500 status code
  it("should handle errors and return 500 status code", async () => {
    // Mock create method to throw an error
    VendorService.create.mockRejectedValue(new Error("Database error"));

    // Make a POST request to create a new vendor service
    const res = await request(server).post("/api/v1/vendor-services");

    // Expect the response status to be 500
    expect(res.status).toBe(500);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ message: "Database error" });
  });
});

// updateVendorService
describe("Vendor Services Controller", () => {
  let server;

  // Start the test server before all tests
  beforeAll(async () => {
    server = await startTestServer(app);
  });

  // Close the test server after all tests
  afterAll(async () => {
    await closeTestServer(server);
  });

  // Test case to update a vendor service successfully
  it("should update a vendor service successfully", async () => {
    // Mock vendor service data
    const updatedVendorService = {
      _id: "1",
      name: "Updated Service",
      description: "Updated description",
      yearsExperience: 10,
      costHour: 75,
      serviceCategory: "Updated Category ID",
    };

    // Mock findOne method to return the existing vendor service
    VendorService.findOne.mockResolvedValue({
      _id: "1",
      vendorStore: "Vendor Store ID",
      vendorStore: { storeOwner: "Store Owner ID" },
      save: jest.fn().mockResolvedValue(updatedVendorService),
    });

    // Make a PUT request to update the vendor service
    const res = await request(server)
      .put("/api/v1/vendor-services/VendorStoreID/1")
      .send(updatedVendorService);

    // Expect the response status to be 200
    expect(res.status).toBe(200);

    // Expect the response body to match the updated vendor service data
    expect(res.body).toEqual(updatedVendorService);
  });

  // Test case to handle non-existing vendor service
  it("should handle non-existing vendor service", async () => {
    // Mock findOne method to return null (indicating non-existing vendor service)
    VendorService.findOne.mockResolvedValue(null);

    // Make a PUT request to update the vendor service
    const res = await request(server)
      .put("/api/v1/vendor-services/VendorStoreID/1")
      .send({});

    // Expect the response status to be 400
    expect(res.status).toBe(400);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ message: "Vendor Service doesn't exist" });
  });

  // Test case to handle unauthorized user
  it("should handle unauthorized user", async () => {
    // Mock findOne method to return an existing vendor service with different store owner
    VendorService.findOne.mockResolvedValue({
      _id: "1",
      vendorStore: "Vendor Store ID",
      vendorStore: { storeOwner: "Different Store Owner ID" },
    });

    // Make a PUT request to update the vendor service
    const res = await request(server)
      .put("/api/v1/vendor-services/VendorStoreID/1")
      .send({});

    // Expect the response status to be 401
    expect(res.status).toBe(401);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({
      message: "Not authorized. Not the Store owner.",
    });
  });

  // Test case to handle errors and return 500 status code
  it("should handle errors and return 500 status code", async () => {
    // Mock findOne method to throw an error
    VendorService.findOne.mockRejectedValue(new Error("Database error"));

    // Make a PUT request to update the vendor service
    const res = await request(server)
      .put("/api/v1/vendor-services/VendorStoreID/1")
      .send({});

    // Expect the response status to be 500
    expect(res.status).toBe(500);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ message: "Database error" });
  });
});

// deleteVendorService
describe("Vendor Services Controller", () => {
  let server;

  // Start the test server before all tests
  beforeAll(async () => {
    server = await startTestServer(app);
  });

  // Close the test server after all tests
  afterAll(async () => {
    await closeTestServer(server);
  });

  // Test case to delete a vendor service successfully
  it("should delete a vendor service successfully", async () => {
    // Mock findOne method to return an existing vendor service
    VendorService.findOne.mockResolvedValue({
      _id: "1",
      vendorStore: "Vendor Store ID",
      vendorStore: { storeOwner: "Store Owner ID" },
    });

    // Make a DELETE request to delete the vendor service
    const res = await request(server).delete(
      "/api/v1/vendor-services/VendorStoreID/1"
    );

    // Expect the response status to be 200
    expect(res.status).toBe(200);

    // Expect the response data to contain the success message
    expect(res.body).toEqual({
      message: "Vendor Service deleted successfully",
    });

    // Expect the deleteOne method to be called with the correct parameters
    expect(VendorService.deleteOne).toHaveBeenCalledWith({ _id: "1" });
  });

  // Test case to handle non-existing vendor service
  it("should handle non-existing vendor service", async () => {
    // Mock findOne method to return null (indicating non-existing vendor service)
    VendorService.findOne.mockResolvedValue(null);

    // Make a DELETE request to delete the vendor service
    const res = await request(server).delete(
      "/api/v1/vendor-services/VendorStoreID/1"
    );

    // Expect the response status to be 400
    expect(res.status).toBe(400);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ message: "Vendor Service doesn't exist" });

    // Expect the deleteOne method not to be called
    expect(VendorService.deleteOne).not.toHaveBeenCalled();
  });

  // Test case to handle unauthorized user
  it("should handle unauthorized user", async () => {
    // Mock findOne method to return an existing vendor service with different store owner
    VendorService.findOne.mockResolvedValue({
      _id: "1",
      vendorStore: "Vendor Store ID",
      vendorStore: { storeOwner: "Different Store Owner ID" },
    });

    // Make a DELETE request to delete the vendor service
    const res = await request(server).delete(
      "/api/v1/vendor-services/VendorStoreID/1"
    );

    // Expect the response status to be 401
    expect(res.status).toBe(401);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({
      message: "Not authorized. Not the Store owner.",
    });

    // Expect the deleteOne method not to be called
    expect(VendorService.deleteOne).not.toHaveBeenCalled();
  });

  // Test case to handle errors and return 500 status code
  it("should handle errors and return 500 status code", async () => {
    // Mock findOne method to throw an error
    VendorService.findOne.mockRejectedValue(new Error("Database error"));

    // Make a DELETE request to delete the vendor service
    const res = await request(server).delete(
      "/api/v1/vendor-services/VendorStoreID/1"
    );

    // Expect the response status to be 500
    expect(res.status).toBe(500);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ message: "Database error" });

    // Expect the deleteOne method not to be called
    expect(VendorService.deleteOne).not.toHaveBeenCalled();
  });
});
