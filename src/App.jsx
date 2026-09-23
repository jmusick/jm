import './App.css'
import { useState, useRef } from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import {
  FiBriefcase,
  FiChevronDown,
  FiCpu,
  FiExternalLink,
  FiGithub,
  FiLayers,
  FiLinkedin,
  FiMonitor,
  FiServer,
  FiMail,
  FiTool,
} from 'react-icons/fi'

function App() {
  const githubUrl = 'https://github.com/jmusick'
  const linkedInUrl = 'https://linkedin.com/in/jdmusick'
  const version = __APP_VERSION__

  const skills = [
    'Astro',
    'Java',
    'JavaScript',
    'Lua',
    'Python',
    'TypeScript',
    'Vite',
    'HTML',
    'CSS',
    'MS SQL',
    'MySQL',
    'PostgreSQL',
    'PHP',
    'Spring',
    'Struts',
    'Bootstrap',
    'jQuery',
    'AEM',
    'AWS',
    'Azure',
    'Joomla',
    'Kentico',
    'WordPress',
    'Cloud migration',
    'Accessibility',
    'HIPAA',
    'KPI reporting',
    'SEO & analytics',
    'Team leadership',
  ]

  const projectGroups = [
    {
      title: 'UnitedHealthcare',
      projects: [
        {
          name: 'WebExchange Client Portal',
          description:
            'Modernized and enhanced a secure healthcare portal serving thousands of users, with claims, deductible tracking, documentation requests, and dispute workflows.',
          stack: 'Java, Struts, Spring, JavaScript, CSS, Bootstrap, jQuery, Jinja, REST',
          showGithub: false,
        },
        {
          name: 'IWS Internal Workflow System',
          description:
            'Delivered backend and UI modernization for a platform used across dozens of departments, supporting document indexing, OCR, configurable workflows, and role-based security.',
          stack: 'Java, Struts, Spring, JavaScript, CSS, Bootstrap, jQuery, Jinja, REST',
          showGithub: false,
        },
        {
          name: 'UMR Portals',
          description:
            'Develop and support 20+ configurable Optum Adaptive Platform portals serving millions of users across UMR, NYC, GEHA, and other clients and lines of business.',
          stack: 'Java, Spring, JavaScript, CSS, Bootstrap, jQuery, JSP, REST',
          showGithub: false,
        },
      ],
    },
    {
      title: 'Personal',
      projects: [
        {
          name: 'Tagstash',
          description:
            'Designed and built an end-to-end, multi-user bookmarking application with active users, including the database architecture, React interface, browser extension, email verification, REST APIs, and Stripe subscription system.',
          stack: 'React, Cloudflare Pages & Workers, D1, Stripe, Resend, REST',
          liveLink: 'https://tagsta.sh/',
          liveLinkText: 'View Project',
          link: 'https://github.com/jmusick/Tagstash',
          linkText: 'Site Repo',
          secondaryLink: 'https://github.com/jmusick/TagstashExtension',
          secondaryLinkText: 'Extension Repo',
          image: '/projects/tagstash.png',
        },
        {
          name: 'Simon Rook',
          description:
            'Author site for Simon Rook, presenting the book The Stoic Mind for Overthinkers with a typed book catalogue, detail pages, and retailer links. Palette and typography derive from the cover art.',
          stack: 'Astro, TypeScript, HTML, CSS, Cloudflare Pages',
          liveLink: 'https://simonrook.com/',
          liveLinkText: 'View Project',
          link: 'https://github.com/jmusick/SimonRook',
          linkText: 'Site Repo',
          image: '/projects/simonrook.png',
        },
        {
          name: 'Dorian Black',
          description:
            'Official artist site for synth-pop project Dorian Black, featuring the album After Tonight with an embedded Spotify player, full tracklist, artist bio, and streaming links.',
          stack: 'Astro, JavaScript, HTML, CSS, Spotify Embeds',
          liveLink: 'https://dorianblack.com/',
          liveLinkText: 'View Project',
          link: 'https://github.com/jmusick/DorianBlack',
          linkText: 'Site Repo',
          image: '/projects/dorianblack.png',
        },
        {
          name: 'JD Musick',
          description:
            'Official artist site for electric blues and soul musician JD Musick, featuring the debut album The Road Still Knows, a tracklist, streaming links, artist information, and a protected contact form.',
          stack: 'Astro, TypeScript, HTML, CSS, Cloudflare Pages, Cloudflare Turnstile, Cloudflare Email Sending',
          liveLink: 'https://jdmusick.band/',
          liveLinkText: 'View Project',
          link: 'https://github.com/jmusick/JDMusick',
          linkText: 'Site Repo',
          image: '/projects/jdmusick.png',
        },
        {
          name: 'Pneumaris Band',
          description:
            'Official web presence for Pneumaris, an atmospheric music project featuring releases, band information, and social/listening links.',
          stack: 'Astro, JavaScript, HTML, CSS, Web3Forms',
          liveLink: 'https://pneumarisband.com/',
          liveLinkText: 'View Project',
          link: 'https://github.com/jmusick/pneumaris',
          linkText: 'Site Repo',
          image: '/projects/pneumaris.png',
        },
        {
          name: 'The Hidden Lodge',
          description:
            'Built a full-stack guild operations platform with Blizzard authentication and APIs, D1-backed administration and analytics, scheduled data refreshes, a Python desktop bridge, and a Lua WoW addon that exchanges preparedness, attendance, Great Vault, upgrade, and loot-history data through authenticated REST endpoints.',
          stack: 'Astro, TypeScript, Cloudflare Pages & Workers, D1, Blizzard OAuth & API, REST, Python, Lua, GitHub Actions',
          liveLink: 'https://hidden-lodge.com/',
          liveLinkText: 'View Project',
          link: 'https://github.com/jmusick/HiddenLodgeWebsite',
          linkText: 'Site Repo',
          image: '/projects/hiddenlodge.png',
        },
      ],
    },
  ]

  const experience = [
    {
      title: 'Associate Software Engineer',
      company: 'Optum, Inc.',
      range: 'May 2024 - Present',
      bullets: [
        'Develop and maintain full-stack healthcare applications serving thousands of users with Java, Spring, Struts, JSP/Jinja, JavaScript, Bootstrap, jQuery, CSS, and REST services.',
        'Modernize WebExchange and IWS across backend and UI layers, including workflow configuration, document indexing, OCR processing, and configurable security rules used by dozens of departments.',
        'Develop and support 20+ configurable Optum Adaptive Platform portals serving millions of users across UMR, NYC, GEHA, and other clients and lines of business.',
        'Refactored and forked WebExchange to support a new Network Provider Services unit under HealthSmart with new business rules and compliance requirements.',
        'Implement role-based access controls and security validations for HIPAA-regulated systems and enterprise data-protection requirements.',
        'Perform peer code reviews and collaborate with QA, business analysts, developers, and stakeholders to deliver production-ready solutions.',
      ],
    },
    {
      title: 'Web Developer',
      company: 'Centene Corporation',
      range: 'May 2019 - May 2024',
      bullets: [
        'Continued development and support of proprietary TPA platforms WebExchange and IWS following acquisition of HealthSmart.',
        'Expanded Java and backend development contributions through feature enhancements, bug resolution, and maintainability improvements.',
        'Upgraded legacy interfaces to modern UI frameworks and improved front-end and back-end maintainability, usability, and reliability.',
        'Collaborated with cross-functional teams to align platform capabilities with evolving business and regulatory requirements.',
        'Contributed to enterprise healthcare administration systems supporting large client populations.',
      ],
    },
    {
      title: 'Application Developer / Web Developer',
      company: 'HealthSmart',
      range: 'July 2014 - May 2019',
      bullets: [
        'Transitioned into application development after acquisition of Commerce Benefits Group, supporting WebExchange and IWS platforms.',
        'Expanded technical skillset to include Java, contributing to bug fixes, feature enhancements, and ongoing platform support.',
        'Applied front-end expertise in HTML, CSS, and JavaScript to improve usability and interface consistency across enterprise systems.',
        'Collaborated with cross-functional teams to deliver enhancements aligned with business and client requirements.',
        'Partnered with marketing to launch a redesigned HealthSmart.com on an updated Kentico CMS platform.',
        'Launched and maintained additional commercial websites supporting multiple HealthSmart divisions and product lines.',
      ],
    },
    {
      title: 'Website Administrator / Web Developer',
      company: 'Commerce Benefits Group',
      range: 'October 2012 - July 2014',
      bullets: [
        'Led development and optimization of MDLabTests.com, helping sustain approximately 20% annual online-sales growth during my tenure.',
        'Modernized site design with a full visual overhaul using Joomla CMS, PHP, JavaScript, CSS, and custom templating.',
        'Launched and managed approximately a dozen commercial websites, portals, and internal systems supporting multiple business divisions.',
        'Owned SEO strategy, social media, analytics, and digital advertising initiatives to drive traffic and revenue growth.',
        'Executed email marketing campaigns and tracked performance metrics for acquisition and retention.',
        'Generated business intelligence reporting for ownership to support strategic decision-making.',
        'Supported integration points between public-facing sites and internal TPA systems (WebExchange and IWS).',
      ],
    },
    {
      title: 'IT Manager',
      company: 'RestorePro, Inc.',
      range: 'September 2009 - November 2011',
      bullets: [
        'Managed and centralized IT operations for a growing disaster restoration company, replacing outsourced vendor support.',
        'Maintained PC hardware, servers, and network infrastructure to ensure reliable internal operations.',
        'Oversaw migration to cloud-based solutions to improve accessibility, scalability, and disaster recovery.',
        'Led migration to a new customer service and CRM platform to streamline workflows and client management.',
        'Developed and maintained multiple commercial websites across company divisions.',
        'Managed social media and marketing initiatives including print materials, email campaigns, and analytics.',
        'Improved operational efficiency and strengthened digital presence through integrated IT and marketing execution.',
      ],
    },
    {
      title: 'IT Manager',
      company: 'Accurate Business Machines',
      range: 'March 2008 - September 2009',
      bullets: [
        'Launched and expanded a new IT services division for a traditional office equipment provider.',
        'Designed offerings for PC repair, network design, website development and hosting, email solutions, and custom web applications.',
        'Built the IT-services client base from zero to dozens of customers, helping transition the company from equipment sales to technology solutions.',
        'Managed projects end-to-end with strong delivery quality and client satisfaction outcomes.',
        'Applied prior ISP and business IT experience to guide service strategy and technical direction.',
      ],
    },
    {
      title: 'IT Manager',
      company: 'HMC, Ltd',
      range: 'October 2004 - September 2007',
      bullets: [
        'Managed and mentored three Internet Support Technicians, providing escalation support and technical guidance while working directly with the company president.',
        'Oversaw daily support operations to ensure timely resolution of connectivity and service issues.',
        'Partnered with ownership to develop and launch HMC Tech, expanding into managed IT services for local businesses.',
        'Supported transition from primarily dial-up internet services to broadband offerings.',
        'Contributed to service expansion, infrastructure improvements, and long-term growth strategy.',
      ],
    },
    {
      title: 'Internet Specialist / IT',
      company: 'RS Office Solutions',
      range: 'July 2002 - October 2004',
      bullets: [
        'Helped launch and grow the IT services division within a traditional office equipment business.',
        'Implemented business email, website hosting, and small-scale server solutions for local clients.',
        'Configured and maintained servers supporting client services and internal operations.',
        'Delivered on-site IT support for hardware, networking, and workstation troubleshooting.',
        'Installed and configured PCs, printers, scanners, and network equipment in business environments.',
        'Partnered with sales teams to identify client technology needs and deliver practical IT solutions.',
      ],
    },
    {
      title: 'Internet Support Technician',
      company: 'Advanced Computer Connections',
      range: 'December 1999 - July 2002',
      bullets: [
        'Provided phone-based support for dial-up and early wireless broadband users, troubleshooting connectivity, email, and internet configuration.',
        'Diagnosed and resolved TCP/IP, modem, browser, and client-side email issues for residential and small business customers.',
        'Managed ISP account administration including user provisioning, password resets, and service configuration.',
        'Set up and maintained website hosting accounts and domain-related services.',
        'Assisted with ISP infrastructure maintenance and general service reliability initiatives.',
        'Built foundational web development skills and delivered small website projects for local clients.',
        'Provided clear, non-technical customer guidance that improved resolution speed and satisfaction.',
      ],
    },
  ]

  const [activeExperienceKey, setActiveExperienceKey] = useState(
    `${experience[0].company}-${experience[0].range}`
  )

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [formStatus, setFormStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const hCaptchaRef = useRef(null)

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus(null)

    try {
      const captchaToken = hCaptchaRef.current?.getResponse()
      if (!captchaToken) {
        setFormStatus({ type: 'error', message: 'Please complete the CAPTCHA' })
        setIsSubmitting(false)
        return
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '04a0f1d5-6e75-45b7-9e09-24993050c6e4',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          'h-captcha-response': captchaToken,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        setFormStatus({ type: 'success', message: "Message sent! I'll get back to you soon." })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setFormStatus({ type: 'error', message: result.message || 'Failed to send message. Please try again.' })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setFormStatus({ type: 'error', message: `Error: ${error.message}` })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Project stacks name the exact services each site uses; the skills list
  // rolls those up so near-identical entries don't sit next to each other.
  const skillAliases = {
    'Cloudflare Pages': 'Cloudflare Pages & Workers',
  }
  const globalSkillExclusions = new Set(['Spotify Embeds', 'Web3Forms'])

  const projectSkills = projectGroups
    .flatMap((group) => group.projects)
    .flatMap((project) => project.stack.split(','))
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => skillAliases[item] ?? item)
    .filter((item) => !globalSkillExclusions.has(item))

  const allSkills = Array.from(new Set([...skills, ...projectSkills])).sort((a, b) =>
    a.localeCompare(b)
  )

  const frontEndSkills = new Set([
    'Astro',
    'Bootstrap',
    'CSS',
    'HTML',
    'JavaScript',
    'Jinja',
    'jQuery',
    'JSP',
    'React',
    'TypeScript',
    'Vite',
  ])

  const backEndSkills = new Set([
    'C#',
    'Cron',
    'CRUD',
    'D1',
    'Java',
    'Lua',
    'MS SQL',
    'MySQL',
    'PHP',
    'PostgreSQL',
    'Python',
    'REST',
    'Spring',
    'Struts',
  ])

  const softwareSkills = new Set([
    'AEM',
    'AWS',
    'Azure',
    'Cloudflare Pages & Workers',
    'Joomla',
    'Kentico',
    'Resend',
    'Stripe',
    'Unity',
    'Web3Forms',
    'WordPress',
  ])

  const businessSkills = new Set([
    'Accessibility',
    'Cloud migration',
    'HIPAA',
    'KPI reporting',
    'SEO & analytics',
    'Team leadership',
  ])

  const categorizedSkills = allSkills.reduce(
    (acc, skill) => {
      if (businessSkills.has(skill)) {
        acc.Business.push(skill)
      } else if (frontEndSkills.has(skill)) {
        acc['Front End'].push(skill)
      } else if (backEndSkills.has(skill)) {
        acc['Back End'].push(skill)
      } else if (softwareSkills.has(skill)) {
        acc['Platforms & Tools'].push(skill)
      } else {
        acc['Platforms & Tools'].push(skill)
      }

      return acc
    },
    { 'Front End': [], 'Back End': [], 'Platforms & Tools': [], Business: [] }
  )

  const categoryIcons = {
    'Front End': FiMonitor,
    'Back End': FiServer,
    'Platforms & Tools': FiLayers,
    Business: FiBriefcase,
  }

  return (
    <>
      <div className="site-shell">
        <header className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Justin Musick</p>
          <h1>Senior Java & Full-Stack Software Engineer</h1>
          <p className="lede">
            Hands-on engineer modernizing enterprise healthcare platforms used
            by thousands of users and supporting 20+ configurable portals that
            serve millions.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href="#projects">
              View Projects
            </a>
            <a className="btn btn-secondary" href="#contact">
              Contact Me
            </a>
            <a
              className="btn btn-secondary"
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              <FiGithub aria-hidden="true" /> GitHub
            </a>
            <a
              className="btn btn-secondary"
              href={linkedInUrl}
              target="_blank"
              rel="noreferrer"
            >
              <FiLinkedin aria-hidden="true" /> LinkedIn
            </a>
          </div>
        </div>
        <aside className="hero-card">
          <h2>Quick Snapshot</h2>
          <ul>
            <li>Based in: Sandusky, Ohio</li>
            <li>Current role: Associate Software Engineer at Optum</li>
            <li>Scale: Thousands of enterprise users; millions across OAP portals</li>
            <li>Focus: Java, full-stack modernization, and technical leadership</li>
          </ul>
          <p>
            Remote preferred; open to opportunities within roughly one hour of
            Sandusky.
          </p>
          <div className="hero-profile-links">
            <a href={githubUrl} target="_blank" rel="noreferrer" className="hero-github">
              <FiGithub aria-hidden="true" /> github.com/jmusick
            </a>
            <a href={linkedInUrl} target="_blank" rel="noreferrer" className="hero-github">
              <FiLinkedin aria-hidden="true" /> linkedin.com/in/jdmusick
            </a>
          </div>
        </aside>
        </header>

      <main>
        <section className="panel" id="about">
          <h2 className="section-title">
            <FiCpu aria-hidden="true" />
            <span>About</span>
          </h2>
          <p>
            I am a senior hands-on Java and full-stack engineer with experience
            modernizing enterprise healthcare systems, developing secure
            customer-facing and internal applications, and reviewing peer code.
            Earlier in my career, I built IT service divisions, managed technical
            staff, and worked directly with company leadership—experience I am
            now bringing toward technical leadership and engineering management.
          </p>
        </section>

        <section className="panel" id="experience">
          <h2 className="section-title">
            <FiBriefcase aria-hidden="true" />
            <span>Experience</span>
          </h2>
          {experience.map((role, index) => {
            const roleKey = `${role.company}-${role.range}`
            const isRecentRole = index === 0
            const isOpen = activeExperienceKey === roleKey

            return (
              <details
                className={`timeline-item ${isRecentRole ? 'recent-role' : 'older-role'}`}
                key={roleKey}
                open={isOpen}
              >
              <summary
                onClick={(event) => {
                  event.preventDefault()
                  setActiveExperienceKey(isOpen ? null : roleKey)
                }}
              >
                <div className="summary-main">
                  <span className="role-title">{role.title}</span>
                  <span className="meta">
                    {role.company} | {role.range}
                  </span>
                </div>
                <span className="exp-indicator" aria-hidden="true">
                  <span className="state-collapsed">Collapsed</span>
                  <span className="state-open">Expanded</span>
                  <FiChevronDown className="chevron" />
                </span>
              </summary>
              <ul>
                {role.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </details>
            )
          })}
        </section>

        <section className="panel" id="projects">
          <h2 className="section-title">
            <FiLayers aria-hidden="true" />
            <span>Projects</span>
          </h2>
          {projectGroups.map((group) => (
            <div className="project-group" key={group.title}>
              <h3 className="project-group-title">{group.title}</h3>
              <div className="project-grid">
                {group.projects.map((project) => (
                  <article className="project-card" key={project.name}>
                    {project.image && (
                      <img
                        src={project.image}
                        alt={`${project.name} preview`}
                        className="project-image"
                        loading="lazy"
                      />
                    )}
                    <h4>{project.name}</h4>
                    <p>{project.description}</p>
                    <div className="project-card-footer">
                      <ul className="project-stack">
                        {project.stack
                          .split(',')
                          .map((item) => item.trim())
                          .filter(Boolean)
                          .sort((a, b) => a.localeCompare(b))
                          .map((item) => (
                            <li key={`${project.name}-${item}`}>{item}</li>
                          ))}
                      </ul>
                      <div className="project-links">
                        {project.link && project.linkText && (
                          <a href={project.link} target="_blank" rel="noreferrer">
                            <FiGithub aria-hidden="true" /> {project.linkText}
                          </a>
                        )}
                        {project.secondaryLink && project.secondaryLinkText && (
                          <a href={project.secondaryLink} target="_blank" rel="noreferrer">
                            <FiGithub aria-hidden="true" /> {project.secondaryLinkText}
                          </a>
                        )}
                      </div>
                      {project.liveLink && project.liveLinkText && (
                        <div className="project-live-row">
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="project-live-button"
                          >
                            <FiExternalLink aria-hidden="true" /> {project.liveLinkText}
                          </a>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="panel" id="skills">
          <h2 className="section-title">
            <FiTool aria-hidden="true" />
            <span>Skills</span>
          </h2>
          <div className="skills-columns">
            {Object.entries(categorizedSkills).map(([category, categorySkills]) => {
              const CategoryIcon = categoryIcons[category]

              return (
                <div className="skills-column" key={category}>
                  <h3 className="skills-category-title">
                    <CategoryIcon aria-hidden="true" />
                    <span>{category}</span>
                  </h3>
                  <ul className="skill-list">
                    {categorySkills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </section>

        <section className="panel" id="contact">
          <h2 className="section-title">
            <FiMail aria-hidden="true" />
            <span>Contact</span>
          </h2>
          <p>
            Email me directly at{' '}
            <a href="mailto:justin.musick@gmail.com">justin.musick@gmail.com</a>
            {' '}or use the form below.
          </p>

          <form onSubmit={handleFormSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
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
                value={formData.email}
                onChange={handleFormChange}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                required
                placeholder="Your message..."
                rows={5}
              />
            </div>

            <HCaptcha
              ref={hCaptchaRef}
              sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
              reCaptchaCompat={false}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {formStatus && (
              <div className={`form-status ${formStatus.type}`}>
                {formStatus.message}
              </div>
            )}
          </form>
        </section>
      </main>

        <footer className="footer">
          <p>Justin Musick</p>
          <p className="footer-version">v{version}</p>
          <div className="footer-links">
            <a href="https://github.com/jmusick/jm" target="_blank" rel="noreferrer">
              <FiGithub aria-hidden="true" /> GitHub
            </a>
            <a href="/sitemap.xml" target="_blank" rel="noreferrer">
              Sitemap
            </a>
            <a href="#top">Back to top</a>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App
