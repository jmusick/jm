# Justin Musick — Portfolio

A modern, interactive portfolio and resume site built with React and Vite, live at [justinmusick.com](https://justinmusick.com). Features a professional design, complete work history, project showcase, and contact form.

## Features

- **Interactive Experience Timeline** — Accordion-style expandable work history with full role descriptions and achievements
- **Project Showcase** — Professional and personal projects, with live links, GitHub repositories, and screenshots
- **Skill Categorization** — Skills grouped into Front End, Back End, Platforms & Tools, and Business, merged automatically from the project stacks
- **Contact Form** — Cloudflare Pages Function with Turnstile spam protection and Cloudflare Email Sending; no email address is published on the site
- **Dark Theme** — Neutral slate color palette optimized for readability
- **Responsive Design** — Adapts to mobile, tablet, and desktop viewports
- **Accessibility** — Skip link, visible keyboard focus, and reduced-motion support
- **Security Headers** — Enforced Content Security Policy and HSTS via `public/_headers`
- **SEO** — Open Graph and Twitter tags, JSON-LD, sitemap, and robots.txt

## Tech Stack

- **Frontend:** React 19, Vite 8
- **Icons:** react-icons (Feather set)
- **Contact form:** Cloudflare Pages Functions, Turnstile, Email Sending
- **Fonts:** Manrope, Plus Jakarta Sans, IBM Plex Mono (Google Fonts)
- **Deployment:** Cloudflare Pages

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+ (required by Vite 8) and npm

### Installation

```bash
git clone https://github.com/jmusick/jm.git
cd jm
npm install
```

### Development

Start the local dev server at http://localhost:5173:

```bash
npm run dev
```

Lint the project:

```bash
npm run lint
```

The Vite dev server does not run the contact form's `/api/contact` Function, so submitting fails under `npm run dev`. To test the form end to end locally:

1. Copy `.dev.vars.example` to `.dev.vars` and fill in the values (the file is git-ignored).
2. Build and serve the site with its Functions at http://localhost:8788:

   ```bash
   npm run build
   npx wrangler pages dev dist
   ```

On `localhost` the page uses Cloudflare's always-pass Turnstile test key, which pairs with the test secret in `.dev.vars.example`. With a real `CF_EMAIL_API_TOKEN` in `.dev.vars`, local submissions send real email.

### Building

Build for production:

```bash
npm run build
```

Output is in the `dist/` directory. Preview the build locally (static files only, no Functions):

```bash
npm run preview
```

## Deployment

The site is deployed on Cloudflare Pages (project `jm`) and auto-deploys on push to the `master` branch.

Build settings:

- **Build command:** `npm run build`
- **Build output directory:** `dist`

`wrangler.toml` is the Pages config: project name, Functions compatibility date, and plaintext `[vars]`. Because the file is present, Pages treats it as the source of truth for plaintext variables, so change them there rather than in the dashboard. `public/_headers` sets cache headers and security headers, including a Content Security Policy that allows only the site itself, Turnstile, and Google Fonts. If you add a third-party script, font, or API, add its origin to the policy too. The Vite dev server ignores `_headers`; `npx wrangler pages dev dist` applies it.

### Contact form configuration

The contact form Function (`functions/api/contact.js`) reads these plaintext variables from `wrangler.toml`:

| Variable | Purpose |
|---|---|
| `CF_ACCOUNT_ID` | Cloudflare account that sends the email |
| `EMAIL_FROM_CONTACT` | Sender address, on a domain onboarded to Email Sending |
| `TURNSTILE_HOSTNAMES` | Comma-separated hostnames Turnstile tokens must come from |

And these secrets, set in the Pages dashboard under **Settings → Variables and secrets** (or with `npx wrangler pages secret put NAME --project-name jm`):

| Secret | Purpose |
|---|---|
| `CF_EMAIL_API_TOKEN` | Cloudflare API token with **Email Sending: Edit** |
| `TURNSTILE_SECRET_KEY` | Turnstile widget secret key |
| `CONTACT_TO_EMAIL` | Inbox that receives form messages |

The repository is public, so secrets and the destination inbox are never committed. If the site gets a new domain, add it to both the Turnstile widget's hostnames and `TURNSTILE_HOSTNAMES`.

## Project Structure

```
functions/
└── api/contact.js      # Contact form endpoint (Pages Function)

src/
├── App.jsx             # Main component with all content
├── App.css             # Component styling
├── index.css           # Global styles and theme variables
└── main.jsx            # React entry point

public/
├── _headers            # Cloudflare cache & security headers (CSP, HSTS)
├── bg.png              # Hero background and social share image
├── favicon.png
├── projects/           # Project screenshot images
├── robots.txt
└── sitemap.xml

index.html              # Page shell with SEO metadata and JSON-LD
wrangler.toml           # Cloudflare Pages config
.dev.vars.example       # Template for local Function secrets
AGENTS.md               # Guidance for AI coding agents
```

## Customization

### Theme

Edit CSS variables in `src/index.css` under `:root`:

```css
--bg: #0f1318;
--paper: rgba(19, 25, 32, 0.88);
--ink: #e8edf2;
--brand: #94a3b8;
```

### Content

All content lives in `src/App.jsx`:

- `experience` — Work history
- `projectGroups` — Project portfolio, grouped (`UnitedHealthcare`, `Personal`)
- `skills` — Base skills list

Each project's `stack` is merged into the skills list. New skills are sorted into categories by the `frontEndSkills`, `backEndSkills`, `softwareSkills`, and `businessSkills` sets, and anything not listed falls into Platforms & Tools. See [AGENTS.md](AGENTS.md) for the details.

If you change the title or role, also update the metadata and JSON-LD in `index.html`.

## License

Personal portfolio — all rights reserved.

## Contact

For inquiries, use the contact form at [justinmusick.com](https://justinmusick.com/#contact) or reach out via GitHub.
