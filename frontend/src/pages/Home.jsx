import { Link } from 'react-router-dom'
import '../styles/home.css'

/**
 * Home Page Component
 * Landing page with hero section and featured sections
 */
export default function Home() {
  return (
    <main className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">Vinayak Kumar</span>
            </h1>
            <p className="hero-subtitle">
              Computer Science Student | Software Developer | Problem Solver
            </p>
            <p className="hero-description">
              I'm a passionate and motivated Computer Science student at KL University with a strong interest in software development and problem-solving. I enjoy working with technologies like Java, Python, and web development tools, and I continuously strive to improve my skills through hands-on projects and coding practice. I'm particularly interested in building efficient and scalable applications, and I'm currently looking for opportunities where I can contribute, learn, and grow as a Software Engineer.
            </p>
            <div className="hero-buttons">
              <Link to="/projects" className="btn btn-primary">
                View My Work
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Get in Touch
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="/profile.jpg" alt="Vinayak Kumar" className="profile-picture" />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <div className="container">
          <h2 className="section-title">Skills</h2>
          <div className="skills-grid">
            {[
              { category: 'Frontend', items: ['React', 'JavaScript', 'CSS', 'Tailwind'] },
              { category: 'Backend', items: ['Node.js', 'Express', 'REST API', 'MongoDB'] },
              { category: 'Tools', items: ['Git', 'Docker', 'CI/CD', 'AWS'] }
            ].map((skillGroup, idx) => (
              <div key={idx} className="skill-card">
                <h3>{skillGroup.category}</h3>
                <div className="skill-tags">
                  {skillGroup.items.map((skill, i) => (
                    <span key={i} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="section-title">Ready to Work Together?</h2>
          <p className="cta-text">
            I'm always open to new opportunities and interesting projects.
          </p>
          <Link to="/contact" className="btn btn-primary">
            Start a Conversation
          </Link>
        </div>
      </section>
    </main>
  )
}
