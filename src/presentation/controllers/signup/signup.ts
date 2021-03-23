import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse,
  AddAccount
} from './signup-protocols'
import { badRequest, serverError } from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError } from '../../errors'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount) {
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    try {
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = this.addAccount.add({ name, email, password })

      return { statusCode: 200, body: account }
    } catch (error) {
      return serverError()
    }
  }
}