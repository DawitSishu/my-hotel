const request = require('supertest');
const app = require('express')();

app.get('/', (req, res) => {
  res.json({ hi: 'hi' });
});

describe('GET /', () => {
  it('should respond with a JSON object containing "hi"', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ hi: 'hi' });
  });
});