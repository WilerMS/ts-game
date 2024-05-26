import { type Request, type Response, type NextFunction } from 'express'

import { ApiError, ConflictError, UnauthorizedError } from '@/errors'
import { NotNullViolationError, UniqueViolationError, ValidationError } from 'objection'
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken'

export const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log({ err })
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({
        error: err.name,
        message: err.message,
        details: err.details
      })
  }

  if (err instanceof ValidationError) {
    res.status(400).json({
      error: ValidationError.name,
      message: err.message,
      details: err.data
    })
  }

  if (err instanceof UniqueViolationError) {
    return res.status(409).json({
      error: ConflictError.name,
      message: 'A record with the same value already exists.',
      details: err.columns
    })
  }

  if (err instanceof NotNullViolationError) {
    return res.status(400).json({
      error: NotNullViolationError.name,
      message: err.message,
      details: err.column
    })
  }

  if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError) {
    return res.status(401).json({
      error: UnauthorizedError.name,
      message: 'You are not authorized to access this data. Please, log in',
      details: {}
    })
  }

  res
    .status(500)
    .json({
      error: 'InternalServerError',
      message: 'Something went wrong!'
    })
}
