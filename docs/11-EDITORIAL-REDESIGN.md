> Update 29 October: the owner requested a continuous homepage in addition to separate routes. Home now contains Intro, About, Skills, Experience, Education, all five Projects and Contact. Native home anchors are retained. The palette is now clean white/charcoal/cobalt; repeated decorative arrows were removed in favor of purposeful grid, mail and play icons. This supersedes the earlier short-home and teal decisions below.

# Portfolio editorial redesign — 29 October 2026

Implemented locally; no deployment, push, or repository visibility changes.

## Navigation and composition

Home → About → Skills → Experience → Education → Projects → Contact.
Routes under `/portfolio/`: `/`, `about/`, `skills/`, `experience/`, `education/`, `work/`, `contact/`, and `work/{slug}/`. English plus `id/`, `ja/`, `de/`, `zh/`. Home shows a short introduction and two featured projects. Dedicated routes contain only their subject; case studies keep Projects active. Legacy home hashes redirect to the appropriate route.

Padun and LendSight lead, followed by Credit Risk Analytics, Stockwise, and Sakuara. Covers compose real screenshots instead of fabricated dashboards. Source links are shown only for public repositories; demos carry explicit synthetic/observed/browser-local context.

## Visual decisions

Warm off-white canvas, ink text, teal interaction accents and restrained copper metadata. Bold Arial display and system body fonts avoid external font downloads. Open editorial layouts retain breathing room; rounded buttons, 18px image surfaces, 10px small surfaces and gently rounded menus respond to the owner's preference against rigid rectangles. Text sections remain unboxed. Lightweight hover transitions respect reduced motion. WebP replacements reduce the three principal images to about 259 KB combined.

## References consulted

- [shadcn navigation menu](https://ui.shadcn.com/docs/components/base/navigation-menu): coherent navigation and control states, implemented in the existing Astro stack.
- [Radix navigation menu](https://www.radix-ui.com/primitives/docs/components/navigation-menu): keyboard/focus and active-route conventions; native disclosure menus retain Escape behavior.
- [Tiger portfolio](https://tiger.exposed/): direct personal voice and work-led content grouping. Text/content reference; not a pixel-for-pixel visual reproduction.
- [Lucide](https://lucide.dev/guide/): consistent SVG icons. Selected assets and ISC license are included locally.

An Awwwards request timed out; it was not treated as an inspected reference.

## Verification

- Astro check: 26 files, zero errors, warnings or hints.
- Build: 61 static pages; 1,748 internal link/asset references pass; one H1 per page.
- Route isolation: 30 focused pages; correct Projects state on 25 case pages.
- Browser checks during this redesign: all seven page types at 360, 768 and 1440px; additional 390px checks across locales. No horizontal overflow found. Mobile navigation, Escape, direct refresh, Back/Forward, case tabs, language retention and legacy hash routing checked.
- Final navigation/radius revision: 1440px and 390px screenshots, About mobile navigation closes its menu and highlights the destination; no console errors in the final browser tab. Project titles use H2 on the index and H3 in the home preview.
- Existing published release audit: 62 URLs passed HTTP checks (see `qa/live-links.json`); primary demo flows exercised for Padun, LendSight, Credit Risk, Stockwise and Sakuara. This predates publishing new Skills routes and does not imply the redesign is live.
- Sakuara demo build guard verifies quick login, connection-blocking CSP and absence of Supabase project configuration.

No lint script exists. Browser checks were performed through the connected browser; the standalone Playwright script was updated but not executed. This is not comprehensive screen-reader, cross-browser, Lighthouse, WCAG certification, security or every-feature demo testing. Hosted demo startup can take several seconds. Personal Sakuara was not changed.

Screenshots: `../../outputs/portfolio-redesign-desktop.png`, `../../outputs/portfolio-redesign-mobile.png`, `../../outputs/portfolio-redesign-projects.png`.

## Product-designer refinement

Directly inspected Adham Dannaway's homepage in the browser (https://www.adhamdannaway.com/): adapted its clear dual-discipline hierarchy into localized Build / Analyze links with factual toolsets and project examples. No portrait treatment or assets were copied. Read Pablo Stanley's portfolio (https://www.pablostanley.com/) as a reference for concise project indexing; no claim of visual inspection of that site.

Project selection now includes real thumbnail previews, names and categories. Active selection is indicated with border, underline and aria-pressed. Mobile selector scrolls horizontally. About contains compact education/location facts. Existing single-page anchor navigation and focused scrolling remain intact.

Latest verification: Astro check zero errors/warnings; 61 pages and 1,923 internal link/assets pass. Mandarin desktop 1440px and mobile 390px have no page overflow; selecting LendSight and Sakuara updates the carousel and active selector. Local preview server restarted on port 4322. No deployment.

## Project usability and organization identity

Project controls are grouped beside the visual selector. Changing slides keeps the selected thumbnail in view on mobile. Detail pages now have a compact return-to-projects breadcrumb, factual role/demo context, and a consistent cropped screenshot preview. Root entry remains English; explicit language URLs retain their selected language. No browser-language redirect was introduced.

T-NEX official white logo and yellow UI Makara added in the relevant experience/education sections; sources and UI publication permission caveat documented in `public/brands/SOURCES.md`. UI vector copy is from Logorary after official asset download failures. Further Simon Pan and Liz Wells reference requests failed; no claim of inspecting their visual design is made.

Browser checks: English default; Padun detail at desktop/mobile without horizontal overflow; 340px desktop preview; mobile carousel selecting Sakuara reports 05/05 and active selection; T-NEX loads at natural width 147px; yellow UI logo inspected in both themes. No deployment performed.


### Project arc polish (2026-10-30)
- Reference: Magic UI Dock (https://magicui.design/docs/components/dock), for focus magnification; Radix Navigation Menu (https://www.radix-ui.com/primitives/docs/components/navigation-menu), for navigation and focus patterns. Original Astro/CSS implementation, no copied code or new dependency.
- Arc links retain real navigation semantics, active project labels, arrow/Home/End keyboard navigation, Escape dismissal, pointer grace delay, and reduced-motion support.
- Case tabs have a subtle entrance and a straight active underline; desktop compact layout retained.
