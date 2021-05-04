import request from 'supertest'

import app from '../config/app'

describe('Signup Routes', () => {
  test('should return an account on success', async () => {
    const credentials = {
      name: 'any_user',
      email: 'any_email@email.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }

    await request(app)
      .post('/api/signup')
      .send(credentials)
      .expect(200)
  })
})
