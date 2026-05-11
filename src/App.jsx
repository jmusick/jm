import './App.css'
import { useState } from 'react'
import {
  FiBriefcase,
  FiChevronDown,
  FiCode,
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

  const skills = [
    'Astro',
    'Java',
    'JavaScript',
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
            'Contributed to a secure healthcare portal where members can view claims, track deductibles, request documentation, and file disputes.',
          stack: 'Java, Struts, Spring, JavaScript, CSS, Bootstrap, jQuery, Jinja, REST',
          showGithub: false,
        },
        {
          name: 'IWS Internal Workflow System',
          description:
            'Led backend and UI enhancements for a multi-department workflow platform supporting document indexing, OCR processing, and configurable security rules.',
          stack: 'Java, Struts, Spring, JavaScript, CSS, Bootstrap, jQuery, Jinja, REST',
          showGithub: false,
        },
        {
          name: 'UMR Portals',
          description:
            'Custom built Optum Adaptive Platform (OAP) used to handle millions of customers for UMR (TPA). OAP builds hyper customizable portals for various lines of business and clients.',
          stack: 'Java, Spring, JavaScript, CSS, Bootstrap, jQuery, JSP, CRUD, REST',
          showGithub: false,
        },
      ],
    },
    {
      title: 'Personal',
      projects: [
        {
          name: 'Tagsta.sh',
          description:
            'Tagstash is a self-hosted, tag-first bookmarking app with a React frontend, Cloudflare Pages & Workers backend, D1 storage, browser extension support, email verification, and Stripe-powered Pro subscriptions.',
          stack: 'React, Cloudflare Pages & Workers, D1, Stripe, Resend, CRUD, REST',
          liveLink: 'https://tagsta.sh/',
          liveLinkText: 'View Project',
          link: 'https://github.com/jmusick/Tagstash',
          linkText: 'Site Repo',
          secondaryLink: 'https://github.com/jmusick/TagstashExtension',
          secondaryLinkText: 'Extension Repo',
          image: '/projects/tagstash.png',
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
            'Guild website for The Hidden Lodge with raid scheduling, progression goals, guild rules, membership resources, and desktop sync plus WoW addon integration features.',
          stack: 'Astro, JavaScript, HTML, CSS, Cron',
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
        'Developed and maintained full-stack, customer-facing healthcare web applications using Java (Struts, Spring) and JavaScript/CSS (Bootstrap, jQuery).',
        'Contributed to WebExchange, a secure client portal for medical claims, deductibles, documentation requests, and dispute workflows.',
        'Led backend and UI enhancements for IWS, including dynamic workflow configuration, document indexing, OCR processing, and a security rule engine.',
        'Refactored and forked WebExchange to support a new Network Provider Services unit under HealthSmart with new business rules and compliance requirements.',
        'Designed and implemented configurable role-based access controls and security validations to meet strict enterprise security standards.',
        'Ensured application behavior aligned with HIPAA compliance requirements and enterprise-level data protection expectations.',
        'Collaborated with QA, business analysts, and stakeholders across departments to deliver secure, production-ready solutions.',
      ],
    },
    {
      title: 'Web Developer',
      company: 'Centene Corporation',
      range: 'May 2019 - May 2024',
      bullets: [
        'Continued development and support of proprietary TPA platforms WebExchange and IWS following acquisition of HealthSmart.',
        'Expanded Java and backend development contributions through feature enhancements, bug resolution, and maintainability improvements.',
        'Modernized front-end and back-end technologies to improve scalability, usability, and system reliability.',
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
        'Led development and optimization of MDLabTests.com, increasing online sales through UX, performance, and conversion improvements.',
        'Modernized site design with a full visual overhaul using Joomla CMS, PHP, JavaScript, CSS, and custom templating.',
        'Launched and managed multiple commercial websites supporting various business divisions.',
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
        'Built a client base for IT services, helping transition the company from equipment sales to technology solutions.',
        'Managed projects end-to-end with strong delivery quality and client satisfaction outcomes.',
        'Applied prior ISP and business IT experience to guide service strategy and technical direction.',
      ],
    },
    {
      title: 'IT Manager',
      company: 'HMC, Ltd',
      range: 'October 2004 - September 2007',
      bullets: [
        'Managed and mentored a team of Internet Support Technicians, providing escalation support and technical guidance.',
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

  const projectSkills = projectGroups
    .flatMap((group) => group.projects)
    .flatMap((project) => project.stack.split(','))
    .map((item) => item.trim())
    .filter(Boolean)

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
  ])

  const backEndSkills = new Set([
    'Cron',
    'CRUD',
    'D1',
    'Java',
    'MS SQL',
    'MySQL',
    'PHP',
    'PostgreSQL',
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
        acc.Software.push(skill)
      } else {
        acc.Software.push(skill)
      }

      return acc
    },
    { 'Front End': [], 'Back End': [], Software: [], Business: [] }
  )

  const categoryIcons = {
    'Front End': FiMonitor,
    'Back End': FiServer,
    Software: FiLayers,
    Business: FiBriefcase,
  }

  return (
    <>
      <div className="site-shell">
        <header className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Justin Musick</p>
          <h1>Technology Leader & Full-Stack Developer</h1>
          <p className="lede">
            Technology leader and full-stack application developer with
            experience spanning ISP operations, infrastructure management, web
            development, and enterprise healthcare systems.
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
            <li>Focus: Enterprise web applications</li>
          </ul>
          <p>
            Proven track record in modernizing platforms, improving user
            experience, and delivering scalable, compliant solutions.
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
            I combine hands-on engineering with strategic business insight,
            helping teams modernize legacy systems, launch digital initiatives,
            and improve performance across customer-facing and internal
            platforms. My background includes healthcare applications,
            infrastructure operations, and IT service leadership.
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
                  setActiveExperienceKey(roleKey)
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
                    <h3>{project.name}</h3>
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
            GitHub: <a href={githubUrl} target="_blank" rel="noreferrer">github.com/jmusick</a>
          </p>
          <p className="note">Sandusky, Ohio, United States</p>
        </section>
      </main>

        <footer className="footer">
          <p>Justin Musick</p>
          <div className="footer-links">
            <a href={githubUrl} target="_blank" rel="noreferrer">
              <FiGithub aria-hidden="true" /> GitHub
            </a>
            <a href="#top">Back to top</a>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App
