const express = require('express')
const { register, login, me } = require('../controllers/authController')
const { protect } = require('../middleware/authMiddleware')
const { validateAuthPayload } = require('../validators/authValidators')

const router = express.Router()

router.post('/register', validateAuthPayload(['name', 'email', 'password']), register)
router.post('/login', validateAuthPayload(['email', 'password']), login)
router.get('/me', protect, me)

module.exports = router
