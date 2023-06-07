import mongoose from 'mongoose'
import { IErrorMessage } from '../interfaces/error'

const handleValidationError = (
  err: mongoose.Error.ValidationError | mongoose.Error.CastError
) => {
  let errors: IErrorMessage[] = []

  if (err instanceof mongoose.Error.ValidationError) {
    errors = Object.values(err.errors).map(el => {
      return {
        path: el?.path,
        message: el?.message,
      }
    })
  } else if (err instanceof mongoose.Error.CastError) {
    errors = [
      {
        path: err?.path,
        message: err?.message,
      },
    ]
  }

  // Handle the errors or return them as needed
  // ...

  // Example: Returning the errors
  return errors
}

export default handleValidationError
