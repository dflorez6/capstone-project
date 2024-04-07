const request = require("supertest");
const { startTestServer, closeTestServer } = require("../utils/testUtils");
const app = require("../server");
const ProjectApplication = require("../models/projectApplicationModel");
const Project = require("../models/projectModel");

// Mocking the ProjectApplication model
jest.mock("../models/projectApplicationModel", () => ({
  create: jest.fn(),
}));

// Mocking the Project model
jest.mock("../models/projectModel", () => ({
  findById: jest.fn(),
}));

// Mock createNotification function
jest.mock("../controllers/api/v1/notificationsController.js", () => ({
  createNotification: jest.fn(),
}));

// getAllProjectApplications
describe("Project Applications Controller", () => {
  let server;

  // Start the test server before all tests
  beforeAll(async () => {
    server = await startTestServer(app);
  });

  // Close the test server after all tests
  afterAll(async () => {
    await closeTestServer(server);
  });

  // Test case to check if project applications are returned for a given project ID
  it("should return all project applications for a given project ID", async () => {
    // Mock project applications data
    const mockProjectApplications = [
      {
        applicationDate: new Date(),
        applicationStatus: "pending",
        notificationSeen: false,
        project: "mockProjectId", // Assuming this is a valid ObjectId
        vendor: "mockVendorId", // Assuming this is a valid ObjectId
      },
    ];

    // Mock the find method of the ProjectApplication model to resolve with mockProjectApplications
    ProjectApplication.find.mockResolvedValue(mockProjectApplications);

    // Make a GET request to the endpoint with a mock project ID
    const res = await request(server).get(
      "/api/v1/project-applications/mockProjectId"
    );

    // Expect the response status to be 200
    expect(res.status).toBe(200);

    // Expect the response data to match the mock project applications
    expect(res.body).toEqual(mockProjectApplications);
  });

  // Test case to check error handling and 500 status code
  it("should handle errors and return 500 status code", async () => {
    // Mock the find method of the ProjectApplication model to throw an error
    const errorMessage = "Database error";
    ProjectApplication.find.mockRejectedValue(new Error(errorMessage));

    // Make a GET request to the endpoint with a mock project ID
    const res = await request(server).get(
      "/api/v1/project-applications/mockProjectId"
    );

    // Expect the response status to be 500
    expect(res.status).toBe(500);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ error: errorMessage });
  });
});

// getAccepetedVendorApplications
describe("Project Applications Controller", () => {
  let server;

  // Start the test server before all tests
  beforeAll(async () => {
    server = await startTestServer(app);
  });

  // Close the test server after all tests
  afterAll(async () => {
    await closeTestServer(server);
  });

  // Test case to check if project application is created successfully
  it("should create project application and send notification", async () => {
    // Mock request body
    const requestBody = {
      applicationDate: new Date(),
      project: "mockProjectId",
      vendor: "mockVendorId",
      propertyManager: "mockPropertyManagerId",
    };

    // Mock project application data
    const mockProjectApplication = {
      _id: "mockProjectApplicationId",
      applicationDate: requestBody.applicationDate,
      applicationStatus: "pending",
      notificationSeen: false,
      project: requestBody.project,
      vendor: requestBody.vendor,
    };

    // Mock project data
    const mockProject = {
      name: "Mock Project Name",
    };

    // Mock ProjectApplication.create method
    ProjectApplication.create.mockResolvedValue(mockProjectApplication);

    // Mock Project.findById method
    Project.findById.mockResolvedValue(mockProject);

    // Make a POST request to create project application
    const res = await request(server)
      .post("/api/v1/project-applications")
      .send(requestBody);

    // Expect the response status to be 201
    expect(res.status).toBe(201);

    // Expect the response data to match the mock project application
    expect(res.body).toEqual(mockProjectApplication);

    // Expect ProjectApplication.create to have been called with the correct parameters
    expect(ProjectApplication.create).toHaveBeenCalledWith(requestBody);

    // Expect Project.findById to have been called with the correct project ID
    expect(Project.findById).toHaveBeenCalledWith(requestBody.project);

    // Expect createNotification to have been called with the correct notification data
    expect(createNotification).toHaveBeenCalledWith({
      sender: requestBody.vendor,
      senderType: "Vendor",
      recipient: requestBody.propertyManager,
      recipientType: "PropertyManager",
      notificationType: "PROJECT_APPLICATION_CREATED",
      message: "New project application created",
      data: {
        projectId: requestBody.project,
        projectName: mockProject.name,
      },
    });
  });

  // Test case to check error handling and 500 status code
  it("should handle errors and return 500 status code", async () => {
    // Mock request body
    const requestBody = {
      applicationDate: new Date(),
      project: "mockProjectId",
      vendor: "mockVendorId",
      propertyManager: "mockPropertyManagerId",
    };

    // Mock error message
    const errorMessage = "Database error";

    // Mock ProjectApplication.create method to throw an error
    ProjectApplication.create.mockRejectedValue(new Error(errorMessage));

    // Make a POST request to create project application
    const res = await request(server)
      .post("/api/v1/project-applications")
      .send(requestBody);

    // Expect the response status to be 500
    expect(res.status).toBe(500);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ message: errorMessage });

    // Expect ProjectApplication.create to have been called with the correct parameters
    expect(ProjectApplication.create).toHaveBeenCalledWith(requestBody);

    // Expect Project.findById not to have been called
    expect(Project.findById).not.toHaveBeenCalled();

    // Expect createNotification not to have been called
    expect(createNotification).not.toHaveBeenCalled();
  });
});

