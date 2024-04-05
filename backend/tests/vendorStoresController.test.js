const request = require("supertest");
const { startTestServer, closeTestServer } = require("../utils/testUtils");
const app = require("../server");
const VendorStore = require("../models/vendorStoreModel");
const cloudinary = require("../services/cloudinary.config"); // Import the cloudinary module

// Mocking the VendorStore model and cloudinary
jest.mock("../models/vendorStoreModel", () => ({
  findOne: jest.fn(),
}));
jest.mock("../services/cloudinary.config", () => ({
  uploader: {
    destroy: jest.fn(),
  },
}));

// updateVendorStore
describe("Vendor Stores Controller", () => {
  let server;

  // Start the test server before all tests
  beforeAll(async () => {
    server = await startTestServer(app);
  });

  // Close the test server after all tests
  afterAll(async () => {
    await closeTestServer(server);
  });

  // Test case to update vendor store successfully
  it("should update vendor store successfully", async () => {
    // Mock vendor store data
    const mockVendorStore = {
      _id: "1",
      title: "Store 1",
      description: "Description 1",
      coverImage: { url: "old_cover_image_url", publicId: "old_public_id" },
      storeImages: [],
      storeOwner: "vendor_id",
    };

    // Mock request body
    const requestBody = {
      title: "Updated Store Title",
      description: "Updated Store Description",
    };

    // Mock findOne method to return the vendor store
    VendorStore.findOne.mockResolvedValue(mockVendorStore);

    // Mock cloudinary.uploader.destroy method
    cloudinary.uploader.destroy.mockResolvedValue({ result: "ok" });

    // Make a PUT request to update the vendor store
    const res = await request(server)
      .put(`/api/v1/vendor-stores/store-slug`)
      .send(requestBody);

    // Expect the response status to be 200
    expect(res.status).toBe(200);

    // Expect the response data to match the updated vendor store
    expect(res.body).toEqual(expect.objectContaining(requestBody));

    // Expect VendorStore.findOne to have been called with the correct parameters
    expect(VendorStore.findOne).toHaveBeenCalledWith({
      storeSlug: "store-slug",
    });

    // Expect cloudinary.uploader.destroy to have been called with the old public ID
    expect(cloudinary.uploader.destroy).toHaveBeenCalledWith("old_public_id");
  });

  // Test case to handle unauthorized access
  it("should handle unauthorized access", async () => {
    // Mock findOne method to return a different store owner
    VendorStore.findOne.mockResolvedValue({
      ...mockVendorStore,
      storeOwner: "another_vendor_id",
    });

    // Make a PUT request to update the vendor store
    const res = await request(server)
      .put(`/api/v1/vendor-stores/store-slug`)
      .send({});

    // Expect the response status to be 401
    expect(res.status).toBe(401);

    // Expect the response data to contain the error message
    expect(res.body.message).toBe("Not authorized.");
  });

  // Test case to handle error and return 500 status code
  it("should handle errors and return 500 status code", async () => {
    // Mock findOne method to throw an error
    VendorStore.findOne.mockRejectedValue(new Error("Database error"));

    // Make a PUT request to update the vendor store
    const res = await request(server)
      .put(`/api/v1/vendor-stores/store-slug`)
      .send({});

    // Expect the response status to be 500
    expect(res.status).toBe(500);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ message: "Database error" });
  });
});
