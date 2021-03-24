import validator from 'validator'

import { EmailValidatorAdapter } from './email-validator-adapter'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    const isValid = sut.isValid('invalidemail@mail.com')

    expect(isValid).toBe(false)
  })

  test('Should return false if validator returns false', () => {
    const sut = makeSut()

    const isValid = sut.isValid('validemail@mail.com')

    expect(isValid).toBe(true)
  })

  test('Should call validator with correct email', () => {
    const sut = makeSut()
    const anyEmail = 'any_email@mail.com'
    const isEmailSpy = jest.spyOn(validator, 'isEmail')

    sut.isValid(anyEmail)

    expect(isEmailSpy).toHaveBeenCalledWith(anyEmail)
  })
})
