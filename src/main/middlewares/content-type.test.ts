import request from 'supertest'

import app from '../config/app'

describe('Content-Type Middleware', () => {
  test('should enable Content-Type JSON as default', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send('')
    })

    await request(app)
      .get('/test_content_type')
      .send()
      .expect('Content-Type', /json/)
  })

  test('should enable Content-Type XML when forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send('')
    })

    await request(app)
      .get('/test_content_type_xml')
      .send()
      .expect('Content-Type', /xml/)
  })
})
