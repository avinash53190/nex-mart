const createCorsOptions = (allowedOrigins = []) => ({
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`))
  },
  credentials: true,
  optionsSuccessStatus: 200,
})

module.exports = createCorsOptions
