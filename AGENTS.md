# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project

Personal portfolio and resume site for Justin Musick, served at https://justinmusick.com. It is a single-page React 19 + Vite 8 app deployed on Cloudflare Pages, which auto-deploys on push to `master`.

## Commands

```bash
npm install        # install dependencies
npm run dev        # dev server at http://localhost:5173
npm run build      # production build to dist/
npm run preview    # serve the production build locally
npm run lint       # ESLint (flat config in eslint.config.js)
```

Requires Node 20.19+ or 22.12+ (Vite 8).

`npm run dev` does not serve the contact form's `/api/contact` endpoint. To exercise it locally, copy `.dev.vars.example` to `.dev.vars` (git-ignored), then run `npm run build && npx wrangler pages dev dist`. On `localhost`/`127.0.0.1` the page uses Cloudflare's always-pass Turnstile test site key, which pairs with the test secret in the example. A real `CF_EMAIL_API_TOKEN` in `.dev.vars` sends real email.

There is no test suite. Before you finish a change, run `npm run lint` and `npm run build`. Lint ignores `dist/` and Wrangler's generated `.wrangler/` folder.

## Layout

```
index.html                # <head> SEO: title, meta description, Open Graph, Twitter, JSON-LD
src/App.jsx               # the whole page: content data, contact form and markup in one component
src/App.css               # component styles
src/index.css             # global styles, Google Fonts import, theme tokens (CSS variables on :root)
src/main.jsx              # React entry point
functions/api/contact.js  # Pages Function: POST /api/contact (Turnstile check + Cloudflare Email Sending)
public/_headers           # Cloudflare security (CSP, HSTS) and cache headers
public/sitemap.xml        # sitemap (update <lastmod> when content changes)
public/robots.txt
public/projects/          # project screenshots, referenced as /projects/<name>.png
vite.config.js            # injects __APP_VERSION__ from package.json
wrangler.toml             # Cloudflare Pages config: project name, compatibility date, plaintext [vars]
.dev.vars.example         # template for local Function secrets (.dev.vars is git-ignored)
```

`src/assets/` holds leftover template files (`hero.png`, `react.svg`, `vite.svg`) that nothing imports.

## Editing content

All content lives in data arrays at the top of `App()` in `src/App.jsx`:

- `skills`: the base skills list.
- `projectGroups`: project groups (`UnitedHealthcare`, `Personal`). Each project takes `name`, `description` and `stack` (a comma-separated string), plus optional `liveLink`/`liveLinkText`, `link`/`linkText`, `secondaryLink`/`secondaryLinkText`, `image`, and `showGithub: false` for work projects that have no public repo.
- `experience`: roles, each with `title`, `company`, `range` and `bullets`.

The skills section is derived from these arrays, so keep it consistent when you edit them:

- Every item in a project's `stack` is merged into the skills list automatically.
- `skillAliases` maps a stack name to its displayed skill name, for example `Cloudflare Pages` becomes `Cloudflare Pages & Workers`.
- `globalSkillExclusions` hides stack items that should not appear as skills.
- The `frontEndSkills`, `backEndSkills`, `softwareSkills` and `businessSkills` sets choose each skill's category. A skill that is in none of them falls into "Platforms & Tools", so add new skills to the right set.

To add a project, add a screenshot to `public/projects/`, add an entry to the right group in `projectGroups`, and check where any new stack items land in the skills categories.

If you change the headline, title or role, update `index.html` to match: `<title>`, meta description, OG and Twitter tags, and the JSON-LD block.

## Conventions

- Plain JavaScript and JSX, not TypeScript. Match the existing style: 2-space indent, single quotes, no semicolons.
- Icons come from `react-icons/fi` (the Feather set) only.
- Theme colors are CSS variables in `src/index.css`. Reuse them instead of hard-coding colors.
- The contact form posts to `/api/contact`, a Pages Function that verifies Cloudflare Turnstile server-side and sends through the Cloudflare Email Sending REST API. The Turnstile site key in `App.jsx` is public; on localhost it switches to Cloudflare's always-pass test key.
- Plaintext Function config (`CF_ACCOUNT_ID`, `EMAIL_FROM_CONTACT`, `TURNSTILE_HOSTNAMES`) goes in `wrangler.toml` `[vars]`, which Pages treats as the source of truth. Secrets (`CF_EMAIL_API_TOKEN`, `TURNSTILE_SECRET_KEY`, `CONTACT_TO_EMAIL`) live only in the Pages dashboard or a local `.dev.vars`. Never commit them. The Function returns 503 if any of the six is missing.
- `name` in `wrangler.toml` must stay `jm`, matching the Pages project. If the site gets a new domain, add it to `TURNSTILE_HOSTNAMES` and to the Turnstile widget's hostnames in the Cloudflare dashboard.
- Functions code in `functions/` follows the same JS style and is linted with the rest of the repo.
- Do not publish a personal email address anywhere (page, `index.html` meta or JSON-LD, or committed config; the repo is public). All contact goes through the form.
- Do not add a downloadable resume to `public/`. It was removed on purpose.

## Security headers

`public/_headers` sets an enforced `Content-Security-Policy`, HSTS and the usual hardening headers for every path. The CSP allows only:

- `'self'` for scripts, styles, images, `fetch` (`/api/contact`) and form posts.
- `https://challenges.cloudflare.com` in `script-src` and `frame-src`, for the Turnstile widget.
- `https://fonts.googleapis.com` in `style-src` and `https://fonts.gstatic.com` in `font-src`, for the Google Fonts import in `src/index.css`.

It has no `'unsafe-inline'`, so:

- Do not add inline `<script>` or `<style>` blocks, `on*` attributes or `javascript:` URLs. The JSON-LD `<script type="application/ld+json">` in `index.html` is data, so CSP does not block it.
- Any new third-party script, font, iframe, image or API origin must be added to the matching directive in the same change, or it fails silently in production. Check the browser console for CSP violations.
- If Cloudflare Web Analytics is turned on, it injects a beacon that needs `https://static.cloudflareinsights.com` in `script-src` and `https://cloudflareinsights.com` in `connect-src`.

`npm run dev` does not apply `_headers`. To test headers locally, use `npm run build && npx wrangler pages dev dist`.

## Accessibility

Keep these in place when editing markup or styles:

- The first rendered element is a `.skip-link` to `<main id="main">`. Keep the `id` if you restructure `<main>`.
- Form fields show a visible `:focus-visible` outline, not just a border color change. Do not remove outlines without a replacement that does not rely on color alone.
- A global `@media (prefers-reduced-motion: reduce)` block in `src/App.css` cuts animations, transitions and smooth scrolling. New animations are covered automatically.
- There is exactly one `<h1>`, and heading levels do not skip. Decorative icons get `aria-hidden="true"`, and every form field has a real `<label>`.
- `TODO.md` is a local, git-ignored working checklist. Do not commit it.

## Versioning and commits

- The footer shows the `package.json` version through `__APP_VERSION__`. Content releases bump the version in both `package.json` and `package-lock.json` (`npm version <patch|minor> --no-git-tag-version`).
- Commit messages use Conventional Commit style, for example `release: add <project> for v1.7.0`, `fix: ...` or `chore(release): ...`.
- Work goes straight to `master`, which deploys to production. Do not push unless asked.
