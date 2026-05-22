const AppError = require('../utils/AppError')
const { hasRequiredFields } = require('./commonValidators')

const isValidEmail = (email) =>
  typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const validateAuthPayload = (fields) => (req, res, next) => {
  try {
    if (!hasRequiredFields(req.body, fields)) {
      throw new AppError(`Missing required fields: ${fields.join(', ')}`, 400)
    }

    const { email, password } = req.body
    if (email && !isValidEmail(email)) {
      throw new AppError('Invalid email format', 400)
    }

    if (typeof password === 'string' && password.length < 6) {
      throw new AppError('Password must be at least 6 characters', 400)
    }

    return next()
  } catch (error) {
    return next(error)
  }
}

module.exports = { validateAuthPayload }
