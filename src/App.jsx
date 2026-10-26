import './App.css'
import { useEffect, useState, useRef } from 'react'
import {
  FiBriefcase,
  FiChevronDown,
  FiExternalLink,
  FiGithub,
  FiLayers,
  FiLinkedin,
  FiMonitor,
  FiServer,
} from 'react-icons/fi'

// Turnstile site keys are public. Local runs (vite dev or wrangler pages dev)
// use Cloudflare's always-pass test key, which pairs with the test secret in
// .dev.vars.example.
const TURNSTILE_SITE_KEY = ['localhost', '127.0.0.1'].includes(
  window.location.hostname
)
  ? '1x00000000000000000000AA'
  : '0x4AAAAAAFFsS0J0AZW7rS83'

const CAPTCHA_EXPIRED_MESSAGE = 'The spam check expired and is refreshing.'
const CAPTCHA_ERROR_MESSAGE =
  'The spam check hit an error. Please complete it again or refresh the page.'

let turnstileLoader
const loadTurnstile = () => {
  turnstileLoader ??= new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src =
      'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.onload = () => resolve(window.turnstile)
    script.onerror = () => {
      turnstileLoader = undefined
      script.remove()
      reject(new Error('Turnstile failed to load'))
    }
    document.head.appendChild(script)
  })
  return turnstileLoader
}

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
            'Modernized and improved a secure healthcare portal used by thousands of people to manage claims, track deductibles, request documents, and handle disputes.',
          stack:
            'Java, Struts, Spring, JavaScript, CSS, Bootstrap, jQuery, Jinja, REST',
          showGithub: false,
        },
        {
          name: 'IWS Internal Workflow System',
          description:
            'Modernized the backend and interface of an internal platform used by dozens of departments. The system handles document indexing, OCR, configurable workflows, and role-based security.',
          stack:
            'Java, Struts, Spring, JavaScript, CSS, Bootstrap, jQuery, Jinja, REST',
          showGithub: false,
        },
        {
          name: 'UMR Portals',
          description:
            'Develop and support 20+ configurable portals on the Optum Adaptive Platform. They serve millions of users across UMR, NYC, GEHA, and other clients and lines of business.',
          stack: 'Java, Spring, JavaScript, CSS, Bootstrap, jQuery, JSP, REST',
          showGithub: false,
        },
      ],
    },
    {
      title: 'Personal',
      projects: [
        {
          name: 'Firelands Current',
          description:
            'Built an independent local-news site for Sandusky and the Firelands. It includes article publishing, an events calendar, threaded community discussions, reader accounts, a media library, and advertising management.',
          stack:
            'Astro, TypeScript, Cloudflare Workers, D1, R2, Better Auth, Cloudflare Turnstile, Cloudflare Email Sending',
          liveLink: 'https://firelandscurrent.com/',
          liveLinkText: 'View website',
          link: 'https://github.com/jmusick/firelands-current',
          linkText: 'Site repo',
          image: '/projects/firelands-current.png',
          imageWidth: 1425,
          imageHeight: 891,
        },
        {
          name: 'Tagstash',
          description:
            'Designed and built a multi-user bookmarking app with active users, from the database architecture and React interface to the browser extension, email verification, REST APIs, and Stripe subscriptions.',
          stack: 'React, Cloudflare Pages & Workers, D1, Stripe, Resend, REST',
          liveLink: 'https://tagsta.sh/',
          liveLinkText: 'View website',
          link: 'https://github.com/jmusick/Tagstash',
          linkText: 'Site repo',
          secondaryLink: 'https://github.com/jmusick/TagstashExtension',
          secondaryLinkText: 'Extension repo',
          image: '/projects/tagstash.png',
          imageWidth: 1440,
          imageHeight: 2391,
        },
        {
          name: 'The Hidden Lodge',
          description:
            'Built a full-stack guild operations platform using Blizzard authentication and APIs, with D1-backed administration and analytics, scheduled data refreshes, a Python desktop bridge, and a Lua WoW addon. The addon exchanges preparedness, attendance, Great Vault, upgrade, and loot-history data through authenticated REST endpoints.',
          stack:
            'Astro, TypeScript, Cloudflare Pages & Workers, D1, Blizzard OAuth & API, REST, Python, Lua, GitHub Actions',
          liveLink: 'https://hidden-lodge.com/',
          liveLinkText: 'View website',
          link: 'https://github.com/jmusick/HiddenLodgeWebsite',
          linkText: 'Site repo',
          image: '/projects/hiddenlodge.png',
          imageWidth: 1440,
          imageHeight: 2391,
        },
        {
          name: 'Simon Rook',
          description:
            'Author site for Simon Rook and The Stoic Mind for Overthinkers, with a typed book catalogue, book detail pages, and retailer links. The colors and typography come from the cover art.',
          stack: 'Astro, TypeScript, HTML, CSS, Cloudflare Pages',
          liveLink: 'https://simonrook.com/',
          liveLinkText: 'View website',
          link: 'https://github.com/jmusick/SimonRook',
          linkText: 'Site repo',
          image: '/projects/simonrook.png',
          imageWidth: 1440,
          imageHeight: 2860,
        },
        {
          name: 'Dorian Black',
          description:
            'Official site for synth-pop project Dorian Black and the album After Tonight, with an embedded Spotify player, the full tracklist, an artist bio, and streaming links.',
          stack: 'Astro, JavaScript, HTML, CSS, Spotify Embeds',
          liveLink: 'https://dorianblack.com/',
          liveLinkText: 'View website',
          link: 'https://github.com/jmusick/DorianBlack',
          linkText: 'Site repo',
          image: '/projects/dorianblack.png',
          imageWidth: 1440,
          imageHeight: 1800,
        },
        {
          name: 'JD Musick',
          description:
            'Official site for electric blues and soul musician JD Musick and the debut album The Road Still Knows. Includes a tracklist, streaming links, artist information, and a protected contact form.',
          stack:
            'Astro, TypeScript, HTML, CSS, Cloudflare Pages, Cloudflare Turnstile, Cloudflare Email Sending',
          liveLink: 'https://jdmusick.band/',
          liveLinkText: 'View website',
          link: 'https://github.com/jmusick/JDMusick',
          linkText: 'Site repo',
          image: '/projects/jdmusick.png',
          imageWidth: 1440,
          imageHeight: 1800,
        },
        {
          name: 'Pneumaris Band',
          description:
            'Official site for Pneumaris, an atmospheric music project, with releases, band information, and links to social profiles and listening platforms.',
          stack: 'Astro, JavaScript, HTML, CSS, Web3Forms',
          liveLink: 'https://pneumarisband.com/',
          liveLinkText: 'View website',
          link: 'https://github.com/jmusick/pneumaris',
          linkText: 'Site repo',
          image: '/projects/pneumaris.png',
          imageWidth: 1440,
          imageHeight: 2391,
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
        'Develop and support 20+ configurable portals on the Optum Adaptive Platform. They serve millions of users across UMR, NYC, GEHA, and other clients and lines of business.',
        'Refactored and forked WebExchange to support a new Network Provider Services unit under HealthSmart with new business rules and compliance requirements.',
        'Implement role-based access controls and security validations for HIPAA-regulated systems and enterprise data-protection requirements.',
        'Review peer code and work with QA, business analysts, developers, and stakeholders to get software ready for production.',
      ],
    },
    {
      title: 'Web Developer',
      company: 'Centene Corporation',
      range: 'May 2019 - May 2024',
      bullets: [
        'Continued development and support of proprietary TPA platforms WebExchange and IWS following acquisition of HealthSmart.',
        'Took on more Java and backend development, adding features, fixing bugs, and making the code easier to maintain.',
        'Upgraded legacy interfaces to modern UI frameworks and improved front-end and back-end maintainability, usability, and reliability.',
        'Worked across teams to adapt the platforms to changing business and regulatory requirements.',
        'Contributed to enterprise healthcare administration systems supporting large client populations.',
      ],
    },
    {
      title: 'Application Developer / Web Developer',
      company: 'HealthSmart',
      range: 'July 2014 - May 2019',
      bullets: [
        'Transitioned into application development after acquisition of Commerce Benefits Group, supporting WebExchange and IWS platforms.',
        'Learned Java and used it to fix bugs, add features, and support the platforms.',
        'Used HTML, CSS, and JavaScript to make enterprise interfaces easier to use and more consistent.',
        'Worked across teams to build improvements that met business and client requirements.',
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
        'Ran email marketing campaigns and tracked how they performed at attracting and retaining customers.',
        'Prepared business intelligence reports to help the owners make strategic decisions.',
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
        'Oversaw a move to cloud services to improve access, support growth, and strengthen disaster recovery.',
        'Led the move to a new customer service and CRM platform, simplifying workflows and client management.',
        'Developed and maintained multiple commercial websites across company divisions.',
        'Managed social media and marketing initiatives including print materials, email campaigns, and analytics.',
        'Made operations more efficient and improved the company’s online presence by coordinating IT and marketing work.',
      ],
    },
    {
      title: 'IT Manager',
      company: 'Accurate Business Machines',
      range: 'March 2008 - September 2009',
      bullets: [
        'Launched and expanded a new IT services division for a traditional office equipment provider.',
        'Designed offerings for PC repair, network design, website development and hosting, email solutions, and custom web applications.',
        'Built the IT services client base from zero to dozens of customers, helping the company expand from equipment sales into IT services.',
        'Managed projects from start to finish, delivering quality work that clients were satisfied with.',
        'Used my ISP and business IT experience to plan services and guide technical decisions.',
      ],
    },
    {
      title: 'IT Manager',
      company: 'HMC, Ltd',
      range: 'October 2004 - September 2007',
      bullets: [
        'Managed and mentored three Internet Support Technicians, providing escalation support and technical guidance while working directly with the company president.',
        'Oversaw daily support operations so connectivity and service issues were resolved promptly.',
        'Partnered with ownership to develop and launch HMC Tech, expanding into managed IT services for local businesses.',
        'Supported transition from primarily dial-up internet services to broadband offerings.',
        'Helped expand services, improve infrastructure, and plan for long-term growth.',
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
        'Helped maintain ISP infrastructure and improve service reliability.',
        'Learned web development and built small websites for local clients.',
        'Provided clear, non-technical customer guidance that improved resolution speed and satisfaction.',
      ],
    },
  ]

  const [activeExperienceKey, setActiveExperienceKey] = useState(
    `${experience[0].company}-${experience[0].range}`
  )

  const emptyForm = { name: '', email: '', message: '', website: '' }
  const [formData, setFormData] = useState(emptyForm)
  const [formStatus, setFormStatus] = useState(null)
  const [fieldError, setFieldError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [captchaToken, setCaptchaToken] = useState('')
  const turnstileRef = useRef(null)
  const turnstileWidgetId = useRef(null)
  const errorTimer = useRef(null)

  useEffect(() => {
    let cancelled = false

    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !turnstileRef.current) return
        turnstileWidgetId.current = turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          action: 'contact',
          theme: 'light',
          size: 'compact',
          callback: (token) => {
            setCaptchaToken(token)
            setFormStatus((prev) =>
              prev?.message === CAPTCHA_EXPIRED_MESSAGE ? null : prev
            )
          },
          // Turnstile refreshes expired tokens on its own, so only note it.
          'expired-callback': () => {
            setCaptchaToken('')
            setFormStatus((prev) =>
              prev?.type === 'success'
                ? prev
                : { type: 'info', message: CAPTCHA_EXPIRED_MESSAGE }
            )
          },
          'error-callback': () => {
            setCaptchaToken('')
            setFormStatus((prev) =>
              prev?.type === 'success' || prev?.message === CAPTCHA_ERROR_MESSAGE
                ? prev
                : { type: 'error', message: CAPTCHA_ERROR_MESSAGE }
            )
          },
        })
      })
      .catch(() => {
        setFormStatus({
          type: 'error',
          message:
            'The spam check could not load. Please refresh the page and try again.',
        })
      })

    return () => {
      cancelled = true
      clearTimeout(errorTimer.current)
      if (turnstileWidgetId.current !== null) {
        window.turnstile?.remove(turnstileWidgetId.current)
        turnstileWidgetId.current = null
      }
    }
  }, [])

  // Turnstile tokens are single-use, so get a fresh one after every attempt.
  const resetCaptcha = () => {
    setCaptchaToken('')
    if (turnstileWidgetId.current !== null) {
      window.turnstile?.reset(turnstileWidgetId.current)
    }
  }

  // Clear the region first so a repeated identical error is announced again.
  const showError = (message) => {
    clearTimeout(errorTimer.current)
    setFormStatus(null)
    errorTimer.current = setTimeout(() => {
      setFormStatus({ type: 'error', message })
    }, 50)
  }

  const fieldErrorProps = (name) => ({
    'aria-invalid': fieldError?.field === name ? 'true' : undefined,
    'aria-describedby': fieldError?.field === name ? `${name}-error` : undefined,
  })

  const renderFieldError = (name) => (
    <p id={`${name}-error`} className="field-error" hidden={fieldError?.field !== name}>
      {fieldError?.field === name ? fieldError.message : ''}
    </p>
  )

  const statusMessage =
    formStatus && formStatus.type !== 'error' ? formStatus.message : ''
  const alertMessage = formStatus?.type === 'error' ? formStatus.message : ''

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setFieldError((prev) => (prev?.field === name ? null : prev))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    clearTimeout(errorTimer.current)
    setFieldError(null)

    if (!captchaToken) {
      showError('Please wait for the spam check to finish, then try again.')
      return
    }

    setIsSubmitting(true)
    setFormStatus({ type: 'info', message: 'Sending your message...' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, captchaToken }),
      })
      const result = await response.json().catch(() => null)

      if (!response.ok) {
        if (['name', 'email', 'message'].includes(result?.field)) {
          setFieldError({ field: result.field, message: result.error })
        }
        showError(result?.error || 'Failed to send message. Please try again.')
        return
      }

      setFormStatus({
        type: 'success',
        message: result?.message || "Message sent! I'll get back to you soon.",
      })
      setFormData(emptyForm)
    } catch (error) {
      console.error('Form submission error:', error)
      showError('Could not reach the server. Please try again in a moment.')
    } finally {
      resetCaptcha()
      setIsSubmitting(false)
    }
  }

  // Project stacks name the exact services each site uses; the skills list
  // rolls those up so near-identical entries don't sit next to each other.
  const skillAliases = {
    'Cloudflare Pages': 'Cloudflare Pages & Workers',
    'Cloudflare Workers': 'Cloudflare Pages & Workers',
  }
  const globalSkillExclusions = new Set(['Spotify Embeds', 'Web3Forms'])

  const projectSkills = projectGroups
    .flatMap((group) => group.projects)
    .flatMap((project) => project.stack.split(','))
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => skillAliases[item] ?? item)
    .filter((item) => !globalSkillExclusions.has(item))

  const allSkills = Array.from(new Set([...skills, ...projectSkills])).sort(
    (a, b) => a.localeCompare(b)
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
    'Better Auth',
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
    'Cloudflare Email Sending',
    'Cloudflare Pages & Workers',
    'Cloudflare Turnstile',
    'Joomla',
    'Kentico',
    'R2',
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
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="site-shell" id="top">
        <nav className="site-nav" aria-label="Main navigation">
          <a className="wordmark" href="#top" aria-label="Justin Musick, back to top">
            <svg className="brand-mark" viewBox="0 0 64 58" aria-hidden="true">
              <circle cx="17" cy="8" r="3" />
              <path d="M17 20v21c0 7-4 11-11 11H4M30 42V8l14 22L58 8v34" />
            </svg>
          </a>
          <div className="nav-links">
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
        <header className="hero">
          <div className="hero-copy">
            <p className="hero-name">Justin Musick</p>
            <h1>Senior Java & <span className="role-phrase">Full-Stack</span> Software Engineer</h1>
            <p className="lede">
              I modernize enterprise healthcare platforms used by thousands of
              people. I also develop and support 20+ configurable portals that
              serve millions.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="#projects">
                View projects
              </a>
              <a className="btn btn-secondary" href="#contact">
                Contact me
              </a>
            </div>
            <div className="hero-profile-links">
              <a
                className="profile-link"
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                <FiGithub aria-hidden="true" /> GitHub
              </a>
              <a
                className="profile-link"
                href={linkedInUrl}
                target="_blank"
                rel="noreferrer"
              >
                <FiLinkedin aria-hidden="true" /> LinkedIn
              </a>
            </div>
          </div>
          <aside className="hero-card">
            <h2>At a glance</h2>
            <dl className="snapshot">
              <div>
                <dt>Based in</dt>
                <dd>Sandusky, Ohio</dd>
              </div>
              <div>
                <dt>Currently</dt>
                <dd>Associate Software Engineer at Optum</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>
                  Java, full-stack modernization, and technical leadership
                </dd>
              </div>
            </dl>
            <p>
              Remote preferred; open to opportunities within roughly one hour of
              Sandusky.
            </p>
          </aside>
        </header>

        <main id="main">
          <section className="panel split-section" id="about">
            <h2 className="section-title">About</h2>
            <p>
              I’m a senior Java and full-stack engineer. My work includes
              modernizing enterprise healthcare systems, building secure
              applications for customers and internal teams, and reviewing peer
              code. Earlier in my career, I built IT service divisions, managed
              technical staff, and worked directly with company leadership.
              I’m drawing on that experience as I work toward technical
              leadership and engineering management.
            </p>
          </section>

          <section className="panel" id="projects">
            <div className="projects-heading">
              <h2 className="section-title">Projects</h2>
              <p>Healthcare systems, web apps, and independent projects.</p>
            </div>
            {projectGroups.map((group) => (
              <div
                className={`project-group ${group.title === 'Personal' ? 'personal-projects' : 'enterprise-projects'}`}
                key={group.title}
              >
                <h3 className="project-group-title">{group.title}</h3>
                <div className="project-grid">
                  {group.projects.map((project) => (
                    <article
                      className={`project-card ${
                        ['Firelands Current', 'Tagstash', 'The Hidden Lodge'].includes(project.name)
                          ? 'featured-project'
                          : ''
                      }`}
                      key={project.name}
                    >
                      {project.image && (
                        <a
                          className="project-preview"
                          href={project.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`View ${project.name} website`}
                        >
                          <img
                            src={project.image}
                            width={project.imageWidth}
                            height={project.imageHeight}
                            alt={`${project.name} preview`}
                            className="project-image"
                            loading="lazy"
                          />
                        </a>
                      )}
                      <div className="project-copy">
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
                            {project.liveLink && project.liveLinkText && (
                              <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noreferrer"
                                className="project-live-button"
                              >
                                <FiExternalLink aria-hidden="true" />{' '}
                                {project.liveLinkText}
                              </a>
                            )}
                            {project.link && project.linkText && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <FiGithub aria-hidden="true" />{' '}
                                {project.linkText}
                              </a>
                            )}
                            {project.secondaryLink &&
                              project.secondaryLinkText && (
                                <a
                                  href={project.secondaryLink}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <FiGithub aria-hidden="true" />{' '}
                                  {project.secondaryLinkText}
                                </a>
                              )}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className="panel split-section" id="experience">
            <div className="section-heading">
              <h2 className="section-title">Experience</h2>
              <p>My path from IT support to software engineering.</p>
            </div>
            <div className="timeline">
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
                        <span className="meta">{role.company}</span>
                      </div>
                      <span className="role-range">{role.range}</span>
                      <span className="exp-indicator" aria-hidden="true">
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
            </div>
          </section>

          <section className="panel split-section" id="skills">
            <div className="section-heading">
              <h2 className="section-title">Skills</h2>
              <p>Languages, platforms, and working knowledge.</p>
            </div>
            <div className="skills-columns">
              {Object.entries(categorizedSkills).map(
                ([category, categorySkills]) => {
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
                }
              )}
            </div>
          </section>

          <section className="panel split-section" id="contact">
            <div className="section-heading contact-copy">
              <h2 className="section-title">Contact</h2>
              <p>Have a role or project in mind? Send me a message.</p>
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noreferrer"
                className="profile-link"
              >
                <FiLinkedin aria-hidden="true" /> Connect on LinkedIn
              </a>
            </div>

            <form onSubmit={handleFormSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  placeholder="Your name"
                  {...fieldErrorProps('name')}
                />
                {renderFieldError('name')}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  placeholder="your@email.com"
                  {...fieldErrorProps('email')}
                />
                {renderFieldError('email')}
              </div>

              <div className="form-group message-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                  placeholder="Your message..."
                  {...fieldErrorProps('message')}
                  rows={5}
                />
                {renderFieldError('message')}
              </div>

              <div className="form-honeypot" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleFormChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div ref={turnstileRef} className="cf-turnstile" />

              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
              </button>

              <div
                className={statusMessage ? `form-status ${formStatus.type}` : 'form-status'}
                role="status"
              >
                {statusMessage}
              </div>
              <div
                className={alertMessage ? 'form-status error' : 'form-status'}
                role="alert"
              >
                {alertMessage}
              </div>
            </form>
          </section>
        </main>

        <footer className="footer">
          <p>Justin Musick</p>
          <p className="footer-version">v{version}</p>
          <div className="footer-links">
            <a
              href="https://github.com/jmusick/jm"
              target="_blank"
              rel="noreferrer"
            >
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
