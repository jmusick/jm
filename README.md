# Justin Musick — Portfolio

A modern, interactive portfolio and resume site built with React and Vite, live at [justinmusick.com](https://justinmusick.com). Features a professional design, complete work history, project showcase, and contact form.

## Features

- **Interactive Experience Timeline** — Accordion-style expandable work history with full role descriptions and achievements
- **Project Showcase** — Featured personal applications first, followed by enterprise project rows and a compact website gallery, with live-site and repository links where available
- **Skill Categorization** — Plain lists grouped into Front End, Back End, Platforms & Tools, and Business, merged automatically from the project stacks
- **Contact Form** — Cloudflare Pages Function with Turnstile spam protection and Cloudflare Email Sending; no email address is published on the site
- **Theme** — White content surfaces, a navy hero, blue links, and a JM monogram
- **Responsive Design** — Adapts to mobile, tablet, and desktop viewports
- **Accessibility** — Skip link, visible keyboard focus, 44px minimum link targets, higher-contrast form borders, and reduced-motion support
- **Security Headers** — Enforced Content Security Policy and HSTS via `public/_headers`
- **SEO** — Open Graph and Twitter tags, JSON-LD, sitemap, and robots.txt

## Tech Stack

- **Frontend:** React 19, Vite 8
- **Icons:** react-icons (Feather set)
- **Contact form:** Cloudflare Pages Functions, Turnstile, Email Sending
- **Fonts:** Sora for headings and Source Sans 3 for body text (Google Fonts)
- **Deployment:** Cloudflare Pages

## Getting Started

### Prerequisites

- Node.js 20.19+ (20.x), 22.13+ (22.x), or 24+, and npm, to satisfy both Vite 8 and ESLint 10

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

There is no automated test suite. Run `npm run lint` and `npm run build` before finishing a change; check layout changes at desktop and mobile widths.

The Vite dev server does not run the contact form's `/api/contact` Function, so submitting fails under `npm run dev`. To test the form end to end locally:

1. Copy `.dev.vars.example` to `.dev.vars` and fill in the values (the file is git-ignored).
2. Build and serve the site with its Functions at http://localhost:8788:

   ```bash
   npm run build
   npx wrangler pages dev dist
   ```

On `localhost` and `127.0.0.1` the page uses Cloudflare's always-pass Turnstile test key, which pairs with the test secret in `.dev.vars.example`. With a real `CF_EMAIL_API_TOKEN` in `.dev.vars`, local submissions send real email.

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

`wrangler.toml` is the Pages config: project name, Functions compatibility date, and plaintext `[vars]`. Because the file is present, Pages treats it as the source of truth for plaintext variables, so change them there rather than in the dashboard. `public/_headers` sets cache and security headers for static responses, including a Content Security Policy that allows only the site itself, Turnstile, and Google Fonts. Pages Function responses need their own applicable headers. If you add a third-party script, font, or API, add its origin to the policy too. The Vite dev server ignores `_headers`; `npx wrangler pages dev dist` applies it to static responses.

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
├── bg.png              # Social share image; not used as a hero background
├── favicon.svg         # Active browser favicon
├── favicon.png         # Retained raster favicon asset
├── projects/           # Project screenshot images
├── robots.txt
└── sitemap.xml

index.html              # Page shell with SEO metadata and JSON-LD
wrangler.toml           # Cloudflare Pages config
.dev.vars.example       # Template for local Function secrets
AGENTS.md               # Guidance for AI coding agents
CLAUDE.md               # Imports AGENTS.md for Claude
docs/audits/            # Public audit summaries
```

## Customization

### Local assets and project materials

Website source, deployment files, and implementation documentation belong in this repository (`C:\Users\JD\source\jm`). Original artwork and supporting project materials live separately in `C:\Users\JD\projects\jm`:

- `01-assets/` — brand originals and recovered exports with provenance
- `02-working/` — drafts and generated artwork awaiting curation
- `03-resources/` — references, organization records, and dated raw audit evidence
- `04-exports/` — approved, optimized deliverables ready for website use
- `99-archive/` — retired material

Use lowercase kebab-case for folders. Preserve recovered export attachment names and provenance; use kebab-case for new curated filenames. Copy only approved deployment assets into `public/`, and update references in source. Keep private materials and raw audit evidence outside the public repository.

Public audit summaries belong in `docs/audits/`; actionable findings and priorities belong in [GitHub issues](https://github.com/jmusick/jm/issues). See the [October 12 site audit](docs/audits/2026-10-12.md), [October 14 design and copy review](docs/audits/2026-10-14-design-polish.md), and [October 26 design review](docs/audits/2026-10-26-design-review.md). Each report records its review scope and verification limits.

### Theme

Edit CSS variables in `src/index.css` under `:root`:

```css
--bg: #edf2f6;
--paper: #ffffff;
--ink: #203447;
--brand: #245fcc;
--hero: #18354b;
--control-line: #738698;
```

Keep the `theme-color` meta tag in `index.html` in sync with `--bg`. Use `--control-line` for form-field boundaries and `--line` for decorative dividers.

### Content

Page content lives in `src/App.jsx`. The portfolio data arrays are:

- `experience` — Work history
- `projectGroups` — Project portfolio, grouped (`UnitedHealthcare`, `Personal`)
- `skills` — Base skills list

The introduction, About text, section descriptions, and contact copy are in the component markup. `displayProjectGroups` presents featured personal applications first, UnitedHealthcare projects next, and supporting websites last; entries keep their array order within each displayed group. The `featuredProjectNames` set selects Firelands Current, Tagstash, and The Hidden Lodge for the larger layout. Update that set if those names change. Supporting sites use compact screenshot thumbnails. About and the location/current-role snapshot follow Projects.

For a project screenshot, add the approved image to `public/projects/` and set `image`, `imageWidth`, and `imageHeight` on the project entry. The dimensions are the original image dimensions; CSS displays a responsive 16:10 crop from the top. Repository links need both a URL and its text (`link`/`linkText`, or `secondaryLink`/`secondaryLinkText`). Work projects omit those fields. Screenshot links use `liveLink`.

Each project's `stack` is merged into the skills list. New skills are sorted into categories by the `frontEndSkills`, `backEndSkills`, `softwareSkills`, and `businessSkills` sets, and anything not listed falls into Platforms & Tools. See [AGENTS.md](AGENTS.md) for the details.

If you change the title or role, also update the metadata and JSON-LD in `index.html`.

Content releases update the version in both `package.json` and `package-lock.json` with `npm version <patch|minor> --no-git-tag-version`. Vite exposes that version as `__APP_VERSION__` for the footer. Update `public/sitemap.xml` when page content changes. Do not add a downloadable resume or publish a personal email address.

## License

Personal portfolio — all rights reserved.

## Contact

For inquiries, use the contact form at [justinmusick.com](https://justinmusick.com/#contact) or reach out via GitHub.
