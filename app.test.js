const app = require('./app.js')
const supertest = require('supertest')
const request = supertest(app)

it('Gets the test endpoint and returns the correct status code', async done => {
  const validResponse = await request.get('/valves')
  expect(validResponse.status).toBe(200)
  const invalidResponse = await request.get('/another-page')
  expect(invalidResponse.status).toBe(404)
  done()
})

/*Tests are currently dependent on the sub folders within the content folder.
  To make this work, I would need to create a factory function within app.js that accepts a path
  argument to the content folder. In my test file, I would need to call the factory function with a path
  to a new content-test folder, which would never change. This would keep my test seperate from the
  implementation. I couldn't quite get a factory function to work when I tried it.
  */