require('dotenv').config()

const app = require('./src/app')
const connectDB = require('./src/config/db')
const { env, validateEnv } = require('./src/config/env')
const { ensureSeedProducts } = require('./src/services/productService')
const { ensureSeedUsers } = require('./src/services/authService')

const startServer = async () => {
  validateEnv()
  await connectDB()
  await ensureSeedUsers()
  await ensureSeedProducts()

  app.listen(env.port, () => {
    console.log(`Server running in ${env.nodeEnv} mode on port ${env.port}`)
  })
}

startServer().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
