# UI audit and shadcn-style refresh — 30 October 2026

Implemented locally. Not deployed, not pushed.

## Audit findings (before)

| Area | Finding | Impact |
|---|---|---|
| CSS | `global.css` (75 KB) + `curated.css` (95 KB) layered three earlier palettes (green → teal → blue) with heavy `!important` overrides | Hard to change safely; 170 KB of CSS for a small static site |
| Typography | Arial display with −0.065em tracking (letters touching), Avenir body, generic `monospace` resolving to Courier | Three unrelated faces; labels looked dated |
| Hero | Name repeated twice; generic laptop/chart illustration | Design system already forbade "floating tech badges"; the real portrait was hidden further down |
| Projects | One-card carousel on the home page despite README saying "grid replaces carousel"; composed cover clipped its own tagline | Recruiters saw 1 of 5 projects without clicking |
| Education | Large empty band above the section on desktop | Looked broken |
| Case study | Tabs hid 3 of 4 sections; floating "Projects" arc overlapped the content edge at 1440 px | Reading a case study required extra clicks |
| Meta | `viewport` lacked `initial-scale=1`; theme ignored `prefers-color-scheme` | Minor |
| Tests | `browser-check.mjs` opened `/portfolio` without a trailing slash (404 on Astro preview) | Skip-link check could not pass locally |

## Changes

- One stylesheet, `src/styles/site.css` (~23 KB built), with shadcn/ui token names (`background`, `foreground`, `muted`, `muted-foreground`, `border`, `ring`) and neutral surfaces plus one blue accent. Light and dark themes; the default follows the system preference until the visitor chooses.
- System UI font stack and `ui-monospace`; no web-font download.
- Hero: status badge (current T-NEX role, from existing content), headline, intro, primary/outline actions, real portrait. Build/Analyze cards keep the factual toolsets.
- Projects: always-visible grid. Padun and LendSight are larger featured cards; the order is unchanged. Each card has a real screenshot, status badge, summary, evidence, stack tags and actions.
- Case study: all four sections are visible, with a sticky "On this page" table of contents and a "More projects" strip with next-project link (replacing the hover arc).
- Contact: one card with mailto button, progressive "Copy email" button, social links and topics.
- Fixes: heading levels (role titles are now H3 under the Experience H2), CJK headlines use `word-break:auto-phrase`, no horizontal overflow at 320–1440 px in all five locales.
- Removed unused components (MotionHero, SystemExplorer, ProjectSlider, ProjectArt, Projects, StudioIllustration, ProjectVisual) and the carousel, tab and arc scripts.

Section order, routes, locales, project order and all content claims are unchanged.

## References

- [shadcn/ui theming](https://ui.shadcn.com/docs/theming): token names and the neutral palette structure.
- [Brittany Chiang](https://brittanychiang.com/): text-first experience entries with tech tags, résumé link, project cards with screenshots.
- [Magic UI portfolio template](https://portfolio-magicui.vercel.app/), built on shadcn/ui: consistent project cards with image, tags and Website/Source actions.

Pages were read as text through a fetch tool, not inspected visually. No code or assets were copied.

## Verification

- `astro check`: 0 errors, 0 warnings, 0 hints.
- `npm test`: 61 pages, all internal links and assets resolve, one H1 per page, focused routes and home section order hold.
- `npm run test:browser` (system Chrome, local preview): 5 locales × 360/390/768/1280/1440, mobile menu, language retention, skip link, Escape, reduced motion and no-JS content pass.
- Manual: theme toggle persists across reloads, copy email writes to the clipboard, CV returns `application/pdf`, TOC highlights the current section, no broken images, no console errors.

Not done: Lighthouse, screen-reader pass, Safari and Firefox, and deployment.

## Recommendation not implemented

Move Projects directly after the hero. Recruiters scan work first. The current order is the owner's documented choice and is enforced by `scripts/check-build.mjs`, so it was left unchanged.

## Owner revision (same day)

- **No duplicate actions.** Removed the "Next project" button, the second CV button on the home page, the project title links that duplicated "Project overview", the hero Build/Analyze links (now static cards in About), and the footer contact links that repeated the Contact section.
- **Project switcher.** Case pages have an "All projects" back link and a "More projects 0X / 05" trigger. The trigger opens a native `popover` overlay that also works without JavaScript; ✕, Esc and an outside click close it.
  - **Desktop and tablet:** cards fan up from the bottom edge along a semicircle. The centred project is sharp and the other cards blur by distance. Arrow buttons, the keyboard and drag rotate the arc; the page behind is blurred.
  - **Phones (≤640px):** the same overlay is a bottom sheet with horizontally snapping cards. The card in the centre stays sharp.
- **Lighter project list.** Cards drop the evidence line (moved to "Highlights" on the case page), clamp the summary to two lines and use outline tags. The grid has more space.
- **Section navigation.** Every home section is at least one viewport tall below the 64px header, so a menu jump lands exactly on that section. Short sections are filled with existing content: About note and practice cards, open first role details, open campus activities, 2×2 skills, and a taller contact card.
