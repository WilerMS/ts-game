import { ApiError } from './ApiError'

export default class InternalServerError extends ApiError {
  constructor (message: string = 'Internal server error') {
    super(500, message, 'InternalServerError')
  }
}
