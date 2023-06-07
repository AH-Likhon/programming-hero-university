import { NextFunction, Request, Response } from 'express'
import { IErrorMessage } from '../../interfaces/error'
import config from '../../config'
// import handleValidationError from '../../errors/handleValidationError'

const globalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = 500
  const message = 'Something went wrong!'
  const errorMessage: IErrorMessage[] = []

  if (err?.name) {
    // const simplifiedError = handleValidationError(err)
    // console.log(simplifiedError)
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })
  next()
}

export default globalErrorHandler
