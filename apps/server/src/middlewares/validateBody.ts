import Ajv from 'ajv'
import { type RequestHandler } from 'express'
import { type JSONSchema } from 'objection'

import { ValidationError } from '@/errors'
import { errorHandler } from '@/utils'

const ajv = new Ajv()

export const validateBody = (schema: JSONSchema): RequestHandler => {
  return errorHandler((req, _, next) => {
    const valid = ajv.validate(schema, req.body)

    if (!valid) {
      const errorArr = ajv.errors?.map(error => error.message)
      const error = errorArr?.join(', ')
      throw new ValidationError(error, ajv.errors as object)
    }

    next()
  })
}