// createProjectApplication
describe("Project Applications Controller", () => {
  let server;

  // Start the test server before all tests
  beforeAll(async () => {
    server = await startTestServer(app);
  });

  // Close the test server after all tests
  afterAll(async () => {
    await closeTestServer(server);
  });

  // Test case to check if accepted vendor applications are returned for a given project ID
  it("should return accepted vendor applications for a given project ID", async () => {
    // Mock accepted vendor applications data
    const mockAcceptedVendorApplications = [
      {
        applicationDate: new Date(),
        applicationStatus: "accepted",
        notificationSeen: false,
        project: "mockProjectId", // Assuming this is a valid ObjectId
        vendor: "mockVendorId", // Assuming this is a valid ObjectId
      },
    ];

    // Mock the find method of the ProjectApplication model to resolve with mockAcceptedVendorApplications
    ProjectApplication.find.mockResolvedValue(mockAcceptedVendorApplications);

    // Make a GET request to the endpoint with a mock project ID
    const res = await request(server).get(
      "/api/v1/project-applications/accepted/mockProjectId"
    );

    // Expect the response status to be 200
    expect(res.status).toBe(200);

    // Expect the response data to match the mock accepted vendor applications
    expect(res.body).toEqual(mockAcceptedVendorApplications);
  });

  // Test case to check error handling and 500 status code
  it("should handle errors and return 500 status code", async () => {
    // Mock the find method of the ProjectApplication model to throw an error
    const errorMessage = "Database error";
    ProjectApplication.find.mockRejectedValue(new Error(errorMessage));

    // Make a GET request to the endpoint with a mock project ID
    const res = await request(server).get(
      "/api/v1/project-applications/accepted/mockProjectId"
    );

    // Expect the response status to be 500
    expect(res.status).toBe(500);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ error: errorMessage });
  });
});

// acceptApplication
describe('Project Applications Controller', () => {
  let server;

  // Start the test server before all tests
  beforeAll(async () => {
    server = await startTestServer(app);
  });

  // Close the test server after all tests
  afterAll(async () => {
    await closeTestServer(server);
  });

  // Test case to check if project application status is updated and notification is sent
  it('should update project application status to "accepted" and send notification', async () => {
    // Mock request body
    const requestBody = {
      projectApplicationId: 'mockProjectApplicationId',
    };

    // Mock project application data
    const mockProjectApplication = {
      _id: 'mockProjectApplicationId',
      applicationStatus: 'pending',
      project: {
        propertyManager: 'mockPropertyManagerId',
      },
      vendor: 'mockVendorId',
    };

    // Mock project data
    const mockProject = {
      name: 'Mock Project Name',
    };

    // Mock updated project application data
    const updatedProjectApplication = { ...mockProjectApplication, applicationStatus: 'accepted' };

    // Mock ProjectApplication.findById method
    ProjectApplication.findById.mockResolvedValue(mockProjectApplication);

    // Mock Project.findById method
    Project.findById.mockResolvedValue(mockProject);

    // Make a PUT request to update project application status
    const res = await request(server)
      .put('/api/v1/project-applications/accept')
      .send(requestBody);

    // Expect the response status to be 200
    expect(res.status).toBe(200);

    // Expect the response data to match the updated project application
    expect(res.body).toEqual(updatedProjectApplication);

    // Expect ProjectApplication.findById to have been called with the correct project application ID
    expect(ProjectApplication.findById).toHaveBeenCalledWith(requestBody.projectApplicationId);

    // Expect Project.findById to have been called with the correct project ID
    expect(Project.findById).toHaveBeenCalledWith(mockProjectApplication.project);

    // Expect createNotification to have been called with the correct notification data
    expect(createNotification).toHaveBeenCalledWith({
      sender: mockProjectApplication.project.propertyManager,
      senderType: 'PropertyManager',
      recipient: mockProjectApplication.vendor,
      recipientType: 'Vendor',
      notificationType: 'PROJECT_APPLICATION_ACCEPTED',
      message: 'Project application accepted',
      data: {
        projectId: mockProjectApplication.project,
        projectName: mockProject.name,
      },
    });
  });

  // Test case to check error handling and 500 status code
  it('should handle errors and return 500 status code', async () => {
    // Mock request body
    const requestBody = {
      projectApplicationId: 'mockProjectApplicationId',
    };

    // Mock error message
    const errorMessage = 'Database error';

    // Mock ProjectApplication.findById method to throw an error
    ProjectApplication.findById.mockRejectedValue(new Error(errorMessage));

    // Make a PUT request to update project application status
    const res = await request(server)
      .put('/api/v1/project-applications/accept')
      .send(requestBody);

    // Expect the response status to be 500
    expect(res.status).toBe(500);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ message: errorMessage });

    // Expect ProjectApplication.findById to have been called with the correct project application ID
    expect(ProjectApplication.findById).toHaveBeenCalledWith(requestBody.projectApplicationId);

    // Expect Project.findById not to have been called
    expect(Project.findById).not.toHaveBeenCalled();

    // Expect createNotification not to have been called
    expect(createNotification).not.toHaveBeenCalled();
  });
});

