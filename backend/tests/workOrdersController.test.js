const request = require("supertest");
const { startTestServer, closeTestServer } = require("../utils/testUtils");
const app = require("../server");
const WorkOrder = require("../models/workOrderModel");
const Project = require("../models/projectModel");

// Mocking the WorkOrder model
jest.mock("../models/workOrderModel", () => ({
  find: jest.fn(),
}));

// Mocking the Project model
jest.mock("../models/projectModel", () => ({
  findById: jest.fn(),
}));

// Mock createNotification function
jest.mock("../controllers/api/v1/notificationsController.js", () => ({
  createNotification: jest.fn(),
}));

// getVendorProjectWorkOrders
describe("Work Orders Controller", () => {
  let server;

  // Start the test server before all tests
  beforeAll(async () => {
    server = await startTestServer(app);
  });

  // Close the test server after all tests
  afterAll(async () => {
    await closeTestServer(server);
  });

  // Test case to check if work orders are fetched successfully
  it("should fetch work orders related to the provided vendor and project IDs", async () => {
    // Mock request parameters
    const vendorId = "mockVendorId";
    const projectId = "mockProjectId";

    // Mock work orders data
    const mockWorkOrders = [
      {
        _id: "mockWorkOrderId1",
        name: "Work Order 1",
        startDateTime: new Date(),
        endDateTime: new Date(),
        workOrderStatus: "pending",
        vendor: vendorId,
        project: projectId,
      },
      {
        _id: "mockWorkOrderId2",
        name: "Work Order 2",
        startDateTime: new Date(),
        endDateTime: new Date(),
        workOrderStatus: "accepted",
        vendor: vendorId,
        project: projectId,
      },
    ];

    // Mock project data
    const mockProject = {
      _id: projectId,
      name: "Mock Project Name",
      propertyManager: "mockPropertyManagerId",
    };

    // Mock vendor data
    const mockVendor = {
      _id: vendorId,
    };

    // Mock populated work orders data
    const mockPopulatedWorkOrders = mockWorkOrders.map((workOrder) => ({
      ...workOrder,
      project: mockProject,
      vendor: mockVendor,
    }));

    // Mock WorkOrder.find method
    WorkOrder.find.mockResolvedValue(mockWorkOrders);

    // Mock Project.findById method
    Project.findById.mockResolvedValue(mockProject);

    // Make a GET request to fetch work orders
    const res = await request(server).get(
      `/api/v1/work-orders/vendor/${vendorId}/project/${projectId}`
    );

    // Expect the response status to be 200
    expect(res.status).toBe(200);

    // Expect the response data to match the populated work orders
    expect(res.body).toEqual(mockPopulatedWorkOrders);

    // Expect WorkOrder.find to have been called with the correct parameters
    expect(WorkOrder.find).toHaveBeenCalledWith({
      project: projectId,
      vendor: vendorId,
    });

    // Expect Project.findById to have been called with the correct project ID
    expect(Project.findById).toHaveBeenCalledWith(projectId);
  });

  // Test case to check error handling and 500 status code
  it("should handle errors and return 500 status code", async () => {
    // Mock request parameters
    const vendorId = "mockVendorId";
    const projectId = "mockProjectId";

    // Mock error message
    const errorMessage = "Database error";

    // Mock WorkOrder.find method to throw an error
    WorkOrder.find.mockRejectedValue(new Error(errorMessage));

    // Make a GET request to fetch work orders
    const res = await request(server).get(
      `/api/v1/work-orders/vendor/${vendorId}/project/${projectId}`
    );

    // Expect the response status to be 500
    expect(res.status).toBe(500);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ message: errorMessage });

    // Expect WorkOrder.find to have been called with the correct parameters
    expect(WorkOrder.find).toHaveBeenCalledWith({
      project: projectId,
      vendor: vendorId,
    });

    // Expect Project.findById not to have been called
    expect(Project.findById).not.toHaveBeenCalled();
  });
});

