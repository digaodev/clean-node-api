import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

const BCRYPT_SALT = 10
const BCRYPT_HASH = '$2b$08$6ydDrgCEjFVIL8n61EAZUutUfIoZdxfPe2'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve(BCRYPT_HASH))
  }
}))

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(BCRYPT_SALT)
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    const anyValue = 'any_value'

    await sut.encrypt(anyValue)

    expect(hashSpy).toHaveBeenCalledWith(anyValue, BCRYPT_SALT)
  })

  test('Should return a hash on success', async () => {
    const sut = makeSut()
    const anyValue = 'any_value'

    const hash = await sut.encrypt(anyValue)

    expect(hash).toBe(BCRYPT_HASH)
  })
})
