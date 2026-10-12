# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (generates gallery thumbnails first)
npm run build    # Production build → build/ (generates gallery thumbnails first)
npm run preview  # Preview production build locally
npm run thumbs   # Regenerate gallery thumbnails only (also run by predev/prebuild)
```

No test runner or linter is configured.

## Architecture

Static SvelteKit 2 + Svelte 5 site deployed to GitHub Pages via `@sveltejs/adapter-static`. All pages are prerendered at build time — there is no client-side data fetching.

### Data-Driven Pattern

`src/lib/data/events.js` is the single source of truth. One edit there cascades to:
- Homepage location cards (auto-generated from category arrays)
- Navbar dropdowns (data-driven)
- Sponsors page (filters events with `sponsor` data via `getSponsorEvents()`)
- Per-page SEO meta tags and JSON-LD structured data

### Key Files

- **`src/lib/data/events.js`** — All event metadata, exported as `chicagolandEvents`, `elsewhereEvents`, `specialEvents`, `allEvents`. Helper functions: `getEvent(slug)`, `getEventProps(slug)`, `getSponsorEvents()`.
- **`src/lib/server/gallery.js`** — Build-time auto-discovery of gallery images from `static/images/irl/<folder>/`. Returns `{ thumb, full }` pairs (thumb from `static/images/irl-thumbs/`, falling back to the original if missing). Uses Node `fs` — only runs server-side during prerender.
- **`scripts/generate-thumbnails.mjs`** — Mirrors `static/images/irl/` into gitignored `static/images/irl-thumbs/` as 400px-tall webp thumbnails (via `sharp`). Runs automatically before `dev`/`build`; skips up-to-date thumbs.
- **`src/lib/components/EventPage.svelte`** — Shared wrapper for all event pages. Handles SEO, Open Graph, Twitter Cards, JSON-LD, buttons, next-meetup date, visible venue address, Add to Calendar button, gallery rendering.
- **`src/lib/utils/schedule.js`** — Date math for the `schedule` field on events (`{ week: 1-4|'last', weekday, time, tz }`): computes the next occurrence and formats dates/times. Client-safe; used by the homepage cards, event pages, and ICS generation.
- **`src/lib/server/ics.js`** + **`src/routes/calendar/[file]/+server.js`** — Prerendered iCalendar feeds at `/calendar/<slug>.ics` (per event with a `schedule`) and `/calendar/burbsec.ics` (all events), with monthly RRULEs and VTIMEZONE blocks. Slugs listed in an event's `formerSlugs` also get a `/calendar/<old>.ics` copy so existing subscriptions survive a rename.
- **`src/lib/components/ImageGallery.svelte`** — Auto-scrolling image ribbon with modal expand. Ribbon shows thumbnails; the full-size original loads only when the modal opens. Duplicates images for seamless CSS animation loop (4+ images to enable).
- **`src/lib/components/Icon.svelte`** + **`src/lib/data/icons.js`** — Inline SVG icons (path data from Font Awesome Free 6.7.2, CC BY 4.0). Usage: `<Icon name="discord" size="xl" class="me-1" />`. To add an icon, append its viewBox + path data to `icons.js`. No Font Awesome CDN is loaded.
- **`src/lib/components/WebChat.svelte`** — Self-contained in-browser IRC client for `irc.burbsec.com` (WebSocket at `wss://irc.burbsec.com/webirc`); open/close state lives in `src/lib/stores/webchat.svelte.js`.
- **`src/lib/components/LaserLinesBackground.svelte`** — Animated canvas background on every page except the homepage (which uses a background video).
- **`src/app.css`** — All project styles in one file (no component-scoped CSS).
- **`src/app.html`** — HTML shell with CSP headers, Bootstrap CDN with SRI hash.

### Route Pattern

Every event page follows the same two-file pattern in `src/routes/<slug>/`:
- `+page.server.js` — Calls `getGalleryImages()` to load gallery at build time
- `+page.svelte` — Imports `EventPage`, spreads `getEventProps(slug)`, and provides unique prose as children

### Renaming an Event

GitHub Pages can't redirect, so keep old URLs alive: add the old slug to `formerSlugs` (keeps `/calendar/<old>.ics` working) and leave a `src/routes/<old>/+page.js` that calls `redirect(308, '/<new>/')` (prerenders to a meta-refresh page). See `southeast` → `southbend`. If the gallery folder is renamed too, update pixbot's `FALLBACK_LOCATIONS`.

### Adding a New Event

1. Add entry to the appropriate array in `events.js` (include a `schedule` field if the meetup has a fixed monthly cadence — this drives next-date display and the .ics feed)
2. Create `src/routes/<slug>/+page.server.js` and `+page.svelte` (follow existing pattern)
3. Add shield image to `static/images/` (the sitemap auto-generates from `events.js` via `src/routes/sitemap.xml/+server.js`)
4. For gallery: drop images in `static/images/irl/<galleryFolder>/` — auto-discovered at build. pixbot (separate repo, `BurbSec/pixbot`) opens PRs into these folders and reads the folder list live from `main`; its `FALLBACK_LOCATIONS` in `config.py` should match
5. Update the spots `events.js` doesn't drive: `areaServed` in `src/routes/+layout.svelte`, `pageDescription` in `src/routes/+page.svelte` (new metro areas), and the "Other Locations" dropdown in `src/routes/sponsors/+page.svelte` (locations with their own Meetup/Eventbrite)

README.md ("Adding a New Meetup Location" / "Modifying an Existing Location") has the full checklists, including shield specs (~256px square transparent PNG, <50 KB) and SEO field guidance — keep it in sync when this process changes.

## Conventions

- Svelte 5 runes (`$props()`, `$state()`, `$derived()`) — not Svelte 4 stores
- Prerender enabled globally in `src/routes/+layout.js` with `trailingSlash: 'always'`
- External CDN resources (Bootstrap) use SRI hashes — update hashes when changing versions; icons are inline SVGs via `Icon.svelte`, not a CDN
- Gallery images: `.webp` preferred for file size; sorted alphabetically by filename; ribbon thumbnails are auto-generated (never commit `static/images/irl-thumbs/`)
- Styling: Bootstrap 5 utility classes + custom rules in `app.css`; no component-scoped `<style>` blocks (sole exception: `LaserLinesBackground.svelte`)
