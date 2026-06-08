import { useState, useEffect } from 'react'
import { blogAPI } from '../services/api'
import '../styles/blog.css'

/**
 * Blog Page Component
 * Displays list of blog posts
 */
export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)

        const response = await blogAPI.getAll()

        console.log('Blog API Response:', response.data)

        // IMPORTANT FIX
        setPosts(response.data.data)

        setError(null)
      } catch (err) {
        setError('Failed to fetch blog posts.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <main className="blog">
      <section className="blog-section">
        <div className="container">
          <h1 className="section-title">Blog</h1>

          {loading && (
            <div className="loading">
              Loading blog posts...
            </div>
          )}

          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="blog-grid">
              {posts.map((post) => (
                <article key={post._id} className="blog-card">
                  <h2 className="blog-title">
                    {post.title}
                  </h2>

                  <p className="blog-meta">
                    {new Date(
                      post.createdAt
                    ).toLocaleDateString()}
                  </p>

                  <p className="blog-excerpt">
                    {post.excerpt}
                  </p>

                  <a
                    href={`/blog/${post._id}`}
                    className="read-more"
                  >
                    Read More →
                  </a>
                </article>
              ))}
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="no-posts">
              <p>No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}