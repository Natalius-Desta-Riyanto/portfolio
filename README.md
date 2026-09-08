# Natalius Desta Riyanto — Portfolio

Personal portfolio website presenting experience, education, and selected work across full-stack development, data analytics, AI, and mathematics education.

[View the live portfolio](https://natalius-desta-riyanto.github.io/portfolio/)

## Features

- English (default), Japanese, Chinese, Indonesian, and German
- Light mode by default with dark-mode support
- Responsive layout
- Accessible reduced-motion fallback
- Grouped role hierarchy for organizations with multiple positions
- Static deployment compatible with GitHub Pages
- Lightweight, viewport-bounded motion effects
- Project imagery displayed without destructive cropping
- Keyboard-accessible navigation and semantic content structure

## Technology

The site is intentionally framework-free and uses semantic HTML, modular CSS, and browser-native JavaScript. This keeps the static deployment portable, fast to load, and easy to audit.

## Local preview

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## Repository structure

```text
index.html    portfolio content and page structure
assets/       project imagery and visual assets
README.md     project documentation
```

## Deployment

The `main` branch is published through GitHub Pages. After a content change:

1. Preview the site locally at desktop and mobile widths.
2. Check that navigation, language controls, themes, and project links work.
3. Push the reviewed change to `main`.
4. Wait for the Pages workflow to complete successfully.
5. Verify the live URL and its image assets.

## Content principles

- Experience and outcomes remain source-faithful.
- Private projects link to their live product when source code is unavailable.
- Project screenshots are authentic application captures.
- Motion respects reduced-motion preferences.
