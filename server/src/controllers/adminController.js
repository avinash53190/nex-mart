const asyncHandler = require('../utils/asyncHandler')
const { sendSuccess } = require('../utils/response')
const { getAdminBlueprint } = require('../services/adminService')
const { HTTP_STATUS } = require('../constants')

const getDashboard = asyncHandler(async (req, res) => {
  return sendSuccess(res, getAdminBlueprint(), 'Admin dashboard scaffold ready', HTTP_STATUS.OK)
})

module.exports = { getDashboard }
