const User = require('../models/userModel')
const AppError = require('../utils/AppError')
const generateToken = require('../utils/generateToken')
const seedUsers = require('../data/userSeeds')

const toPublicUser = (user) => ({
  id: user.id || user._id?.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
})

const registerUser = async ({ name, email, password }) => {
  const normalizedEmail = email.trim().toLowerCase()
  const existingUser = await User.findOne({ email: normalizedEmail })
  if (existingUser) {
    throw new AppError('Email already exists', 400)
  }

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: 'user',
  })

  return {
    user: toPublicUser(user),
    token: generateToken(user._id),
  }
}

const loginUser = async ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase()
  const user = await User.findOne({ email: normalizedEmail }).select('+password')

  if (!user) {
    throw new AppError('Invalid email or password', 401)
  }

  const passwordMatches = await user.matchPassword(password)
  if (!passwordMatches) {
    throw new AppError('Invalid email or password', 401)
  }

  return {
    user: toPublicUser(user),
    token: generateToken(user._id),
  }
}

const getCurrentUser = (user) => {
  if (!user) {
    throw new AppError('Not authorized', 401)
  }

  return toPublicUser(user)
}

const ensureSeedUsers = async () => {
  const count = await User.countDocuments()
  if (count > 0) return

  for (const seedUser of seedUsers) {
    await User.create(seedUser)
  }
}

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  toPublicUser,
  ensureSeedUsers,
}
