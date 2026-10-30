# Natalius Desta Riyanto — Portfolio

[Live portfolio](https://natalius-desta-riyanto.github.io/portfolio/)

Full-Stack Developer and Data Analyst portfolio, built with Astro, TypeScript and native CSS. Five languages share the same project order and content structure.

## Selected projects

| Project | Canonical repository | Source |
| --- | --- | --- |
| Padun | [Desta-Platform/padun](https://github.com/Desta-Platform/padun) | Private |
| LendSight | [Desta-data-analytics/lendingscope](https://github.com/Desta-data-analytics/lendingscope) | Private |
| Credit Risk Analytics | [Desta-data-analytics/credit-risk-analytics](https://github.com/Desta-data-analytics/credit-risk-analytics) | Public |
| Stockwise | [Desta-data-analytics/stockwise](https://github.com/Desta-data-analytics/stockwise) | Public |
| Sakuara | [Desta-Platform/Sakuara](https://github.com/Desta-Platform/Sakuara) | Private |

The interface links to public source and labels private source without an inaccessible repository CTA. Padun and LendSight lead the selection; Sakuara is supporting work. Screenshots use synthetic or public data. No production banking readiness or independent security certification is claimed.

## Development

Requires Node 22.19+; CI uses Node 24.

```sh
npm ci
npm run dev
npm run check
SITE_URL=https://natalius-desta-riyanto.github.io BASE_PATH=/portfolio/ npm run build
BASE_PATH=/portfolio/ npm test
```

Project metadata: src/data/site.ts. Locale content: src/data/translations.json. Visible project selection: src/components/SelectedProjects.astro. Single stylesheet and design tokens: src/styles/site.css. Contact links: `contact` in src/data/site.ts. Existing case-study URLs remain supported.

The GitHub Pages workflow checks, builds and validates static output on pushes to main. Public email and LinkedIn remain the contact channels; no form or analytics service is added.

## Design and verification

Real portrait and project screenshots; title, summary, technical evidence and actions in that order. The project grid replaces the carousel. Keyboard focus, 44px action targets, small hover feedback and reduced-motion support are retained. Core content exists in generated HTML without JavaScript.

[UI critique and Tailwind equivalent](docs/09-UI-REVIEW.md). [Latest audit and shadcn-style refresh](docs/12-UI-AUDIT-REFRESH.md). Older numbered planning documents record previous directions; current source and release verification describe the active implementation.

## Sakuara portfolio demo

The compiled static demo at public/demo/sakuara/ is built from the existing private Sakuara repository's portfolio-demo branch. It uses fictional browser-local data and no Supabase configuration; its CSP blocks outgoing connections. The personal application remains separately hosted, without production quick login. Regenerate with npm run build:demo in Sakuara, verify using scripts/verify-portfolio-build.mjs, then copy only dist-demo/ here. Never copy an ordinary production build or environment files.
