const asyncHandler = require('../utils/asyncHandler')
const { sendSuccess } = require('../utils/response')
const { HTTP_STATUS } = require('../constants')
const { loginUser, registerUser, getCurrentUser } = require('../services/authService')

const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body)
  return sendSuccess(res, result, 'User registered', HTTP_STATUS.CREATED)
})

const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body)
  return sendSuccess(res, result, 'Login successful', HTTP_STATUS.OK)
})

const me = asyncHandler(async (req, res) => {
  const user = getCurrentUser(req.user)
  return sendSuccess(res, user, 'Current user loaded', HTTP_STATUS.OK)
})

module.exports = {
  register,
  login,
  me,
}
