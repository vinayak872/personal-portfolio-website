import mongoose from 'mongoose'

// Blog Post Schema
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },
    excerpt: {
      type: String,
      required: true,
      maxlength: 500
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      default: 'Admin'
    },
    category: {
      type: String,
      default: 'General',
      trim: true
    },
    tags: [String],
    published: {
      type: Boolean,
      default: false
    },
    views: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt
  }
)

// Create slug from title before saving
blogSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }
  next()
})

export const Blog = mongoose.model('Blog', blogSchema)