// getAllVendorWorkOrders
describe("Work Orders Controller", () => {
  let server;

  // Start the test server before all tests
  beforeAll(async () => {
    server = await startTestServer(app);
  });

  // Close the test server after all tests
  afterAll(async () => {
    await closeTestServer(server);
  });

  // Test case to check if all work orders related to the provided vendor ID are fetched successfully
  it("should fetch all work orders related to the provided vendor ID", async () => {
    // Mock request parameters
    const vendorId = "mockVendorId";

    // Mock work orders data
    const mockWorkOrders = [
      {
        _id: "mockWorkOrderId1",
        name: "Work Order 1",
        startDateTime: new Date(),
        endDateTime: new Date(),
        workOrderStatus: "pending",
        vendor: vendorId,
        project: "mockProjectId1",
      },
      {
        _id: "mockWorkOrderId2",
        name: "Work Order 2",
        startDateTime: new Date(),
        endDateTime: new Date(),
        workOrderStatus: "accepted",
        vendor: vendorId,
        project: "mockProjectId2",
      },
    ];

    // Mock projects data
    const mockProjects = [
      {
        _id: "mockProjectId1",
        name: "Mock Project 1",
        propertyManager: "mockPropertyManagerId1",
      },
      {
        _id: "mockProjectId2",
        name: "Mock Project 2",
        propertyManager: "mockPropertyManagerId2",
      },
    ];

    // Mock vendor data
    const mockVendor = {
      _id: vendorId,
    };

    // Mock populated work orders data
    const mockPopulatedWorkOrders = mockWorkOrders.map((workOrder) => {
      const project = mockProjects.find(
        (project) => project._id === workOrder.project
      );
      return {
        ...workOrder,
        project,
        vendor: mockVendor,
      };
    });

    // Mock WorkOrder.find method
    WorkOrder.find.mockResolvedValue(mockWorkOrders);

    // Mock Project.findById method
    Project.findById.mockImplementation((projectId) => {
      const project = mockProjects.find((p) => p._id === projectId);
      return Promise.resolve(project);
    });

    // Make a GET request to fetch all work orders
    const res = await request(server).get(
      `/api/v1/work-orders/vendor/${vendorId}`
    );

    // Expect the response status to be 200
    expect(res.status).toBe(200);

    // Expect the response data to match the populated work orders
    expect(res.body).toEqual(mockPopulatedWorkOrders);

    // Expect WorkOrder.find to have been called with the correct parameters
    expect(WorkOrder.find).toHaveBeenCalledWith({
      vendor: vendorId,
    });

    // Expect Project.findById to have been called for each project ID in the fetched work orders
    mockWorkOrders.forEach((workOrder) => {
      expect(Project.findById).toHaveBeenCalledWith(workOrder.project);
    });
  });

  // Test case to check error handling and 500 status code
  it("should handle errors and return 500 status code", async () => {
    // Mock request parameters
    const vendorId = "mockVendorId";

    // Mock error message
    const errorMessage = "Database error";

    // Mock WorkOrder.find method to throw an error
    WorkOrder.find.mockRejectedValue(new Error(errorMessage));

    // Make a GET request to fetch all work orders
    const res = await request(server).get(
      `/api/v1/work-orders/vendor/${vendorId}`
    );

    // Expect the response status to be 500
    expect(res.status).toBe(500);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ message: errorMessage });

    // Expect WorkOrder.find to have been called with the correct parameters
    expect(WorkOrder.find).toHaveBeenCalledWith({
      vendor: vendorId,
    });

    // Expect Project.findById not to have been called
    expect(Project.findById).not.toHaveBeenCalled();
  });
});

