const asyncHandler = require('../utils/asyncHandler')
const { sendSuccess } = require('../utils/response')
const { getHealthPayload } = require('../services/healthService')
const { HTTP_STATUS } = require('../constants')

const getHealth = asyncHandler(async (req, res) => {
  return sendSuccess(res, getHealthPayload(), 'Health check passed', HTTP_STATUS.OK)
})

module.exports = { getHealth }
