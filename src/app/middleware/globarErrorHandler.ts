import { ErrorRequestHandler } from 'express'
import config from '../../config'
import handleValidationError from '../errors/handleValidationError'
import { IGenericErrorMessage } from '../interfaces/error'
import handleCastError from '../errors/handleCastError'
import ApiError from '../errors/ApiError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500
  let message = 'something went wrong'
  let errorMessages: IGenericErrorMessage[] = []

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err?.name == 'CastError') {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorMessages = simplifiedError?.errorMessages
  } else if (err instanceof ApiError) {
    //console.log('hei i am from ApiError class error')
    statusCode = err.statusCode
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }
  {
    res.status(statusCode).json({
      success: false,
      message,
      errorMessages,

      stack: config.env !== 'production' ? err?.stack : undefined,
    })
    next()
  }
}

export default globalErrorHandler

// else if (err instanceof Error) {
//     console.log('hei i am from Error class error')
//     console.log('error message line 29', err?.message)
//     message = err?.message

//     errorMessages = err?.message
//       ? [
//           {
//             path: '',
//             message: err?.message,
//           },
//         ]
//       : []
//   }
