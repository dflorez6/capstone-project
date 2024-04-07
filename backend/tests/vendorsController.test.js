const Vendor = require("../models/vendorModel");
const generateToken = require("../utils/generateToken");

// Mock the generateToken function
jest.mock("../utils/generateToken", () => {
  return jest.fn();
});

// Import the registerVendor and authVendor controller methods
const {
  registerVendor,
  authVendor,
  logoutVendor,
} = require("../controllers/api/v1/vendorsController");

// Mock Vendor model methods
jest.mock("../models/vendorModel", () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

// Mock request and response objects for registerVendor
const registerReq = {
  body: {
    companyName: "Test Company",
    firstName: "John",
    lastName: "Doe",
    email: "test@example.com",
    password: "123456",
    phone: "123-456-7890",
    address: {
      street: "123 Test St",
      city: "Test City",
      province: "Test Province",
      postalCode: "12345",
    },
  },
  file: {
    path: "mockAvatarUrl",
    filename: "mockPublicId",
  },
};
const registerRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
// Mock request and response objects for authVendor
const authReq = {
  body: {
    email: "test@example.com",
    password: "123456",
  },
};
const authRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
// Mock response object
const logoutRes = {
  cookie: jest.fn(),
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Vendors Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test: Create new vendor
  describe("POST /api/v1/vendors/register", () => {
    it("should register a new vendor", async () => {
      // Mock Vendor.findOne to return null (vendor does not exist)
      Vendor.findOne.mockResolvedValue(null);

      // Mock Vendor.create to return a mock vendor
      const mockVendor = {
        _id: "mockId",
        accountType: "vendor",
        companyName: "Test Company",
        firstName: "John",
        lastName: "Doe",
        email: "test@example.com",
        phone: "123-456-7890",
        address: {
          street: "123 Test St",
          city: "Test City",
          province: "Test Province",
          postalCode: "12345",
        },
        avatar: {
          publicId: "mockPublicId",
          url: "mockAvatarUrl",
        },
        storeSlug: "test-company",
      };
      Vendor.create.mockResolvedValue(mockVendor);

      // Call the registerVendor method with the mocked request and response objects
      await registerVendor(registerReq, registerRes);

      // Check if Vendor.findOne was called with the correct email
      expect(Vendor.findOne).toHaveBeenCalledWith({
        email: registerReq.body.email,
      });

      // Check if Vendor.create was called with the correct data
      expect(Vendor.create).toHaveBeenCalledWith({
        companyName: registerReq.body.companyName,
        firstName: registerReq.body.firstName,
        lastName: registerReq.body.lastName,
        email: registerReq.body.email,
        password: registerReq.body.password,
        phone: registerReq.body.phone,
        address: registerReq.body.address,
        avatar: {
          publicId: "mockPublicId",
          url: "mockAvatarUrl",
        },
      });

      // Check if generateToken was called with the correct parameters
      expect(generateToken).toHaveBeenCalledWith(registerRes, "mockId");

      // Check if the response status is 201 (Created)
      expect(registerRes.status).toHaveBeenCalledWith(201);

      // Check if the response JSON matches the mock vendor data
      expect(registerRes.json).toHaveBeenCalledWith({
        _id: "mockId",
        accountType: "vendor", // Set accountType explicitly to "vendor"
        companyName: "Test Company",
        firstName: "John",
        lastName: "Doe",
        email: "test@example.com",
        avatar: {
          publicId: "mockPublicId",
          url: "mockAvatarUrl",
        },
        phone: "123-456-7890",
        address: {
          street: "123 Test St",
          city: "Test City",
          province: "Test Province",
          postalCode: "12345",
        },
        storeSlug: "test-company",
      });
    });
  });

  // Test: Authenticate vendor
  describe("POST /api/v1/vendors/auth", () => {
    it("should authenticate a vendor with valid credentials", async () => {
      // Mock Vendor.findOne to return a vendor (valid credentials)
      const mockVendor = {
        _id: "mockId",
        accountType: "vendor",
        companyName: "Test Company",
        firstName: "John",
        lastName: "Doe",
        email: "test@example.com",
        avatar: {
          publicId: "mockPublicId",
          url: "mockAvatarUrl",
        },
        phone: "123-456-7890",
        address: {
          street: "123 Test St",
          city: "Test City",
          province: "Test Province",
          postalCode: "12345",
        },
        matchPassword: jest.fn().mockResolvedValue(true), // Mock password match
      };
      Vendor.findOne.mockResolvedValue(mockVendor);

      // Call the authVendor method with the mocked request and response objects
      await authVendor(authReq, authRes);

      // Check if Vendor.findOne was called with the correct email
      expect(Vendor.findOne).toHaveBeenCalledWith({
        email: authReq.body.email,
      });

      // Check if generateToken was called with the correct parameters
      expect(generateToken).toHaveBeenCalledWith(authRes, "mockId");

      // Check if the response status is 201 (Created)
      expect(authRes.status).toHaveBeenCalledWith(201);

      // Check if the response JSON matches the mock vendor data
      expect(authRes.json).toHaveBeenCalledWith({
        _id: "mockId",
        accountType: "vendor",
        companyName: "Test Company",
        firstName: "John",
        lastName: "Doe",
        email: "test@example.com",
        avatar: {
          publicId: "mockPublicId",
          url: "mockAvatarUrl",
        },
        phone: "123-456-7890",
        address: {
          street: "123 Test St",
          city: "Test City",
          province: "Test Province",
          postalCode: "12345",
        },
      });
    });

    it("should return 401 with invalid credentials", async () => {
      // Mock Vendor.findOne to return null (invalid credentials)
      Vendor.findOne.mockResolvedValue(null);

      // Call the authVendor method with the mocked request and response objects
      await authVendor(authReq, authRes);

      // Check if Vendor.findOne was called with the correct email
      expect(Vendor.findOne).toHaveBeenCalledWith({
        email: authReq.body.email,
      });

      // Check if generateToken was not called
      expect(generateToken).not.toHaveBeenCalled();

      // Check if the response status is 401 (Unauthorized)
      expect(authRes.status).toHaveBeenCalledWith(401);

      // Check if the response JSON contains the error message
      expect(authRes.json).toHaveBeenCalledWith({
        message: "Invalid email or password",
      });
    });
  });

  // Test: Logout vendor
  describe("POST /api/v1/vendors/logout", () => {
    it("should logout a vendor", async () => {
      // Call the logoutVendor method with the mocked request and response objects
      await logoutVendor({}, logoutRes);

      // Check if res.cookie was called with the correct parameters to clear the token
      expect(logoutRes.cookie).toHaveBeenCalledWith("token", "", {
        httpOnly: true,
        expires: new Date(0),
      });

      // Check if the response status is 200 (OK)
      expect(logoutRes.status).toHaveBeenCalledWith(200);

      // Check if the response JSON contains the logout message
      expect(logoutRes.json).toHaveBeenCalledWith({
        message: "Vendor logged out",
      });
    });
  });

  // Add more tests as needed
});