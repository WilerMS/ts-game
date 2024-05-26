import { ApiError } from './ApiError'

export default class ConflictError extends ApiError {
  constructor (message: string = '409 ConflictError', details: object | string = {}) {
    super(409, message, 'ConflictError', details)
  }
}
