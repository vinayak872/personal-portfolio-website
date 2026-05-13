import mongoose from 'mongoose'

// Contact Message Schema
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    message: {
      type: String,
      required: true,
      maxlength: 5000
    },
    read: {
      type: Boolean,
      default: false
    },
    replied: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

export const Contact = mongoose.model('Contact', contactSchema)
