const express = require('express')
const { getProducts, getProduct } = require('../controllers/productController')
const { validateMongoIdParam } = require('../middleware/validationMiddleware')
const { validateProductQuery } = require('../validators/productValidators')

const router = express.Router()

router.get('/', validateProductQuery, getProducts)
router.get('/:id', validateMongoIdParam('id'), getProduct)

module.exports = router
