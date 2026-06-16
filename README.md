# Lagoon Main Beach website

Astro static site for [lagoonmainbeach.com](https://lagoonmainbeach.com). Built by Mino Design Studio.

## Pages

- `/` - Homepage (luxury apartments for lease)
- `/owners/` - Property management for owners

## Develop

```sh
npm install
npm run dev      # local dev server
npm run build    # production build to ./dist
npm run preview  # serve the production build locally
```

## How it's built

The approved designs were standalone React apps that transpiled themselves in
the browser via a 3MB inline Babel runtime. Here those same React components are
compiled at build time instead: Astro server-renders them to static HTML (so the
content is in the page for SEO and shows instantly) and ships only the small
amount of JavaScript needed to hydrate the interactive parts (sticky/mobile nav,
the owners testimonial carousel). No Babel is shipped to visitors.

- Page components live in `src/components/` (`HomeApp.jsx`, `OwnersApp.jsx`),
  ported verbatim from the standalone source. Icons come from `lucide-react`
  via `src/components/Icon.jsx`.
- Design tokens, base styles and `@font-face` declarations are in
  `src/styles/global.css`. Self-hosted fonts (Siena, Montserrat) live in
  `public/fonts/`; images extracted from the source are in `public/img/`.
- `tools/extract-sources.mjs` and `tools/port-pages.mjs` are the one-off
  migration scripts (kept for reference; not part of the build).

## Deployments

**Client preview (automatic):** every push to `main` builds and publishes to
GitHub Pages at https://minodesignstudio.github.io/lagoon-main-beach/.
The preview build sets `DEPLOY_TARGET=pages`, which switches the site URL,
adds the `/lagoon-main-beach` base path, and adds a `noindex` tag so search
engines ignore the preview.

**Production (go-live, after client approval):** import this repo in the
client's Cloudflare account (Workers & Pages -> Import from GitHub), build
command `npm run build`, deploy directory `dist` (wrangler.jsonc is already
configured). Do NOT set `DEPLOY_TARGET`. Then attach the custom domain
`lagoonmainbeach.com`.

## Notes

- Source designs: OneDrive -> Client Projects -> Lagoon Main Beach -> Design ->
  Lagoon Main Beach Design System -> homepage (the `*-Standalone.html` files).
- Migration scratch (extracted source HTML/JSX) lives in `_source/` and is
  gitignored.
