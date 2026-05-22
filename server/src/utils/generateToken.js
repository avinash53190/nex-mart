const jwt = require('jsonwebtoken')
const { env } = require('../config/env')

const generateToken = (id) =>
  jwt.sign({ id }, env.jwtSecret, {
    expiresIn: '30d',
  })

module.exports = generateToken
