const app = require('./server');
const supertest = require('supertest');
const request = supertest(app);

app.get('/test', async (req, res) => {
  res.json({ message: 'pass!' });
});

it('Gets the /test endpoint', async (done) => {
  const res = await request.get('/test');

  expect(res.status).toBe(200);
  expect(res.body.message).toBe('pass!');
  done();
});

// it('is an asyncronous test', async (done) => {
//   // something

//   done();
// });
