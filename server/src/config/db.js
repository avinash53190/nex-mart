const mongoose = require('mongoose')
const { env } = require('./env')

const connectDB = async () => {
  mongoose.set('strictQuery', true)

  if (!env.mongoUri) {
    throw new Error('MONGO_URI is required')
  }

  const conn = await mongoose.connect(env.mongoUri)
  console.log(`MongoDB Connected: ${conn.connection.host}`)
  return conn
}

module.exports = connectDB
