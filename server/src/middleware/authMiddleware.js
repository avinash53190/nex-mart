const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const AppError = require('../utils/AppError')
const { env } = require('../config/env')

const protect = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(new AppError('Not authorized, no token', 401))
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret)
    const user = await User.findById(decoded.id)

    if (!user) {
      return next(new AppError('Not authorized, user not found', 401))
    }

    req.user = user
    return next()
  } catch (error) {
    return next(new AppError('Not authorized, token failed', 401))
  }
}

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next()
  }

  return next(new AppError('Not authorized as an admin', 403))
}

module.exports = { protect, admin }
