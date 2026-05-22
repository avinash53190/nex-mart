const express = require('express')
const { listOrders, createOrder } = require('../controllers/orderController')
const { validateRequiredFields } = require('../middleware/validationMiddleware')

const router = express.Router()

router.get('/', listOrders)
router.post('/', validateRequiredFields(['items', 'total']), createOrder)

module.exports = router
