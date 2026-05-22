const express = require('express')
const healthRoutes = require('./healthRoutes')
const productRoutes = require('./productRoutes')
const authRoutes = require('./authRoutes')
const orderRoutes = require('./orderRoutes')
const adminRoutes = require('./adminRoutes')

const router = express.Router()

router.use('/health', healthRoutes)
router.use('/products', productRoutes)
router.use('/auth', authRoutes)
router.use('/orders', orderRoutes)
router.use('/admin', adminRoutes)

module.exports = router
