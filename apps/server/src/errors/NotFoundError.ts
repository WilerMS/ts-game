import { ApiError } from './ApiError'

export default class NotFoundError extends ApiError {
  constructor (message: string = 'Not found') {
    super(404, message, 'NotFound')
  }
}
