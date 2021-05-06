export class ServerError extends Error {
  constructor (stack: string) {
    super('Oops! An unexpected error occurred. Try again later.')
    this.name = 'ServerError'
    this.stack = stack
  }
}