// rejectApplication
describe('Project Applications Controller', () => {
  let server;

  // Start the test server before all tests
  beforeAll(async () => {
    server = await startTestServer(app);
  });

  // Close the test server after all tests
  afterAll(async () => {
    await closeTestServer(server);
  });

  // Test case to check if project application status is updated to "rejected" and notification is sent
  it('should update project application status to "rejected" and send notification', async () => {
    // Mock request body
    const requestBody = {
      projectApplicationId: 'mockProjectApplicationId',
    };

    // Mock project application data
    const mockProjectApplication = {
      _id: 'mockProjectApplicationId',
      applicationStatus: 'pending',
      project: {
        propertyManager: 'mockPropertyManagerId',
      },
      vendor: 'mockVendorId',
    };

    // Mock project data
    const mockProject = {
      name: 'Mock Project Name',
    };

    // Mock updated project application data
    const updatedProjectApplication = { ...mockProjectApplication, applicationStatus: 'rejected' };

    // Mock ProjectApplication.findById method
    ProjectApplication.findById.mockResolvedValue(mockProjectApplication);

    // Mock Project.findById method
    Project.findById.mockResolvedValue(mockProject);

    // Make a PUT request to update project application status
    const res = await request(server)
      .put('/api/v1/project-applications/reject')
      .send(requestBody);

    // Expect the response status to be 200
    expect(res.status).toBe(200);

    // Expect the response data to match the updated project application
    expect(res.body).toEqual(updatedProjectApplication);

    // Expect ProjectApplication.findById to have been called with the correct project application ID
    expect(ProjectApplication.findById).toHaveBeenCalledWith(requestBody.projectApplicationId);

    // Expect Project.findById to have been called with the correct project ID
    expect(Project.findById).toHaveBeenCalledWith(mockProjectApplication.project);

    // Expect createNotification to have been called with the correct notification data
    expect(createNotification).toHaveBeenCalledWith({
      sender: mockProjectApplication.project.propertyManager,
      senderType: 'PropertyManager',
      recipient: mockProjectApplication.vendor,
      recipientType: 'Vendor',
      notificationType: 'PROJECT_APPLICATION_REJECTED',
      message: 'Project application rejected',
      data: {
        projectId: mockProjectApplication.project,
        projectName: mockProject.name,
      },
    });
  });

  // Test case to check error handling and 500 status code
  it('should handle errors and return 500 status code', async () => {
    // Mock request body
    const requestBody = {
      projectApplicationId: 'mockProjectApplicationId',
    };

    // Mock error message
    const errorMessage = 'Database error';

    // Mock ProjectApplication.findById method to throw an error
    ProjectApplication.findById.mockRejectedValue(new Error(errorMessage));

    // Make a PUT request to update project application status
    const res = await request(server)
      .put('/api/v1/project-applications/reject')
      .send(requestBody);

    // Expect the response status to be 500
    expect(res.status).toBe(500);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ message: errorMessage });

    // Expect ProjectApplication.findById to have been called with the correct project application ID
    expect(ProjectApplication.findById).toHaveBeenCalledWith(requestBody.projectApplicationId);

    // Expect Project.findById not to have been called
    expect(Project.findById).not.toHaveBeenCalled();

    // Expect createNotification not to have been called
    expect(createNotification).not.toHaveBeenCalled();
  });
});
