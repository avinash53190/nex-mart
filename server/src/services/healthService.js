const getHealthPayload = () => ({
  uptime: process.uptime(),
  timestamp: new Date().toISOString(),
  status: 'ok',
})

module.exports = { getHealthPayload }
