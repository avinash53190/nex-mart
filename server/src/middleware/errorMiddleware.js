const { HTTP_STATUS } = require('../constants')

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(HTTP_STATUS.NOT_FOUND)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode
    || (res.statusCode && res.statusCode !== HTTP_STATUS.OK ? res.statusCode : HTTP_STATUS.INTERNAL_SERVER_ERROR)
  let message = err.message || 'Internal Server Error'

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = HTTP_STATUS.NOT_FOUND
    message = 'Resource not found'
  }

  if (err.name === 'ValidationError') {
    statusCode = HTTP_STATUS.BAD_REQUEST
    message = Object.values(err.errors)
      .map((entry) => entry.message)
      .join(', ')
  }

  if (err.code === 11000) {
    statusCode = HTTP_STATUS.BAD_REQUEST
    message = 'Duplicate resource'
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

module.exports = { notFound, errorHandler }
