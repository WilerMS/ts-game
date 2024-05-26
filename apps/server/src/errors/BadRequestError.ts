import { ApiError } from './ApiError'

export default class BadRequestError extends ApiError {
  constructor (message: string = 'Bad Request', details: object | string = {}) {
    super(400, message, 'BadRequest', details)
  }
}
