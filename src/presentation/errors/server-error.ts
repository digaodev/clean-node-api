export class ServerError extends Error {
  constructor () {
    super('Oops! An unexpected error occurred. Try again later.')
    this.name = 'ServerError'
  }
}
