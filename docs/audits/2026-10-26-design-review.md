# Portfolio design review

The local refinements documented below are included in **v2.2.0**. Statements about uncommitted or unpushed work describe the state during the audit and local review. Production behavior after this release has not been reverified.

Reviewed the live [justinmusick.com](https://justinmusick.com/) site on October 26, 2026, using the design-taste skill in audit mode. The deployed footer identifies v2.1.2. Website code, content, and production settings were not changed. The After column below describes proposed changes, not completed work.

Follow-up work is tracked in [design issue #11](https://github.com/jmusick/jm/issues/11), with the existing `feature`, `accessibility`, and `p2` labels. The earlier review is in [the October 14 report](2026-10-14-design-polish.md).

The existing identity is worth keeping: navy and white, the JM mark, Sora headings, Source Sans 3 body text, real project previews, and plain descriptions. The strongest improvement would be to bring the work forward and give supporting projects less space. A new palette, font system, decorative animation, or additional cards would not solve the page's main problem.

## Tells

No new cluster of generated-design tells was found. The skill's source checker scanned five files with **0 FAIL and 0 WARN**. Visual inspection found no gradient headlines, decorative status dots, repeated eyebrow labels, numbered sections, or ornamental motion.

Repeated project layouts are defensible because readers need to compare actual projects. The issue is their relative scale and placement, covered under Critique. The footer version stays because the repository requires it.

## Floor

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| HIGH | `src/App.css:616`; `src/index.css:12`; `src/index.css:15` | Hovering Contact me produces `#18354b` text on `#7b96aa`, measured at **4.11:1**. The label is 16px, weight 600, so it needs 4.5:1. | Choose a hover foreground/background pair that clears 4.5:1; verify the resting, hover, pressed, and focus states together. Keep the existing palette and control size. | The normal state passes, but the hovered text falls below the skill's text contrast floor. |
| LOW | `src/App.css:182`; `src/App.css:215`; `src/App.css:354` | On mobile, featured project titles remain 26.4px while the Projects section title falls to 22.4px. Group headings are only 16.8px. | Make section, group, and project heading sizes form a clearer hierarchy at each breakpoint. Keep the semantic heading levels. | The large project names are useful, but section boundaries become less apparent on a long phone page. This is visual hierarchy, not a claim that the HTML heading structure is broken. |

At both checked widths, site-owned links, buttons, disclosures, and visible form inputs met 44px in each dimension; supporting text was at least 16px; and no horizontal overflow was measured. All seven project images loaded. Their dimensions are declared in the markup. The skip link received visible keyboard focus at both widths after rendering settled.

Measured contrast ratios also pass for main text on white (12.78:1), muted text on white (5.86:1), brand text on its pale-blue fill (5.03:1), input borders on white (3.76:1), main hero text (11.93:1), and secondary hero text (8.29:1).

## Motion

No motion finding. Source inspection found short button/chevron transitions and existing reduced-motion overrides, with no repeated entrances, hover lifts, or decorative loops. Captures used reduced motion. No animation should be added for this refinement.

## Critique

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| MEDIUM | `src/App.jsx:607`; `src/App.jsx:643`; `src/App.jsx:670`; `src/App.jsx:682`; `src/App.css:52`; `src/App.css:708` | On a 390px-wide phone viewport, navigation and hero occupy about 884px. About and three enterprise summaries follow; the first project screenshot begins at **y=2,413px**. On desktop it begins at y=1,713px. | Bring the featured applications closer to the introduction. Move the full About paragraph later and reduce the mobile snapshot's prominence while retaining its facts. Keep enterprise experience adjacent to the featured work so the Java/healthcare positioning remains clear. | The opening explains the engineer but delays the visible evidence. The first screen should establish identity and make the work feel close at hand. |
| MEDIUM | `src/App.css:226`; `src/App.css:339`; `src/App.jsx:158`; `src/App.jsx:171`; `src/App.jsx:184`; `src/App.jsx:198` | At 1440px, featured previews measure about **683 × 427px**; each supporting website preview is almost as large at **630 × 394px**. The four supporting sites occupy two substantial rows. Projects consume about 3,581px of desktop height and 5,184px on mobile. | Keep Firelands Current, Tagstash, and The Hidden Lodge as the primary application studies. Use a more compact supporting gallery for Simon Rook, Dorian Black, JD Musick, and Pneumaris Band, preserving every description, technology list, and link. | The current image scale gives supporting sites nearly the same prominence as the applications. Stronger size differences would make the intended priorities visible and shorten the path to Experience. |
| LOW | `src/App.jsx:124`; `src/App.jsx:139`; `src/App.jsx:153`; `src/App.css:273` | The featured screenshots show the public homepages; Tagstash and The Hidden Lodge lead with branding and introductory content rather than their application's working interface. | As a later asset improvement, consider approved screenshots of an actual bookmarking view or guild operations screen. Review them for private data before publication. Preserve the existing assets until replacements are approved. | The descriptions already explain substantial engineering work. An interface view would provide more direct visual evidence than another homepage hero. No replacement image or new factual claim is supplied by this audit. |

The desktop opening has a clear dominant name and readable supporting copy. The mobile layout is composed properly rather than overflowing, but its content sequence makes it long: the captured page is **10,724px** tall at 390px width, with Contact starting at y=9,722px. The 1440px capture is **7,397px** tall. These measurements describe the checked 900px-tall browser contexts; they are not visitor-behavior analytics.

The Skills lists and experience disclosures already use restrained, readable layouts. They do not need another visual treatment in the first refinement batch. The compact 140px Turnstile challenge rendered when Contact was scrolled into view; its reserved space is not an unexplained empty block.

## Validation and limits

- Live full-page and first-screen captures at 1440 × 900 and 390 × 900, with fonts and project images loaded. Every capture was opened and inspected. A second capture round inspected the same widths plus contact, skills, a featured project, and button hover. No design edits were made between rounds.
- Design-taste source checker: 0 FAIL, 0 WARN across five files.
- `npm run lint`: passed.
- `npm run build`: passed. Vite emitted a configuration compatibility warning about the JSON import in `vite.config.js`; it did not prevent the build.
- Site-owned target dimensions, text sizes, horizontal overflow, image loading, initial skip-link focus, and the settled Contact me hover colors were measured in the browser.
- No sample content, invented proof, or new claims were added. No tell was retained at the brief's request. The existing footer version is retained by repository convention.
- **Not verified:** the user's own viewport, other widths, real touch hardware, screen-reader behavior, complete keyboard traversal, contact submission and email delivery, and Cloudflare dashboard controls. Third-party challenge contents were not included in the site's target-size audit.
- The production console confirms the existing Cloudflare analytics beacon CSP block, already tracked in [issue #9](https://github.com/jmusick/jm/issues/9). Turnstile also emitted console messages within its challenge context during the headless run; these do not establish that the contact form fails for visitors. No analytics or challenge configuration was changed.

Raw screenshots, browser measurements, and capture scripts remain in the separate local asset workspace under `03-resources/audits/2026-10-26/`. They have not been copied into the public repository. No commit, push, or deployment was performed.

## Local refinement after editor review

The editor subsequently requested implementation in local dev. The changes below are implemented locally, superseding the proposal status above. The site remains uncommitted and unpushed; production has not changed. The dev preview runs at `http://127.0.0.1:5174/` and was opened in the editor's Browser panel.

### Tells

The existing palette, fonts, monogram, factual copy, project images, technology lists, and links are retained. No new claims, sample content, decorative effects, or animation were introduced. The three application previews remain large because they carry the main evidence; supporting sites now use smaller thumbnails.

### Floor

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| HIGH | `src/App.css:648` | Contact me hover contrast was 4.11:1. | The hover background uses the existing hero-muted token, giving **8.29:1** against the unchanged foreground. | The button clears the text contrast floor. Its focus outline and touch target remain intact. |
| LOW | `src/App.css:190`; `src/App.css:223`; `src/App.css:362` | Mobile project titles outweighed section headings. | Mobile section, project group, and featured project headings now measure **28.8px, 24px, and 21.6px**, respectively. | Readers can distinguish the section from its groups and entries. |

### Motion

No new motion. Existing hover-capable media queries, keyboard focus styles, and reduced-motion overrides remain.

### Critique

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| MEDIUM | `src/App.jsx:214`; `src/App.jsx:630`; `src/App.jsx:767`; `src/App.css:52`; `src/App.css:133` | The snapshot and About paragraph preceded the projects; enterprise rows preceded the first screenshot. | Hero identity and introduction share two desktop columns and stack on mobile. Projects follow immediately: personal applications, healthcare work, then supporting websites. About includes the relocated snapshot below Projects. | The first project screenshot moves from approximately **2,413px to 813px** down the mobile page, and from **1,713px to 607px** on desktop. All ten projects and all original facts remain. |
| MEDIUM | `src/App.css:377` | Supporting screenshots were nearly as large as featured previews. | Supporting images measure about **158 × 99px** on desktop and **110 × 69px** on mobile, next to each site's name. Descriptions, stacks, and actions use the full entry width below. Featured previews retain their previous size. | Image scale now distinguishes application studies from supporting sites without cutting their content. |

### Local validation

- Design-taste source check: **0 FAIL, 0 WARN**. ESLint and the production build pass; the existing Vite JSON-import compatibility warning remains.
- Two local screenshot rounds at 1440px and 390px, including full page, opening viewport, supporting gallery, and About. Every capture was opened and inspected. The visible Browser viewport was also inspected and captured.
- No horizontal overflow measured at 320px, 390px, 768px, 1024px, or 1440px.
- All seven project images loaded. At 390px and 1440px, no measured site-owned target was below 44px in either dimension and no supporting text was below 16px.
- Initial keyboard focus reveals the skip link; Enter moves to `#main`. Enter opens an older experience role and restores the current role. Empty form submission focuses Name through native validation; no request or email was sent.
- No console errors were captured during the local layout checks. Measured page heights are approximately **6,727px desktop** and **10,051px mobile**; preserving the complete career history and technology lists still makes this a long page.
- README and AGENTS guidance now describe `displayProjectGroups`, `featuredProjectNames`, and the revised section order. The sitemap date is October 26, 2026. No release or version bump was performed for this local review.
- **Deferred:** replacement application-interface screenshots require approved assets. Existing previews remain in use.
- **Not verified:** screen-reader behavior, real touch hardware, complete keyboard traversal, production deployment and CSP for these changes, and contact API/email delivery. Vite does not serve the Pages contact Function.

Local capture files remain outside the public repository. No commit, push, dashboard change, or production deployment was performed.
