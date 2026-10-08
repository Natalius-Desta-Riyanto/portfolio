# Current prototype verification — 8 October 2026

Active source: `/Users/calculus/Documents/Me-Project/CV/Portfolio-Website/`.

## Verified before final polish

- Astro check: 0 errors, 0 warnings.
- Static build: 36 pages (7 pages per locale + global 404).
- Build checker: 649 internal links/assets valid, one H1 per page, no Math Tutor/Math Mentor/CC Academy or Teaching links in generated HTML.
- In-app browser: five languages checked at 360, 390, 768, 1280 and 1440px; no horizontal overflow. English 390px checked separately after an asynchronous viewport update.
- Data-view switch updates node labels and descriptions; selecting Insight displays its explanatory text.
- Theme switch changes the page from light to dark and the preference survives navigation.
- Analytics project filter displays Credit Risk Analytics and Atlas Retail; reset restores all projects.
- Home exposes four projects, sample experience, toolkit, and mock labels.

## Latest polish

Theme preference now loads before first paint; data-view accent has a separate light-theme value for readability. Build/typecheck are rerun after these edits.

## Scope and limits

Two additional projects and experience entries are fictional, and case-study narratives are sample content, clearly labeled. No real CV or final photo is supplied. No GitHub deployment, Lighthouse audit, or screen-reader audit has been completed. The previous PNGs and browser-report.json in qa/ belong to an earlier visual iteration; current visual verification used the in-app browser. Reduced motion is implemented in CSS and checked in the final browser pass; it is not a claim of a complete accessibility audit.

## Latest: dedicated pages and gradient revision
Typecheck: 0 errors/warnings/hints. Build: 51 pages. Static checks: 1060 valid internal links/assets. Browser: all five primary pages in all five locales at 390 and 1280 pixels (50 combinations), no horizontal document overflow, one H1 per page. Next/previous project navigation verified; video plays with readyState 4 in its enlarged 634px desktop frame. Reduced-motion logic retained but system preference override was not tested this revision. Portrait/CV remain pending real files; Education is sample. GitHub deployment remains unverified.

## Active direction: scrolling portfolio
All primary routes render the full About → Experience → Projects → Education → Contact flow. Navigation is same-page anchor navigation with smooth scrolling and reduced-motion support. Case studies remain separate. Public email and Depok, West Java, Indonesia are sourced from the previous portfolio HTML. No phone number or availability is invented. A local silent blue/cyan background video spans the viewport; pause control and reduced-motion fallback are retained. Violet is removed.

Latest scrolling revision checks: typecheck clean; 51 pages built; 871 internal links/assets valid. Five locales at 390/1280px have all five sections, valid same-page navigation and no document overflow. Contact anchor settled at 110px below viewport top. Background video plays and pause/play control tested after fixing stacking. Email href checked, no message sent. Reduced-motion fallback implemented; OS override not runtime tested.

## Latest responsive, map and brand revision
Original official GitHub black/white SVG and LinkedIn PNG assets are local under public/brands; sources recorded there. Map shows Indonesia through OpenStreetMap, with no Google Maps link. Device viewport checks: 320, 390, 768, 820, 1024, 1280, 1440 pixels across five locales (35 combinations), no document overflow; brand images load. Tablet Contact/map visually reviewed at 820px. Background plays (readyState 4), pause/play tested; light video opacity raised from 0.30 to 0.64. Typecheck: zero errors/warnings/hints. Build: 51 pages, 961 links/assets valid. Tests simulate device viewport sizes; physical iPad/Safari testing is not claimed.
