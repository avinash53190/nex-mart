const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
  {
    userId: { type: String, default: '' },
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { _id: false }
)

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      min: 0,
      default: null,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    images: {
      type: [String],
      required: true,
      validate: [(images) => Array.isArray(images) && images.length > 0, 'At least one image is required'],
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: {
      type: Number,
      min: 0,
      default: 0,
    },
    reviewList: {
      type: [reviewSchema],
      default: [],
    },
    vendor: {
      type: String,
      trim: true,
      default: 'Nex-Mart',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

productSchema.index({ title: 'text', description: 'text', category: 'text', vendor: 'text' })
productSchema.index({ category: 1, price: 1, rating: -1, createdAt: -1 })

productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    return ret
  },
})

module.exports = mongoose.model('Product', productSchema)
