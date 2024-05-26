import { ApiError } from './ApiError'

export default class ValidationError extends ApiError {
  constructor (message: string = 'Validation error', details: object | string = {}) {
    super(400, message, 'ValidationError', details)
  }
}
