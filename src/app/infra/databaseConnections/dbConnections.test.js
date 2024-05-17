// dbConnection.test.js

import { db } from './dbConnection';

describe('Database Connection', () => {
  it('should establish a connection with the database', async () => {
    try {
      const results = await db.query('SELECT 1+1 AS solution');
      expect(results).toBeDefined();
    } catch (error) {
      throw new Error('Failed to establish database connection');
    } finally {
      await db.end();
    }
  });
});
