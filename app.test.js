const app = require('./app.js');
const supertest = require('supertest');
const request = supertest(app)

it('Gets the test endpoint and returns a 200 status', async done => {
  const res = await request.get('/about-page/index.md')
  expect(res.status).toBe(200)
  done()
})

/*Test not currently working. As requests are asynchronous, I need to refactor app.js from the callback
style, to promises and then to the asynchronous style
*/