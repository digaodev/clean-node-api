import request from 'supertest'

import app from '../config/app'

describe('Body Parser Middleware', () => {
  test('should parse the body of the request as JSON', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/test_body_parser')
      .send({ name: 'John' })
      .expect({ name: 'John' })
  })
})
