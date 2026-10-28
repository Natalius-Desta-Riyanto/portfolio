# UI review — 28 October 2026

Scope: the existing Hero and project selection. The user's component/design placeholders were not treated as supplied design details. The changes retain the existing Astro/CSS stack and public identity.

## Critique and changes

| Previously | Problem for a visitor | Current decision |
| --- | --- | --- |
| One project at a time in a carousel | Comparing work requires navigation; newer, stronger work was absent | Padun and LendSight lead a visible two-column project selection; mobile stacks the same order |
| Persistent animated full-screen background | Decorative motion competes with portrait and project evidence | Restrained static background; movement is confined to links and project previews |
| Many badges and broad role statements | The stack competes with the reason to inspect a project | Name → problem → engineering evidence → short stack → action |
| Private-source links could lead visitors to GitHub 404 | A reviewer cannot distinguish restricted access from a broken link | Public source gets a GitHub action; private source gets a clear label and public case study |
| Old prototype README | Documentation contradicted the published site | README describes the current site, canonical repository owners and deployment commands |

These are judgments about this portfolio's task, not claims that a particular visual trend improves conversion. Preserve clear evidence and readable content before adding decoration.

## Interaction specification

- Border feedback: 180ms; preview scale: 1.018 over 220ms; arrow offset: 3px over 180ms.
- No automatic project advance, tilt effect, parallax or content hidden pending animation.
- Keyboard focus remains visible; navigation uses anchors; primary actions have a 44px target.
- Reduced motion removes decorative transforms and transitions. This follows [W3C technique C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39) and [web.dev motion guidance](https://web.dev/learn/accessibility/motion).

## Equivalent Tailwind structure

The implementation uses native CSS. This illustrates the same hierarchy if the component is later moved to a Tailwind project; no Tailwind dependency is required here.

```html
<article class="group overflow-hidden rounded-2xl border border-slate-200 bg-white
                transition-colors duration-200 hover:border-cyan-700
                focus-within:border-cyan-700 motion-reduce:transition-none">
  <img class="aspect-[16/10] w-full object-cover object-top
              transition-transform duration-200 group-hover:scale-[1.018]
              motion-reduce:transform-none motion-reduce:transition-none"
       src="project-preview.png" alt="" width="1440" height="900" loading="lazy">
  <div class="flex flex-col gap-4 p-6">
    <p class="text-xs uppercase tracking-wider text-slate-600">Full-stack project</p>
    <h3 class="text-3xl font-semibold tracking-tight text-slate-900">Padun</h3>
    <p class="text-base leading-7 text-slate-600">One sentence about the user's task.</p>
    <p class="text-sm leading-6 text-cyan-800">Specific technical evidence.</p>
    <ul class="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-600">
      <li>TypeScript</li><li>PostgreSQL</li>
    </ul>
    <a class="inline-flex min-h-11 items-center gap-2 font-medium
              focus-visible:outline-2 focus-visible:outline-offset-4"
       href="/work/padun/">Read case study <span aria-hidden="true">→</span></a>
  </div>
</article>
```

Use a parent `grid grid-cols-1 gap-6 md:grid-cols-2`. Adapt colors to the site's dark-mode tokens and test contrast in both themes. Avoid wrapping an entire card in a link if it also contains separate demo/source links.

## Content and access boundaries

Project sources remain in their current organizations. Sakuara now uses Desta-Platform/Sakuara; LendSight uses Desta-data-analytics/lendingscope, without the deleted personal mirror. No private repository was made public. Padun screenshots show synthetic fixtures; LendSight screenshots show the public analytical interface. No credentials, workspace exports, or internal EVO-Brain material are published.