// showVendorWorkOrder
describe("Work Orders Controller", () => {
  let server;

  // Start the test server before all tests
  beforeAll(async () => {
    server = await startTestServer(app);
  });

  // Close the test server after all tests
  afterAll(async () => {
    await closeTestServer(server);
  });

  // Test case to check if work order details are fetched successfully
  it("should fetch work order details for the provided work order ID", async () => {
    // Mock request parameters
    const workOrderId = "mockWorkOrderId";

    // Mock work order data
    const mockWorkOrder = {
      _id: workOrderId,
      name: "Mock Work Order",
      startDateTime: new Date(),
      endDateTime: new Date(),
      workOrderStatus: "pending",
      vendor: "mockVendorId",
      project: "mockProjectId",
    };

    // Mock project data
    const mockProject = {
      _id: "mockProjectId",
      name: "Mock Project",
      // Add more fields as needed
    };

    // Mock vendor data
    const mockVendor = {
      _id: "mockVendorId",
      companyName: "Mock Company",
      // Add more fields as needed
    };

    // Mock populated work order data
    const mockPopulatedWorkOrder = {
      ...mockWorkOrder,
      project: mockProject,
      vendor: mockVendor,
    };

    // Mock WorkOrder.findOne method
    WorkOrder.findOne.mockResolvedValue(mockWorkOrder);

    // Make a GET request to fetch work order details
    const res = await request(server).get(
      `/api/v1/work-orders/vendor/order/${workOrderId}`
    );

    // Expect the response status to be 200
    expect(res.status).toBe(200);

    // Expect the response data to match the populated work order
    expect(res.body).toEqual(mockPopulatedWorkOrder);

    // Expect WorkOrder.findOne to have been called with the correct parameters
    expect(WorkOrder.findOne).toHaveBeenCalledWith({
      _id: workOrderId,
    });
  });

  // Test case to check error handling and 400 status code
  it("should handle errors and return 400 status code if work order does not exist", async () => {
    // Mock request parameters
    const workOrderId = "nonExistentWorkOrderId";

    // Mock error message
    const errorMessage = "Work order doesn't exist";

    // Mock WorkOrder.findOne method to return null (work order doesn't exist)
    WorkOrder.findOne.mockResolvedValue(null);

    // Make a GET request to fetch work order details
    const res = await request(server).get(
      `/api/v1/work-orders/vendor/order/${workOrderId}`
    );

    // Expect the response status to be 400
    expect(res.status).toBe(400);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ message: errorMessage });

    // Expect WorkOrder.findOne to have been called with the correct parameters
    expect(WorkOrder.findOne).toHaveBeenCalledWith({
      _id: workOrderId,
    });
  });

  // Test case to check error handling and 500 status code
  it("should handle errors and return 500 status code", async () => {
    // Mock request parameters
    const workOrderId = "mockWorkOrderId";

    // Mock error message
    const errorMessage = "Database error";

    // Mock WorkOrder.findOne method to throw an error
    WorkOrder.findOne.mockRejectedValue(new Error(errorMessage));

    // Make a GET request to fetch work order details
    const res = await request(server).get(
      `/api/v1/work-orders/vendor/order/${workOrderId}`
    );

    // Expect the response status to be 500
    expect(res.status).toBe(500);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ message: errorMessage });

    // Expect WorkOrder.findOne to have been called with the correct parameters
    expect(WorkOrder.findOne).toHaveBeenCalledWith({
      _id: workOrderId,
    });
  });
});

