import { useState, useEffect } from 'react'
import { githubAPI } from '../services/api'
import '../styles/projects.css'

/**
 * Projects Page Component
 * Fetches and displays GitHub repositories
 */
export default function Projects() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true)
        const response = await githubAPI.getRepos()
        setRepos(response.data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch repositories. Please check your GitHub token.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  return (
    <main className="projects">
      <section className="projects-section">
        <div className="container">
          <h1 className="section-title">My Projects</h1>

          {loading && (
            <div className="loading">Loading repositories...</div>
          )}

          {error && (
            <div className="error">
              <p>{error}</p>
              <p className="hint">Make sure your GitHub token is configured in .env.local</p>
            </div>
          )}

          {!loading && !error && repos.length > 0 && (
            <div className="projects-grid">
              {repos.map((repo) => (
                <div key={repo.id} className="project-card">
                  <div className="project-header">
                    <h3 className="project-title">{repo.name}</h3>
                    <span className="project-lang">
                      {repo.language || 'N/A'}
                    </span>
                  </div>
                  
                  <p className="project-description">
                    {repo.description || 'No description available'}
                  </p>
                  
                  <div className="project-stats">
                    <span className="stat">
                      ⭐ {repo.stargazers_count}
                    </span>
                    <span className="stat">
                      🔀 {repo.forks_count}
                    </span>
                  </div>
                  
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    View on GitHub →
                  </a>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && repos.length === 0 && (
            <div className="no-repos">
              <p>No repositories found. Configure your GitHub settings.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
