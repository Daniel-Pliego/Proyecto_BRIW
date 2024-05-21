require('dotenv').config();
process.env.CRAWLER_API_URL = 'http://localhost:8000';
// jest.setup.js
const fetchMock = require('jest-fetch-mock');

fetchMock.enableMocks();