// createWorkOrder
describe("Work Orders Controller", () => {
  let server;

  // Start the test server before all tests
  beforeAll(async () => {
    server = await startTestServer(app);
  });

  // Close the test server after all tests
  afterAll(async () => {
    await closeTestServer(server);
  });

  // Test case to check if work order is created successfully
  it("should create a new work order and trigger notification to vendor", async () => {
    // Mock request parameters and body
    const projectId = "mockProjectId";
    const requestBody = {
      name: "Mock Work Order",
      startDateTime: new Date(),
      endDateTime: new Date(),
      vendor: "mockVendorId",
    };

    // Mock project data
    const mockProject = {
      _id: projectId,
      name: "Mock Project",
      propertyManager: "mockPropertyManagerId",
    };

    // Mock created work order data
    const mockWorkOrder = {
      _id: "mockWorkOrderId",
      ...requestBody,
      project: projectId,
    };

    // Mock notification data
    const mockNotificationData = {
      sender: "mockPropertyManagerId",
      senderType: "PropertyManager",
      recipient: "mockVendorId",
      recipientType: "Vendor",
      notificationType: "WORK_ORDER_CREATED",
      message: "New work order created",
      data: {
        projectId: projectId,
        projectName: mockProject.name,
      },
    };

    // Mock Project.findById method
    Project.findById.mockResolvedValue(mockProject);

    // Mock WorkOrder.create method
    WorkOrder.create.mockResolvedValue(mockWorkOrder);

    // Make a POST request to create a new work order
    const res = await request(server)
      .post(`/api/v1/work-orders/property-manager/${projectId}`)
      .send(requestBody);

    // Expect the response status to be 201
    expect(res.status).toBe(201);

    // Expect the response data to match the created work order
    expect(res.body).toEqual(mockWorkOrder);

    // Expect WorkOrder.create to have been called with the correct parameters
    expect(WorkOrder.create).toHaveBeenCalledWith({
      ...requestBody,
      project: projectId,
    });

    // Expect Project.findById to have been called with the correct project ID
    expect(Project.findById).toHaveBeenCalledWith(projectId);

    // Expect createNotification to have been called with the correct notification data
    expect(createNotification).toHaveBeenCalledWith(mockNotificationData);
  });

  // Test case to check error handling and 500 status code
  it("should handle errors and return 500 status code", async () => {
    // Mock request parameters and body
    const projectId = "mockProjectId";
    const requestBody = {
      name: "Mock Work Order",
      startDateTime: new Date(),
      endDateTime: new Date(),
      vendor: "mockVendorId",
    };

    // Mock error message
    const errorMessage = "Database error";

    // Mock Project.findById method to throw an error
    Project.findById.mockRejectedValue(new Error(errorMessage));

    // Make a POST request to create a new work order
    const res = await request(server)
      .post(`/api/v1/work-orders/property-manager/${projectId}`)
      .send(requestBody);

    // Expect the response status to be 500
    expect(res.status).toBe(500);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ message: errorMessage });

    // Expect WorkOrder.create not to have been called
    expect(WorkOrder.create).not.toHaveBeenCalled();

    // Expect createNotification not to have been called
    expect(createNotification).not.toHaveBeenCalled();
  });
});

// vendorAcceptWorkOrder
describe("Work Orders Controller", () => {
  let server;

  // Start the test server before all tests
  beforeAll(async () => {
    server = await startTestServer(app);
  });

  // Close the test server after all tests
  afterAll(async () => {
    await closeTestServer(server);
  });

  // Test case to check if work order is updated successfully when vendor accepts it
  it('should update work order status to "inProgress" when vendor accepts it and trigger notification to property manager', async () => {
    // Mock request parameters
    const projectId = "mockProjectId";
    const workOrderId = "mockWorkOrderId";

    // Mock work order data
    const mockWorkOrder = {
      _id: workOrderId,
      workOrderStatus: "pending",
      vendor: {
        _id: "mockVendorId",
        companyName: "Mock Vendor",
      },
      project: {
        _id: projectId,
        name: "Mock Project",
        propertyManager: "mockPropertyManagerId",
      },
    };

    // Mock project data
    const mockProject = {
      _id: projectId,
      name: "Mock Project",
      propertyManager: "mockPropertyManagerId",
    };

    // Mock notification data
    const mockNotificationData = {
      sender: "mockVendorId",
      senderType: "Vendor",
      recipient: "mockPropertyManagerId",
      recipientType: "PropertyManager",
      notificationType: "WORK_ORDER_ACCEPTED_VENDOR",
      message: "Vendor has accepted the work order",
      data: {
        projectId: projectId,
        projectName: mockProject.name,
      },
    };

    // Mock WorkOrder.findOne method
    WorkOrder.findOne.mockResolvedValue(mockWorkOrder);

    // Mock Project.findById method
    Project.findById.mockResolvedValue(mockProject);

    // Make a PUT request to accept the work order
    const res = await request(server)
      .put(`/api/v1/work-orders/vendor/accept/${projectId}/${workOrderId}`)
      .send();

    // Expect the response status to be 200
    expect(res.status).toBe(200);

    // Expect the response data to match the updated work order
    expect(res.body).toEqual({
      ...mockWorkOrder,
      workOrderStatus: "inProgress",
    });

    // Expect WorkOrder.findOne to have been called with the correct parameters
    expect(WorkOrder.findOne).toHaveBeenCalledWith({ _id: workOrderId });

    // Expect Project.findById to have been called with the correct project ID
    expect(Project.findById).toHaveBeenCalledWith(projectId);

    // Expect createNotification to have been called with the correct notification data
    expect(createNotification).toHaveBeenCalledWith(mockNotificationData);
  });

  // Test case to check error handling and 500 status code
  it("should handle errors and return 500 status code", async () => {
    // Mock request parameters
    const projectId = "mockProjectId";
    const workOrderId = "mockWorkOrderId";

    // Mock error message
    const errorMessage = "Database error";

    // Mock WorkOrder.findOne method to throw an error
    WorkOrder.findOne.mockRejectedValue(new Error(errorMessage));

    // Make a PUT request to accept the work order
    const res = await request(server)
      .put(`/api/v1/work-orders/vendor/accept/${projectId}/${workOrderId}`)
      .send();

    // Expect the response status to be 500
    expect(res.status).toBe(500);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ message: errorMessage });

    // Expect Project.findById not to have been called
    expect(Project.findById).not.toHaveBeenCalled();

    // Expect createNotification not to have been called
    expect(createNotification).not.toHaveBeenCalled();
  });
});

