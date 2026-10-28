# Portfolio refresh verification — 28 October 2026

Scope: curated project selection, two new case studies in five languages, profile positioning, canonical repository links and calmer visual presentation.

- Astro check: 21 files, 0 errors, 0 warnings, 0 hints.
- Static build: 56 generated pages.
- Static validation: 1,715 internal links/assets resolve; one H1 per page.
- Browser preview: five projects render in curated order, all five project images load, no ambient video.
- Responsive checks: 360, 390, 768, 1280 and 1440 px; no horizontal overflow. One project column at mobile widths, two at larger widths.
- Mobile locale checks: Indonesian, Japanese, German and Chinese homepages; five projects present and no horizontal overflow.
- Padun case study: implementation tab opens, keyboard Home selects first tab; EN to ID language switch retains the project route.
- Mobile menu opens and closes with Escape; theme switch changes the rendered theme.
- Reduced-motion CSS removes decorative project/button transforms and transitions; a separate OS-level reduced-motion emulation was not performed.
- Source privacy: public GitHub actions only for the two public analytical repositories. Private-source projects retain public case studies and a source label. Repo visibility and permissions were not changed.

The existing browser-check script was aligned with the visible selection, anchor navigation and Pages base path. Browser interaction checks above were performed through the connected browser; the terminal browser suite was not run.

No Lighthouse or screen-reader certification is claimed. Deployment verification is recorded in the delivery response after the Pages workflow completes.

## Isolated Sakuara demo

- Source branch: private Desta-Platform/Sakuara, portfolio-demo, commit af9a34b. Personal main and its production deployment were not changed.
- Demo build and ordinary production build both typechecked and built. Source lint passed after excluding the generated dist-demo directory.
- Artifact verification: public demo login present only in demo build; no embedded Supabase endpoint/key; connect-src none CSP; static base path under /portfolio/demo/sakuara/.
- Browser: quick login, six-account synthetic seed, create a fictional account, refresh persistence, reset to original seed, accounts and analytics hash navigation.
- Existing Sakuara dependency findings remain separate from this release; no security certification is claimed.
