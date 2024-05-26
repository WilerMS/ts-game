export abstract class ApiError extends Error {
  status: number
  details?: object | string

  constructor (
    status: number,
    message: string,
    name: string,
    details?: object | string
  ) {
    super(message)
    this.name = name
    this.status = status
    this.details = details
  }
}
