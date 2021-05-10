export class MissingParamError implements Error {
  name: string
  message: string
  stack?: string

  constructor (paramName: string) {
    this.name = 'MissingParamError'
    this.message = `Missing param: ${paramName}`
  }
}
