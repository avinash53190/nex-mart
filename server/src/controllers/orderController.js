const asyncHandler = require('../utils/asyncHandler')
const { sendSuccess } = require('../utils/response')
const { getOrdersBlueprint } = require('../services/orderService')
const { HTTP_STATUS } = require('../constants')

const listOrders = asyncHandler(async (req, res) => {
  return sendSuccess(res, getOrdersBlueprint(), 'Orders API scaffold ready', HTTP_STATUS.OK)
})

const createOrder = asyncHandler(async (req, res) => {
  return sendSuccess(res, getOrdersBlueprint(), 'Order creation scaffold ready', HTTP_STATUS.OK)
})

module.exports = {
  listOrders,
  createOrder,
}
