const express = require('express')
const cors = require('cors')

const apiRoutes = require('./routes')
const { env } = require('./config/env')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const createCorsOptions = require('./config/corsOptions')

const app = express()

app.use(cors(createCorsOptions(env.corsOrigins)))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({
    message: 'Nex-Mart API is running',
    environment: env.nodeEnv,
  })
})

app.use('/api', apiRoutes)

app.use(notFound)
app.use(errorHandler)

module.exports = app
