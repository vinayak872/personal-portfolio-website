import { Blog } from '../models/Blog.js'

/**
 * Blog Controller
 * Handles all blog CRUD operations
 */

// Get all blogs
export const getAllBlogs = async (req, res, next) => {
  try {
    const { published = true, limit = 10, skip = 0 } = req.query

    const query = published !== 'false' ? { published: true } : {}
    
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip))

    const total = await Blog.countDocuments(query)

    res.json({
      success: true,
      data: blogs,
      pagination: {
        total,
        limit: parseInt(limit),
        skip: parseInt(skip)
      }
    })
  } catch (error) {
    next(error)
  }
}

// Get single blog by ID
export const getBlogById = async (req, res, next) => {
  try {
    const { id } = req.params
    
    const blog = await Blog.findById(id)
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    }

    // Increment views
    blog.views += 1
    await blog.save()

    res.json({
      success: true,
      data: blog
    })
  } catch (error) {
    next(error)
  }
}

// Get blog by slug
export const getBlogBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params
    
    const blog = await Blog.findOne({ slug, published: true })
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    }

    // Increment views
    blog.views += 1
    await blog.save()

    res.json({
      success: true,
      data: blog
    })
  } catch (error) {
    next(error)
  }
}

// Create new blog
export const createBlog = async (req, res, next) => {
  try {
    const { title, excerpt, content, category, tags, published } = req.body

    // Check if title already exists
    const existingBlog = await Blog.findOne({ title })
    if (existingBlog) {
      return res.status(400).json({
        success: false,
        message: 'A blog with this title already exists'
      })
    }

    const blog = new Blog({
      title,
      excerpt,
      content,
      category,
      tags: tags || [],
      published: published || false
    })

    await blog.save()

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog
    })
  } catch (error) {
    next(error)
  }
}

// Update blog
export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, excerpt, content, category, tags, published } = req.body

    const blog = await Blog.findById(id)
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    }

    // Check if new title conflicts with another blog
    if (title !== blog.title) {
      const existingBlog = await Blog.findOne({ title })
      if (existingBlog) {
        return res.status(400).json({
          success: false,
          message: 'A blog with this title already exists'
        })
      }
    }

    blog.title = title || blog.title
    blog.excerpt = excerpt || blog.excerpt
    blog.content = content || blog.content
    blog.category = category || blog.category
    blog.tags = tags || blog.tags
    blog.published = published !== undefined ? published : blog.published

    await blog.save()

    res.json({
      success: true,
      message: 'Blog updated successfully',
      data: blog
    })
  } catch (error) {
    next(error)
  }
}

// Delete blog
export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params

    const blog = await Blog.findByIdAndDelete(id)
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    }

    res.json({
      success: true,
      message: 'Blog deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}
