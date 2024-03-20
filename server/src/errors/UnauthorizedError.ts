import { ApiError } from './ApiError'

export default class UnauthorizedError extends ApiError {
  constructor (message: string = 'Unauthorized') {
    super(401, message, 'Unauthorized')
  }
}