// vendorRescheduleWorkOrder
describe("Work Orders Controller", () => {
  let server;

  // Start the test server before all tests
  beforeAll(async () => {
    server = await startTestServer(app);
  });

  // Close the test server after all tests
  afterAll(async () => {
    await closeTestServer(server);
  });

  // Test case to check if work order is rescheduled successfully by vendor
  it("should reschedule work order and trigger notification to property manager", async () => {
    // Mock request parameters
    const projectId = "mockProjectId";
    const workOrderId = "mockWorkOrderId";

    // Mock request body
    const requestBody = {
      startDateTime: new Date("2024-05-01T08:00:00.000Z"),
      endDateTime: new Date("2024-05-01T17:00:00.000Z"),
    };

    // Mock work order data
    const mockWorkOrder = {
      _id: workOrderId,
      workOrderStatus: "pending",
      vendor: {
        _id: "mockVendorId",
        companyName: "Mock Vendor",
      },
      project: {
        _id: projectId,
        name: "Mock Project",
        propertyManager: "mockPropertyManagerId",
      },
    };

    // Mock project data
    const mockProject = {
      _id: projectId,
      name: "Mock Project",
      propertyManager: "mockPropertyManagerId",
    };

    // Mock notification data
    const mockNotificationData = {
      sender: "mockVendorId",
      senderType: "Vendor",
      recipient: "mockPropertyManagerId",
      recipientType: "PropertyManager",
      notificationType: "WORK_ORDER_RESCHEDULE_VENDOR",
      message: "Vendor has rescheduled the work order",
      data: {
        projectId: projectId,
        projectName: mockProject.name,
      },
    };

    // Mock WorkOrder.findOne method
    WorkOrder.findOne.mockResolvedValue(mockWorkOrder);

    // Mock Project.findById method
    Project.findById.mockResolvedValue(mockProject);

    // Make a PUT request to reschedule the work order
    const res = await request(server)
      .put(`/api/v1/work-orders/vendor/reschedule/${projectId}/${workOrderId}`)
      .send(requestBody);

    // Expect the response status to be 200
    expect(res.status).toBe(200);

    // Expect the response data to match the updated work order
    expect(res.body).toEqual({
      ...mockWorkOrder,
      workOrderStatus: "rescheduleByVendor",
      startDateTime: requestBody.startDateTime,
      endDateTime: requestBody.endDateTime,
    });

    // Expect WorkOrder.findOne to have been called with the correct parameters
    expect(WorkOrder.findOne).toHaveBeenCalledWith({ _id: workOrderId });

    // Expect Project.findById to have been called with the correct project ID
    expect(Project.findById).toHaveBeenCalledWith(projectId);

    // Expect createNotification to have been called with the correct notification data
    expect(createNotification).toHaveBeenCalledWith(mockNotificationData);
  });

  // Test case to check error handling and 500 status code
  it("should handle errors and return 500 status code", async () => {
    // Mock request parameters
    const projectId = "mockProjectId";
    const workOrderId = "mockWorkOrderId";

    // Mock request body
    const requestBody = {
      startDateTime: new Date("2024-05-01T08:00:00.000Z"),
      endDateTime: new Date("2024-05-01T17:00:00.000Z"),
    };

    // Mock error message
    const errorMessage = "Database error";

    // Mock WorkOrder.findOne method to throw an error
    WorkOrder.findOne.mockRejectedValue(new Error(errorMessage));

    // Make a PUT request to reschedule the work order
    const res = await request(server)
      .put(`/api/v1/work-orders/vendor/reschedule/${projectId}/${workOrderId}`)
      .send(requestBody);

    // Expect the response status to be 500
    expect(res.status).toBe(500);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ message: errorMessage });

    // Expect Project.findById not to have been called
    expect(Project.findById).not.toHaveBeenCalled();

    // Expect createNotification not to have been called
    expect(createNotification).not.toHaveBeenCalled();
  });
});

