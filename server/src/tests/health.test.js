import { describe, expect, it } from 'vitest';
import request from 'supertest';

process.env.MONGODB_URI ||= 'mongodb://127.0.0.1:27017/jobportal-test';
process.env.JWT_ACCESS_SECRET ||= 'test-access-secret-that-is-long-enough';
process.env.JWT_REFRESH_SECRET ||= 'test-refresh-secret-that-is-long-enough';

const { default: app } = await import('../app.js');

describe('health endpoint', () => {
  it('returns ok', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});
