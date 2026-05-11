# Justin Musick — Portfolio

A modern, interactive portfolio and resume site built with React and Vite. Features a professional design, complete work history, project showcase, and contact form.

## Features

- **Interactive Experience Timeline** — Accordion-style expandable work history with full role descriptions and achievements
- **Project Showcase** — Organized portfolio with 6+ projects, including live links and GitHub repositories
- **Skill Categorization** — Skills organized into Front End, Back End, Software, and Business categories
- **Contact Form** — Web3Forms integration with hCaptcha spam protection
- **Dark Theme** — Neutral slate color palette optimized for readability
- **Responsive Design** — Adapts to mobile, tablet, and desktop viewports
- **Fast Performance** — Built with Vite for rapid development and optimized production builds
- **Cloudflare Pages Ready** — Includes _headers and wrangler.toml for seamless deployment

## Tech Stack

- **Frontend:** React 19, Vite 8
- **Icons:** react-icons (Feather set)
- **Forms:** Web3Forms + hCaptcha
- **Fonts:** Manrope, Plus Jakarta Sans, IBM Plex Mono
- **Deployment:** Cloudflare Pages

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jmusick/jm.git
   cd jm
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the local dev server:

```bash
npm run dev
```

Alternatively, use VS Code's Run & Debug feature:
1. Open the Run and Debug panel (Ctrl+Shift+D)
2. Select "Run Vite Site (Firefox)"
3. Click Start Debugging

The site will open in Firefox at http://localhost:5173

### Building

Build for production:

```bash
npm run build
```

Output is in the `dist/` directory.

Preview the build locally:

```bash
npm run preview
```

## Deployment

This site is deployed on Cloudflare Pages at **justinmusick.com**.

### Cloudflare Pages Setup

1. Connect your GitHub repo to Cloudflare Pages
2. Configure build settings:
   - **Framework preset:** React (Vite)
   - **Build command:** npm run build
   - **Build output directory:** dist
3. Cloudflare will auto-deploy on push to the `master` branch

The included `wrangler.toml` and `public/_headers` files handle Workers configuration and HTTP headers.

## Environment Variables

If using Web3Forms with a custom access key, add to `.env.local`:

```
VITE_WEB3FORMS_KEY=your_access_key_here
```

(Currently configured for form submission with embedded key.)

## Project Structure

```
src/
├── App.jsx          # Main component with all content
├── App.css          # Component styling
├── index.css        # Global styles and theme variables
└── main.jsx         # React entry point

public/
├── _headers         # Cloudflare cache & security headers
├── bg.png           # Hero background image
└── projects/        # Project screenshot images

wrangler.toml        # Cloudflare Workers config
package.json         # Dependencies and build scripts
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

All content (experience, projects, skills) is in `src/App.jsx`. Update the data structures:
- `experience[]` — Work history
- `projectGroups[]` — Project portfolio
- `skills[]` — Core skills list

### Form

- **Access Key:** Web3Forms key is in handleFormSubmit
- **CAPTCHA:** Using hCaptcha free tier (site key: `50b2fe65-b00b-4b9e-ad62-3ba471098be2`)

## License

Personal portfolio — all rights reserved.

## Contact

For inquiries, use the contact form at justinmusick.com or reach out via GitHub.

