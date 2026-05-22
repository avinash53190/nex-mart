const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGO_URI || '',
  jwtSecret: process.env.JWT_SECRET || '',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  corsOrigins: (process.env.CORS_ORIGINS || process.env.CLIENT_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
}

const validateEnv = () => {
  if (!env.mongoUri) {
    throw new Error('MONGO_URI is required')
  }
  if (!env.jwtSecret) {
    throw new Error('JWT_SECRET is required')
  }
  return env
}

module.exports = { env, validateEnv }
