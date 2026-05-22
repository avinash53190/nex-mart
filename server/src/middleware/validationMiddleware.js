const AppError = require('../utils/AppError')
const { hasRequiredFields, isValidMongoId } = require('../validators')

const validateRequiredFields = (fields) => (req, res, next) => {
  if (!hasRequiredFields(req.body, fields)) {
    return next(new AppError(`Missing required fields: ${fields.join(', ')}`, 400))
  }

  return next()
}

const validateMongoIdParam = (paramName = 'id') => (req, res, next) => {
  if (!isValidMongoId(req.params[paramName])) {
    return next(new AppError(`Invalid ${paramName}`, 400))
  }

  return next()
}

module.exports = {
  validateRequiredFields,
  validateMongoIdParam,
}
