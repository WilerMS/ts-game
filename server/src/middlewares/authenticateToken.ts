import { type Response, type NextFunction, type RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

import { User } from '@/models/User'
import { JWT_SECRET } from '@/constants/env'
import { UnauthorizedError } from '@/errors'

import { type AuthenticatedRequest } from '@/types'
import { errorHandler } from '@/utils'

export const authenticateToken: RequestHandler = errorHandler(async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1] || ''
  if (!token) {
    throw new UnauthorizedError('Must provide an access token to request this data')
  }

  const verify = jwt.verify(token, JWT_SECRET)

  // @ts-expect-error
  const user = await User.query().findById(verify.id)
  if (!user) {
    throw new UnauthorizedError('Invalid token')
  }

  req.auth = {
    ...req.auth,
    user: user.toResponse()
  }

  next()
})
