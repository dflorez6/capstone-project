const request = require('supertest');
const { startTestServer, closeTestServer } = require('../utils/testUtils');
const app = require('../server');
const Notification = require('../models/notificationModel');

// Mocking the Notification model
jest.mock('../models/notificationModel', () => ({
  findById: jest.fn(),
  deleteOne: jest.fn(),
}));

describe('Notifications Controller', () => {
  let server;

  // Start the test server before all tests
  beforeAll(async () => {
    server = await startTestServer(app);
  });

  // Close the test server after all tests
  afterAll(async () => {
    await closeTestServer(server);
  });

  // Test case to delete notification successfully
  it('should delete notification successfully', async () => {
    // Mock Notification.findById method to return a mock notification
    const mockNotification = { _id: 'notificationId' };
    Notification.findById.mockResolvedValueOnce(mockNotification);

    // Make a DELETE request to delete notification
    const res = await request(server).delete('/api/v1/notifications/propertyManager/PropertyManagerID/notificationId');

    // Expect the response status to be 200
    expect(res.status).toBe(200);

    // Expect the Notification.deleteOne method to be called
    expect(Notification.deleteOne).toHaveBeenCalledWith({ _id: 'notificationId' });

    // Expect the response data to contain the success message
    expect(res.body).toEqual({ message: 'Property manager notification deleted successfully' });
  });

  // Test case to handle notification not found
  it('should handle notification not found', async () => {
    // Mock Notification.findById method to return null
    Notification.findById.mockResolvedValueOnce(null);

    // Make a DELETE request to delete notification
    const res = await request(server).delete('/api/v1/notifications/propertyManager/PropertyManagerID/notificationId');

    // Expect the response status to be 404
    expect(res.status).toBe(404);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ message: 'Notification not found' });
  });

  // Test case to handle unauthorized access
  it('should handle unauthorized access', async () => {
    // Mock Notification.findById method to return a mock notification
    const mockNotification = { _id: 'notificationId' };
    Notification.findById.mockResolvedValueOnce(mockNotification);

    // Make a DELETE request with a different property manager ID
    const res = await request(server).delete('/api/v1/notifications/propertyManager/OtherPropertyManagerID/notificationId');

    // Expect the response status to be 401
    expect(res.status).toBe(401);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ message: 'Not authorized.' });
  });

  // Test case to handle errors and return 500 status code
  it('should handle errors and return 500 status code', async () => {
    // Mock Notification.findById method to throw an error
    Notification.findById.mockRejectedValueOnce(new Error('Database error'));

    // Make a DELETE request to delete notification
    const res = await request(server).delete('/api/v1/notifications/propertyManager/PropertyManagerID/notificationId');

    // Expect the response status to be 500
    expect(res.status).toBe(500);

    // Expect the response data to contain the error message
    expect(res.body).toEqual({ message: 'Database error' });
  });
});
