import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const salt = 8
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    const anyValue = 'any_value'

    await sut.encrypt(anyValue)

    expect(hashSpy).toHaveBeenCalledWith(anyValue, salt)
  })
})
