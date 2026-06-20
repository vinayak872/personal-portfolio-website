import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './styles/global.css'
import './styles/navbar.css'
import './styles/home.css'
import './styles/certifications.css'
import './styles/projects.css'
import './styles/contact.css'
import './styles/footer.css'
import { contactAPI } from './services/api'

/**
 * Main App Component
 * Single page layout with all sections
 */
function App() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [contactLoading, setContactLoading] = useState(false)
  const [contactSuccess, setContactSuccess] = useState(false)
  const [contactError, setContactError] = useState(null)

  // Featured projects to always display
  const featuredProjects = [
    {
      name: 'Realtime Chat App',
      url: 'https://github.com/vinayak872/realtime-chat-app',
      description: 'A real-time chat application with instant messaging, user authentication, and live notifications.',
      language: 'JavaScript',
      topics: ['Socket.io', 'React', 'Node.js', 'MongoDB']
    },
    {
      name: 'Stock Analysis Dashboard',
      url: 'https://github.com/vinayak872/stock-analysis-dashboard',
      description: 'A comprehensive stock market analysis dashboard with real-time data, charts, and technical indicators.',
      language: 'Python',
      topics: ['Python', 'React', 'Data Analysis', 'API Integration']
    }
  ]

  const handleContactChange = (e) => {
    const { name, value } = e.target
    setContactForm(prev => ({ ...prev, [name]: value }))
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setContactLoading(true)
    setContactError(null)
    setContactSuccess(false)

    try {
      await contactAPI.sendMessage(contactForm)
      setContactSuccess(true)
      setContactForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setContactSuccess(false), 5000)
    } catch (err) {
      setContactError('Failed to send message. Please try again.')
      console.error(err)
    } finally {
      setContactLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">Vinayak Kumar</span>
            </h1>
            <p className="hero-subtitle">
              Full Stack Developer | Software Engineer | Tech Enthusiast
            </p>
            <p className="hero-description">
              Passionate Computer Science student at KL University with expertise in building scalable web applications and real-time systems. Experienced with modern tech stacks including React, Node.js, and cloud technologies. I'm driven by solving complex problems and creating impactful digital solutions.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">
                View My Work
              </a>
              <a href="#contact" className="btn btn-secondary">
                Get in Touch
              </a>
            </div>
          </div>
          <div className="hero-image">
            <img src="/profile.jpg" alt="Vinayak Kumar" className="profile-picture" />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <div className="container">
          <h2 className="section-title">Skills & Expertise</h2>
          <div className="skills-grid">
            <div className="skill-card">
              <h3>Frontend</h3>
              <div className="skill-tags">
                <span className="skill-tag">React</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">CSS</span>
                <span className="skill-tag">Responsive Design</span>
              </div>
            </div>
            <div className="skill-card">
              <h3>Backend</h3>
              <div className="skill-tags">
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Express</span>
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">REST APIs</span>
              </div>
            </div>
            <div className="skill-card">
              <h3>Tools & Technologies</h3>
              <div className="skill-tags">
                <span className="skill-tag">Git</span>
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">AWS</span>
                <span className="skill-tag">Python</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="certifications-section">
        <div className="container">
          <h2 className="section-title">Certifications & Credentials</h2>
          <div className="certifications-grid">
            <div className="certification-card">
              <div className="cert-header">
                <h3 className="cert-title">Microsoft Certified: Azure Fundamentals</h3>
                <span className="cert-badge">Azure</span>
              </div>
              <p className="cert-description">Foundational understanding of cloud concepts and core Microsoft Azure services, pricing, and support.</p>
              <a href="https://learn.microsoft.com/api/credentials/share/en-us/VinayakKumar-8440/D7EAFE32293E6BD0?sharingId=3BD83909BBEE8BF2" className="cert-action" target="_blank" rel="noopener noreferrer">View Verification</a>
            </div>
            <div className="certification-card">
              <div className="cert-header">
                <h3 className="cert-title">GitHub Foundations</h3>
                <span className="cert-badge">GitHub</span>
              </div>
              <p className="cert-description">Fundamental skills in Git and GitHub: repositories, branching, pull requests, and collaboration workflows.</p>
              <a href="https://learn.microsoft.com/api/credentials/share/en-us/VinayakKumar-8440/B59090E41B914FAF?sharingId=3BD83909BBEE8BF2" className="cert-action" target="_blank" rel="noopener noreferrer">View Verification</a>
            </div>
            
            <div className="certification-card">

              <div className="cert-header">
                <h3 className="cert-title">AWS Certified Data Engineer – Associate</h3>
                <span className="cert-badge">AWS</span>
              </div>
              <p className="cert-description">Professional certification demonstrating expertise in designing and implementing data engineering solutions on AWS cloud platform.</p>
              <a href="https://www.credly.com/badges/d6ecea8f-cfd8-4c98-8b19-85fc1b50eac3/public_url" className="cert-action" target="_blank" rel="noopener noreferrer">View Verification</a>
            </div>

            <div className="certification-card">
              <div className="cert-header">
                <h3 className="cert-title">MongoDB Associate Developer</h3>
                <span className="cert-badge">MongoDB</span>
              </div>
              <p className="cert-description">Certification validating skills in developing applications with MongoDB database and MERN stack technologies.</p>
              <a href="https://www.credly.com/badges/2b9b52be-c564-4302-952e-bb97a6ec3d12/public_url" className="cert-action" target="_blank" rel="noopener noreferrer">View Verification</a>
            </div>

            <div className="certification-card">
              <div className="cert-header">
                <h3 className="cert-title">AWS Certified Cloud Practitioner</h3>
                <span className="cert-badge">AWS</span>
              </div>
              <p className="cert-description">Foundational AWS certification demonstrating understanding of cloud concepts, AWS services, and cloud architecture principles.</p>
              <a href="https://www.credly.com/badges/89870114-c6ea-4e88-ac61-9050710c7f0c/public_url" className="cert-action" target="_blank" rel="noopener noreferrer">View Verification</a>
            </div>

            

            <div className="certification-card">
              <div className="cert-header">
                <h3 className="cert-title">Linguaskill Certificate</h3>
                <span className="cert-badge">Language</span>
              </div>
              <p className="cert-description">Official English language proficiency certification demonstrating professional communication skills.</p>
              <a href="https://drive.google.com/file/d/1gXB6Cu-XCtX-5pVAj5fup0KsmNUVqt_p/view?usp=sharing" className="cert-action" target="_blank" rel="noopener noreferrer">View Verification</a>
            </div>

            <div className="certification-card">
              <div className="cert-header">
                <h3 className="cert-title">Automation Anywhere Certified Essentials RPA Professional (Automation 360)</h3>
                <span className="cert-badge">RPA</span>
              </div>
              <p className="cert-description">Certification in Robotic Process Automation covering automation design, implementation, and deployment using Automation Anywhere platform.</p>
              <a href="https://certificates.automationanywhere.com/c41c11f9-0a18-45c2-83b4-ef739079226f#acc.7TlkKqNF" className="cert-action" target="_blank" rel="noopener noreferrer">View Verification</a>
            </div>

            <div className="certification-card">
              <div className="cert-header">
                <h3 className="cert-title">Aviatrix Certified Engineer (ACE) Multicloud Network Associate</h3>
                <span className="cert-badge">Cloud</span>
              </div>
              <p className="cert-description">Certification demonstrating expertise in multicloud networking and cloud infrastructure management across different cloud providers.</p>
              <a href="https://www.credly.com/badges/940cecba-0229-408b-88ba-7bceef0dbf7f/public_url" className="cert-action" target="_blank" rel="noopener noreferrer">View Verification</a>
            </div>

            <div className="certification-card">
              <div className="cert-header">
                <h3 className="cert-title">Essentials Automation Certification</h3>
                <span className="cert-badge">Automation</span>
              </div>
              <p className="cert-description">Foundational certification in automation technologies and practices for business process optimization.</p>
              <a href="https://certificates.automationanywhere.com/2149fb3a-abfe-4cbc-832c-057de124ed62#acc.DdXGtT2M" className="cert-action" target="_blank" rel="noopener noreferrer">View Verification</a>
            </div>

            <div className="certification-card">
              <div className="cert-header">
                <h3 className="cert-title">Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate</h3>
                <span className="cert-badge">AI/Oracle</span>
              </div>
              <p className="cert-description">Latest certification validating knowledge of AI concepts, Oracle Cloud AI services, and artificial intelligence applications in enterprise.</p>
              <a href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=D8266F6D8A7AA7CB9644BBF1BB063C2C0D44808D0D72F55E3DE6B30A97A99BED" className="cert-action" target="_blank" rel="noopener noreferrer">View Verification</a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {featuredProjects.map((project, idx) => (
              <div key={idx} className="project-card featured">
                <div className="project-header">
                  <h3 className="project-title">{project.name}</h3>
                  <span className="project-lang">{project.language}</span>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-topics">
                  {project.topics.map((topic, i) => (
                    <span key={i} className="topic-tag">{topic}</span>
                  ))}
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  View on GitHub →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">I'd love to hear about your project. Feel free to reach out!</p>

          <div className="contact-wrapper">
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleContactChange}
                  required
                  placeholder="Message subject"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  required
                  placeholder="Your message..."
                  rows="5"
                />
              </div>

              {contactSuccess && <div className="success-message">Message sent successfully!</div>}
              {contactError && <div className="error-message">{contactError}</div>}

              <button type="submit" className="btn btn-primary" disabled={contactLoading}>
                {contactLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <div className="contact-info">
              <h3>Connect With Me</h3>
              <div className="social-links">
                <a href="https://github.com/vinayak872" target="_blank" rel="noopener noreferrer" className="social-link">
                  <span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/vinayak872/" target="_blank" rel="noopener noreferrer" className="social-link">
                  <span>LinkedIn</span>
                </a>
                <a href="https://x.com/vinayak0872" target="_blank" rel="noopener noreferrer" className="social-link">
                  <span>X (Twitter)</span>
                </a>
                <a href="mailto:vinayakkumar893@gmail.com" className="social-link">
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default App
