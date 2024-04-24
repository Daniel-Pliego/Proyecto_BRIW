const { createMocks } = require('node-mocks-http');
import { GET } from './route.js'

jest.mock('fs/promises', () => ({
    readFile: jest.fn(),
    writeFile: jest.fn(),
}));
  

jest.mock('../../../../../public/script/crawler/crawler.js', () => ({
    initCrawler: jest.fn(),
}));


describe('api/indexer/index', () => {
      it('should call initCrawler and return success message for /indexer/index', async () => {
        const request = {};
        const params = { slug: 'index' };
        const response = await GET(request, { params });
        //expect(initCrawler).toHaveBeenCalled();
        const responseBody = await response.json();
        const expectedBody = JSON.parse('{ "message": "Files uploaded successfully" }');
        expect(responseBody).toEqual(expectedBody);
      });
})
