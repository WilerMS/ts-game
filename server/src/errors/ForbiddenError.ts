import { ApiError } from './ApiError'

export default class ForbiddenError extends ApiError {
  constructor (message: string = 'Forbidden') {
    super(403, message, 'Forbidden')
  }
}
