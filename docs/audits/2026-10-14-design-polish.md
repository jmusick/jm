# Portfolio design and copy review

Reviewed October 14, 2026 using the design-taste and humanize skills. Work is tracked in [issue #11](https://github.com/jmusick/jm/issues/11). At review time, the changes were local in v2.0.1 and had not been deployed. They are included in the v2.1.0 release prepared October 15, 2026.

## Tells

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| MEDIUM | `src/App.css:242` | Three matching enterprise project boxes compressed titles, descriptions, and technology lists into narrow columns. | Project titles sit beside descriptions and stacks on desktop, then stack vertically on mobile. | Readers can compare the actual work without the repeated card framing. |
| MEDIUM | `src/App.css:446` | Every skill had a filled chip. | Each category has a plain two-column list. | Typography carries the content and the long platform names remain readable. |

## Floor

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| HIGH | `src/App.css:39`, `src/App.css:122`, `src/App.css:314`, `src/App.css:570` | Navigation, profile, project, and footer links included targets smaller than 44px. | All rendered links, buttons, and disclosures measure at least 44px in each dimension at the checked desktop and mobile widths. | Larger targets are easier to select on a phone. |
| HIGH | `src/index.css:9`, `src/App.css:483` | Form borders used the light divider token, approximately 1.45:1 against white. | A dedicated control border token measures 3.76:1 against white. Hero button borders measure 4.11:1 against the hero background. | Controls have visible boundaries. |
| MEDIUM | `src/App.css:310`, `src/App.css:395`, `src/App.css:446` | Technology lists, dates, footer, and other supporting text used sizes below 16px. | Supporting text is at least 16px; project descriptions and experience bullets use the main ink color. | Dense information is easier to read. |
| LOW | `src/App.jsx`, `src/App.css:269` | Screenshot images lacked explicit HTML dimensions. | Each image has its actual width and height, with a consistent CSS crop and responsive height. | Layout space is reserved while previews load. |
| LOW | `src/index.css`, `index.html` | Browser color scheme, scrollbar colors, and theme color were unspecified. | Native browser surfaces use the existing palette. | The surrounding controls match the page. |

## Motion

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| LOW | `src/App.css` | Hover feedback applied regardless of input type. | Hover feedback is inside the hover-capable media query; links and disclosures also have press feedback. | Touch interaction does not leave hover styling stuck. Existing reduced-motion overrides remain in place. |

No entrance animations or decorative motion were added.

## Critique

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| MEDIUM | `src/App.css:50`, `src/App.css:692` | Mobile snapshot labels and values occupied separate rows, extending the hero. | Labels and values share rows; hero spacing is tighter. | The introduction takes less scrolling while retaining every fact. |
| MEDIUM | `src/App.jsx` | The Hidden Lodge appeared after four smaller sites, apart from the other two featured applications. | The three larger application projects appear together, followed by the four smaller sites. | The project sequence better supports an engineering portfolio. |
| MEDIUM | `src/App.jsx`, `src/App.css:314` | Repository and live-site links occupied separate rows with similar visual weight. | The live site is the first, outlined action alongside repository links. | The next action is easier to identify. |
| LOW | `src/App.jsx`, `src/App.css:84` | The role could wrap within Full-Stack. | Full-Stack stays together. | The headline reads as a role rather than broken text. |

The palette, monogram, typefaces, project screenshots, factual claims, roles, dates, technologies, and links are retained. The restrained navy treatment fits an enterprise software engineer. Two-column galleries remain for the four smaller sites because the actual screenshot imagery provides useful variety. The footer version remains because it is a repository requirement.

## Copy

- The introduction uses first person and shorter sentences.
- Project descriptions explain the work without phrases such as “official web presence” and “delivered backend and UI modernization.”
- Stilted experience bullets use direct verbs, including “ran,” “prepared,” “worked,” and “review.”
- All roles, dates, proper names, numbers, technical capabilities, and stated outcomes were checked against the original copy. The move toward technical leadership and engineering management remains an aspiration.
- No sample content or new claims were added.

## Validation and limits

- `npm run lint`: passed.
- `npm run build`: passed.
- Design-taste source lint: 0 FAIL, 0 WARN.
- `git diff --check`: passed.
- Full-page before and after screenshots: desktop at 1440px and mobile at 390px. A 1280px working preview was also inspected. Lazy images were loaded before final capture.
- Additional overflow checks at 320px and 768px: no horizontal overflow found.
- Target measurements at 1440px and 390px: no links, buttons, or disclosures below 44px in either dimension.
- Keyboard checks: the skip link receives visible focus; Enter changes the experience disclosure and restores the current role.
- Empty form submission: native required-field validation focuses Name; no email was sent.
- Contrast calculations: ink/white 12.78:1, muted/white 5.86:1, brand/white 5.86:1, brand/soft-blue 5.03:1, hero text/background 11.93:1, hero secondary text/background 8.29:1.
- Local browser console: no captured warnings or errors in the final desktop check.

Screenshots and raw measurements are stored in the separate local asset workspace, outside the public repository. No Cloudflare dashboard settings were inspected or changed. Production deployment, production CSP enforcement, email delivery, and screen-reader behavior were **not verified** in this pass. The Vite preview does not serve `/api/contact`.

The remaining limitation is density: full technology lists and the detailed career history still make this a long page, especially on mobile. They were kept to preserve the supplied information.
