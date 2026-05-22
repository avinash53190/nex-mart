const asyncHandler = require('../utils/asyncHandler')
const { sendSuccess } = require('../utils/response')
const { HTTP_STATUS } = require('../constants')
const { getProductById, listProducts } = require('../services/productService')

const getProducts = asyncHandler(async (req, res) => {
  const result = await listProducts(req.productQuery || req.query)
  return sendSuccess(res, result, 'Products fetched', HTTP_STATUS.OK)
})

const getProduct = asyncHandler(async (req, res) => {
  const product = await getProductById(req.params.id)
  return sendSuccess(res, product, 'Product fetched', HTTP_STATUS.OK)
})

module.exports = {
  getProducts,
  getProduct,
}
