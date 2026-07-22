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

  // Certifications data
  const certifications = [
    {
      title: 'Microsoft Certified: DevOps Engineer Expert',
      badge: 'DevOps',
      description: 'Expert-level skills in combining people, processes, and technologies to continuously deliver valuable products and services.',
      url: 'https://learn.microsoft.com/api/credentials/share/en-us/VinayakKumar-8440/3C25CD0F68E853FC?sharingId=3BD83909BBEE8BF2'
    },
    {
      title: 'AWS Certified Solutions Architect – Associate',
      badge: 'AWS',
      description: 'Demonstrates knowledge of how to architect and deploy secure and robust applications on AWS technologies.',
      url: 'https://www.credly.com/badges/c2335609-a7f9-4e65-a7c3-515377075096/public_url'
    },
    {
      title: 'Microsoft Certified: Azure Administrator Associate',
      badge: 'Azure',
      description: 'Skills in implementing, managing, and monitoring an organization\'s Microsoft Azure environment.',
      url: 'https://learn.microsoft.com/api/credentials/share/en-us/VinayakKumar-8440/9FC83D7713E2E4A4?sharingId=3BD83909BBEE8BF2'
    },
    {
      title: 'AWS Certified CloudOps Engineer – Associate',
      badge: 'AWS',
      description: 'Expertise in automating and operating workloads and infrastructure on AWS, focusing on security, cost, and performance.',
      url: 'https://www.credly.com/badges/1f98d3bf-6108-4ffe-9b68-5d66d210c2a3/public_url'
    },
    {
      title: 'Certified Implementation Specialist - Data Foundations',
      badge: 'ServiceNow',
      description: 'Expertise in ServiceNow\'s Configuration Management Database (CMDB) and Common Service Data Model (CSDM).',
      url: 'https://www.credly.com/badges/152f6b6c-35ab-4e6d-b646-21218f66ce5c/public_url'
    },
    {
      title: 'Microsoft Certified: Azure Fundamentals',
      badge: 'Azure',
      description: 'Foundational understanding of cloud concepts and core Microsoft Azure services, pricing, and support.',
      url: 'https://learn.microsoft.com/api/credentials/share/en-us/VinayakKumar-8440/D7EAFE32293E6BD0?sharingId=3BD83909BBEE8BF2'
    },
    {
      title: 'GitHub Foundations',
      badge: 'GitHub',
      description: 'Fundamental skills in Git and GitHub: repositories, branching, pull requests, and collaboration workflows.',
      url: 'https://learn.microsoft.com/api/credentials/share/en-us/VinayakKumar-8440/B59090E41B914FAF?sharingId=3BD83909BBEE8BF2'
    },
    {
      title: 'AWS Certified Data Engineer – Associate',
      badge: 'AWS',
      description: 'Professional certification demonstrating expertise in designing and implementing data engineering solutions on AWS cloud platform.',
      url: 'https://www.credly.com/badges/d6ecea8f-cfd8-4c98-8b19-85fc1b50eac3/public_url'
    },
    {
      title: 'MongoDB Associate Developer',
      badge: 'MongoDB',
      description: 'Certification validating skills in developing applications with MongoDB database and MERN stack technologies.',
      url: 'https://www.credly.com/badges/2b9b52be-c564-4302-952e-bb97a6ec3d12/public_url'
    },
    {
      title: 'AWS Certified Cloud Practitioner',
      badge: 'AWS',
      description: 'Foundational AWS certification demonstrating understanding of cloud concepts, AWS services, and cloud architecture principles.',
      url: 'https://www.credly.com/badges/89870114-c6ea-4e88-ac61-9050710c7f0c/public_url'
    },
    {
      title: 'Linguaskill Certificate',
      badge: 'Language',
      description: 'Official English language proficiency certification demonstrating professional communication skills.',
      url: 'https://drive.google.com/file/d/1gXB6Cu-XCtX-5pVAj5fup0KsmNUVqt_p/view?usp=sharing'
    },
    {
      title: 'Automation Anywhere Certified Essentials RPA Professional (Automation 360)',
      badge: 'RPA',
      description: 'Certification in Robotic Process Automation covering automation design, implementation, and deployment using Automation Anywhere platform.',
      url: 'https://certificates.automationanywhere.com/c41c11f9-0a18-45c2-83b4-ef739079226f#acc.7TlkKqNF'
    },
    {
      title: 'Aviatrix Certified Engineer (ACE) Multicloud Network Associate',
      badge: 'Cloud',
      description: 'Certification demonstrating expertise in multicloud networking and cloud infrastructure management across different cloud providers.',
      url: 'https://www.credly.com/badges/940cecba-0229-408b-88ba-7bceef0dbf7f/public_url'
    },
    {
      title: 'Essentials Automation Certification',
      badge: 'Automation',
      description: 'Foundational certification in automation technologies and practices for business process optimization.',
      url: 'https://certificates.automationanywhere.com/2149fb3a-abfe-4cbc-832c-057de124ed62#acc.DdXGtT2M'
    },
    {
      title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
      badge: 'AI/Oracle',
      description: 'Latest certification validating knowledge of AI concepts, Oracle Cloud AI services, and artificial intelligence applications in enterprise.',
      url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=D8266F6D8A7AA7CB9644BBF1BB063C2C0D44808D0D72F55E3DE6B30A97A99BED'
    },
    {
      title: 'Automation Anywhere Certified Essentials RPA Professional (Automation 360)',
      badge: 'RPA',
      description: 'Certification in Robotic Process Automation covering automation design, implementation, and deployment using Automation Anywhere platform.',
      url: 'https://certificates.automationanywhere.com/c41c11f9-0a18-45c2-83b4-ef739079226f#acc.7TlkKqNF'
    }
  ];

  // Skills data organized by category
  const skillsData = [
    {
      category: 'Cloud & DevOps',
      skills: ['AWS', 'Azure', 'CI/CD', 'Docker', 'Terraform', 'Cloud Architecture', 'Azure DevOps', 'Multi-Cloud Networking']
    },
    {
      category: 'Data & AI',
      skills: ['MongoDB', 'Data Engineering', 'ETL', 'Data Pipelines', 'Python', 'Oracle Cloud (OCI)', 'AI/ML Fundamentals']
    },
    {
      category: 'Backend Development',
      skills: ['Node.js', 'Express.js', 'Python', 'REST APIs', 'Microservices', 'Socket.io']
    },
    {
      category: 'Frontend Development',
      skills: ['React', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Responsive Design', 'Vite']
    },
    {
      category: 'Automation & RPA',
      skills: ['Automation Anywhere', 'RPA', 'Process Automation', 'Scripting']
    },
    {
      category: 'Tools & Platforms',
      skills: ['Git & GitHub', 'ServiceNow (CMDB)', 'Jira', 'Postman', 'VS Code']
    }
  ];

  // Social links data
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/vinayak872', icon: '...' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/vinayak872/', icon: '...' },
    { name: 'X (Twitter)', url: 'https://x.com/vinayak0872', icon: '...' },
    { name: 'Email', url: 'mailto:vinayakkumar893@gmail.com', icon: '...' }
  ];

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
            {skillsData.map((skillGroup, index) => (
              <div key={index} className="skill-card">
                <h3>{skillGroup.category}</h3>
                <div className="skill-tags">
                  {skillGroup.skills.map((skill, i) => (
                    <span key={i} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="certifications-section">
        <div className="container">
          <h2 className="section-title">Certifications & Credentials</h2>
          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <div key={index} className="certification-card">
                <div className="cert-header">
                  <h3 className="cert-title">{cert.title}</h3>
                  <span className="cert-badge">{cert.badge}</span>
                </div>
                <p className="cert-description">{cert.description}</p>
                <a href={cert.url} className="cert-action" target="_blank" rel="noopener noreferrer">
                  View Verification
                </a>
              </div>
            ))}
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
                {socialLinks.map((link, index) => (
                  <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="social-link">
                    <span>{link.name}</span>
                  </a>
                ))}
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
