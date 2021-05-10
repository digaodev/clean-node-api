export class ServerError implements Error {
  name: string
  message: string
  stack?: string

  constructor (stack: string) {
    this.name = 'ServerError'
    this.message = 'Oops! An unexpected error occurred. Try again later.'
    this.stack = stack
  }
}
