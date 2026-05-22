const mongoose = require('mongoose')

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0

const hasRequiredFields = (payload, fields = []) =>
  fields.every((field) => {
    const value = payload?.[field]
    if (value === undefined || value === null) return false
    if (typeof value === 'string') return value.trim().length > 0
    if (Array.isArray(value)) return value.length > 0
    return true
  })

const isValidMongoId = (value) => mongoose.Types.ObjectId.isValid(value)

module.exports = {
  isNonEmptyString,
  hasRequiredFields,
  isValidMongoId,
}
