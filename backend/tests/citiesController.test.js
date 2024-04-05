const request = require('supertest');
const { startTestServer, closeTestServer } = require('../utils/testUtils');
const app = require('../server'); // Import your app instance

describe('Cities Controller', () => {
  let server;

  // Start the test server before all tests
  beforeAll(async () => {
    server = await startTestServer(app);
  });

  // Close the test server after all tests
  afterAll(async () => {
    await closeTestServer(server);
  });

  // Test the GET /api/v1/cities route
  describe('GET /api/v1/cities', () => {
    it('should return status 200 and list of cities', async () => {
      // Send a GET request to the specified route
      const response = await request(server).get('/api/v1/cities');

      // Check if the response status is 200 (OK)
      expect(response.status).toBe(200);

      // Check if the response body is an array (list of cities)
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