// propertyManagerCloseWorkOrder
describe("Work Orders Controller", () => {
  let server;

  // Start the test server before all tests
  beforeAll(async () => {
    server = await startTestServer(app);
  });

  // Close the test server after all tests
  afterAll(async () => {
    await closeTestServer(server);
  });

  // Test case to check if work order is closed successfully by property manager
  it("should close work order and trigger notification to vendor", async () => {
    // Mock request parameters
    const projectId = "mockProjectId";
    const workOrderId = "mockWorkOrderId";

    // Mock work order data
    const mockWorkOrder = {
      _id: workOrderId,
      workOrderStatus: "inProgress",
      vendor: {
        _id: "mockVendorId",
        companyName: "Mock Vendor",
      },
      project: {
        _id: projectId,
        name: "Mock Project",
        propertyManager: "mockPropertyManagerId",
      },
    };

    // Mock project data
    const mockProject = {
      _id: projectId,
      name: "Mock Project",
      propertyManager: "mockPropertyManagerId",
    };

    // Mock notification data
    const mockNotificationData = {
      sender: "mockPropertyManagerId",
      senderType: "PropertyManager",
      recipient: "mockVendorId",
      recipientType: "Vendor",
      notificationType: "WORK_ORDER_CLOSED_PROP_MANAGER",
      message: "Property Manager has closed the work order",
      data: {
        projectId: projectId,
        projectName: mockProject.name,
      },
    };

    // Mock WorkOrder.findOne method
    WorkOrder.findOne.mockResolvedValue(mockWorkOrder);

    // Mock Project.findById method
    Project.findById.mockResolvedValue(mockProject);

    // Make a PUT request to close the work order
    const res = await request(server).put(
      `/api/v1/work-orders/property-manager/close/${projectId}/${workOrderId}`
    );

    // Expect the response status to be 200
    expect(res.status).toBe(200);

    // Expect the response data to match the updated work order
    expect(res.body).toEqual({
      ...mockWorkOrder,
      workOrderStatus: "closed",
    });

    // Expect WorkOrder.findOne to have been called with the correct parameters
    expect(WorkOrder.findOne).toHaveBeenCalledWith({ _id: workOrderId });

    // Expect Project.findById to have been called with the correct project ID
    expect(Project.findById).toHaveBeenCalledWith(projectId);

    // Expect createNotification to have been called with the correct notification data
    expect(createNotification).toHaveBeenCalledWith(mockNotificationData);
  });

  // Test case to check error handling and 500 status code
  it("should handle errors and return 500 status code", async () => {
    // Mock request parameters
    const projectId = "mockProjectId";
    const workOrderId = "mockWorkOrderId";

    // Mock error message
    const errorMessage = "Database error";

    // Mock WorkOrder.findOne method to throw an error
    WorkOrder.findOne.mockRejectedValue(new Error(errorMessage));

    // Make a PUT request to close the work order
    const res = await request(server).put(
      `/api/v1/work-orders/property-manager/close/${projectId}/${workOrderId}`
    );

    // Expect the response status to be 500
    expect(res.status).toBe(500);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ message: errorMessage });

    // Expect Project.findById not to have been called
    expect(Project.findById).not.toHaveBeenCalled();

    // Expect createNotification not to have been called
    expect(createNotification).not.toHaveBeenCalled();
  });
});