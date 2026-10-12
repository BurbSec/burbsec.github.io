# BurbSec

A SvelteKit website for BurbSec information security meetups and events.

## Architecture

This project uses a **data-driven architecture** where all event metadata lives in a single source of truth — `src/lib/data/events.js`. The homepage cards, navigation dropdowns, sponsors page, SEO meta tags, and structured data (JSON-LD) are all **auto-generated** from this file. Individual route pages only contain unique prose content.

### Event Categories

- **Chicagoland** — Chicago (East), Chicago (Pilsen), Wheeling, Hickory Hills, Schaumburg, Crystal Lake, Naperville, South Bend
- **Elsewhere** — Minneapolis, Las Vegas, Galway (Ireland), Milwaukee
- **Special Interest** — CigarSec

### Other Pages

- **Sponsors** (`/sponsors`) — basic prospectus info 
- **Error** (`+error.svelte`) — branded 404 / error page

### Chat

The navbar "Chat" dropdown and the homepage's chat-picker modal link out to BurbSec's IRC, Discord, and Slack. Links are hardcoded in `Navbar.svelte` and `+page.svelte`; per-event Discord invite links live on each event in `events.js` (`discordLink`).

## Development

### Prerequisites

- Node.js 22 LTS (or higher)
- npm

### Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the URL provided

```bash
npm run thumbs   # Regenerate gallery thumbnails only (also runs automatically before dev/build)
```

### Building for Production

```bash
npm run build    # Outputs to build/
npm run preview  # Preview the production build locally
```

## Technology Stack

- **Framework**: SvelteKit 2 + Svelte 5
- **Build Tool**: Vite 7
- **Styling**: Bootstrap 5.3.8 (CDN with SRI) + Custom CSS
- **Icons**: Inline SVGs (Font Awesome Free 6.7.2 path data) — no CDN, see `Icon.svelte`
- **Deployment**: Static site generation → GitHub Pages (Node 22)
- **Domain**: `burbsec.com` (via CNAME)

### Accessibility

- Skip-to-content link for keyboard/screen-reader navigation
- Visible `:focus-visible` indicators on all interactive elements
- `prefers-reduced-motion` support (disables animations)
- Semantic HTML landmarks (`<nav>`, `<main>`, `<footer>`)
- ARIA labels on key interactive elements

## File Structure

```
src/
├── app.html                # Main HTML template (CSP, SRI, meta tags)
├── app.css                 # Global styles + a11y focus indicators
├── lib/
│   ├── data/
│   │   ├── events.js       # ★ Single source of truth for all event data
│   │   └── icons.js        # Inline SVG icon path data
│   ├── server/
│   │   ├── gallery.js      # Build-time gallery image scanner
│   │   └── ics.js          # iCalendar (.ics) feed generation
│   ├── utils/
│   │   └── schedule.js     # Date math for recurring event schedules
│   └── components/
│       ├── EventPage.svelte # Reusable event page (auto-generates SEO + JSON-LD)
│       ├── ImageGallery.svelte # Auto-scrolling image gallery ribbon
│       ├── Icon.svelte      # Renders inline SVGs from icons.js
│       ├── Footer.svelte    # Site footer
│       └── Navbar.svelte    # Data-driven navigation bar
└── routes/
    ├── +layout.svelte       # Layout (skip-link, org structured data)
    ├── +layout.js           # Prerender + trailing slash config
    ├── +page.svelte         # Homepage (data-driven location cards, chat picker modal)
    ├── +error.svelte        # Branded error / 404 page
    ├── calendar/[file]/     # Prerendered .ics feeds (per-event + combined)
    ├── sponsors/            # Sponsors page (data-driven cards)
    ├── sitemap.xml/         # Sitemap, auto-generated from events.js
    ├── east/                # Chicago event page
    ├── pilsen/              # Chicago (Pilsen) event page
    ├── north/               # Wheeling event page
    ├── south/               # Hickory Hills event page
    ├── west/                # Naperville event page
    ├── prime/               # Schaumburg event page
    ├── northwest/           # Crystal Lake event page
    ├── southbend/           # South Bend (Mishawaka) event page
    ├── southeast/           # Redirect to /southbend/ (former name)
    ├── minneapolis/         # Minneapolis event page
    ├── lasvegas/            # Las Vegas event page
    ├── galway/              # Galway, Ireland event page
    ├── milwaukee/           # Milwaukee event page
    └── cigarsec/            # CigarSec special interest page

scripts/
└── generate-thumbnails.mjs # Generates gallery thumbnails into static/images/irl-thumbs/ (gitignored)

static/
├── .well-known/
│   └── security.txt        # Security contact info (RFC 9116)
├── images/                 # Event shields and IRL photos
│   └── irl/                # Gallery image folders (see "Adding Gallery Images")
│       ├── cigarsec/
│       ├── east/
│       ├── galway/
│       ├── lasvegas/
│       ├── mke/
│       ├── mpls/
│       ├── north/
│       ├── northwest/
│       ├── pilsen/
│       ├── prime/
│       ├── south/
│       ├── southbend/
│       └── west/
├── videos/                 # Background video
└── robots.txt              # Crawler directives
```

## Adding Gallery Images

Each event location has an image gallery powered by `ImageGallery.svelte`. Gallery images are auto-discovered at build time by `gallery.js` — no code changes required.

### How It Works

1. Find the correct folder under `static/images/irl/` for the location where the photos were taken:

   | Location | Gallery Folder |
   |----------|---------------|
   | Chicago (East) | `static/images/irl/east/` |
   | Chicago (Pilsen) | `static/images/irl/pilsen/` |
   | Wheeling (North) | `static/images/irl/north/` |
   | Hickory Hills (South) | `static/images/irl/south/` |
   | Schaumburg (Prime) | `static/images/irl/prime/` |
   | Crystal Lake (Northwest) | `static/images/irl/northwest/` |
   | Naperville (West) | `static/images/irl/west/` |
   | South Bend | `static/images/irl/southbend/` |
   | Minneapolis | `static/images/irl/mpls/` |
   | Las Vegas | `static/images/irl/lasvegas/` |
   | Galway, Ireland | `static/images/irl/galway/` |
   | Milwaukee | `static/images/irl/mke/` |
   | CigarSec | `static/images/irl/cigarsec/` |

2. Drop your image files (`.jpg`, `.jpeg`, `.png`, or `.webp`) into that folder. **`.webp` is strongly preferred** for file size.

3. That's it! The next build will automatically pick up the new images and display them in that location's gallery ribbon. Images are sorted alphabetically by filename.

> **Tip:** The gallery folder name for each event is set via the `galleryFolder` field in `src/lib/data/events.js`. When adding a brand-new event location, create a matching folder under `static/images/irl/` and set the `galleryFolder` field in the event data.

## Adding a New Meetup Location

Most of the site is generated from `src/lib/data/events.js`, but a few things still have to be done by hand. Work through this list in order.

### 1. Shield / logo

Add the location's shield to `static/images/<name>_shield.png`.

| Spec | Value |
|------|-------|
| Format | PNG with a transparent background (every existing shield has an alpha channel) |
| Size | About **256 × 256 px**, roughly square. It is displayed at 80 px wide on the homepage and event page and 60 × 60 on the sponsors page, so anything larger is wasted bytes |
| File size | Aim for **under 50 KB**. Existing shields are 20–40 KB; resize and compress before committing |
| Filename | All lowercase, `<name>_shield.png`. Mixed-case duplicates (e.g. `Mke_shield.png` next to `mke_shield.png`) collide on macOS and Windows |
| Legibility | It must still read at 60–80 px, so avoid fine text |

The shield is also used as the page's Open Graph/Twitter image and its sitemap image, unless `seo.image` points somewhere else.

### 2. Event entry in `src/lib/data/events.js`

Add an object to the right array: `chicagolandEvents`, `elsewhereEvents`, or `specialEvents`. The order of an array is the order of the homepage cards and navbar items. Fill in every field below that applies (see [Event Data Fields](#event-data-fields) for the full reference):

- [ ] **Basics:** `slug`, `title` (`BurbSec|<Name>`), `subtitle` (`Meets Every <Nth> <Weekday> of the Month`), `location` (`City, ST`), `category`
- [ ] **Card/nav:** `cardTitle` (`<Name> (<City>)`), `cardSchedule` (`Every <Nth> <Weekday>`)
- [ ] **Shield:** `eventImage: '/images/<name>_shield.png'`
- [ ] **Schedule:** `schedule: { week, weekday, time, tz }`. This drives the "Next meetup" date, the homepage card date, and the `.ics` calendar feeds. Leave it out only if there is no fixed monthly cadence (the card then says "See Discord for dates")
- [ ] **Links:** `gmapsLink`, `meetupPage` (defaults to the main BurbSec Meetup), `eventbriteLink`, `discordLink`, `blueskyHandle` (use `null` for anything that doesn't exist; the button is hidden)
- [ ] **Gallery:** `galleryFolder` (see step 4)
- [ ] **SEO:** `seo: { title, description, keywords, image }` (see [SEO Fields](#seo-fields))
- [ ] **Venue / structured data:** `structuredData: { venueName, streetAddress, addressLocality, addressRegion, postalCode, addressCountry, latitude, longitude }`. This feeds the visible venue address, JSON-LD `Event` schema, and the `geo.*` meta tags. Add `tz` only if the event has no `schedule` and is outside `America/Chicago`
- [ ] **Sponsors:** `sponsor: { when, attendance, crowd, venueName, avgSponsorship }` if the location takes sponsors (see [Sponsor Data Fields](#sponsor-data-fields))

Once this entry exists, the following update themselves: homepage card, navbar dropdown, sponsors card, sitemap entry, per-page meta/OG/Twitter/JSON-LD tags, and the `/calendar/<slug>.ics` and `/calendar/burbsec.ics` feeds.

### 3. Route

Create `src/routes/<slug>/` with two files:

`+page.server.js`, which loads gallery images at build time:
```js
import { getGalleryImages } from '$lib/server/gallery.js';
import { getEvent } from '$lib/data/events.js';

export function load() {
  const event = getEvent('your-slug');
  return {
    galleryImages: getGalleryImages(event?.galleryFolder)
  };
}
```

`+page.svelte`, which renders the event page:
```svelte
<script>
  import EventPage from '$lib/components/EventPage.svelte';
  import { getEventProps } from '$lib/data/events.js';

  let { data } = $props();
  const event = getEventProps('your-slug');
</script>

<EventPage {...event} galleryImages={data.galleryImages}>
  <p>Your unique event description here.</p>
</EventPage>
```

Write a paragraph or two of **original** prose for the page body. Mention the city, venue, neighborhood, and nearby areas it serves. This is the only unique on-page text search engines see, so don't copy another location's wording.

### 4. Gallery folder

- [ ] Create `static/images/irl/<galleryFolder>/` once there are photos (an empty or missing folder just hides the gallery)
- [ ] Add the location to the gallery table in [Adding Gallery Images](#adding-gallery-images)
- [ ] Add the folder to pixbot's `FALLBACK_LOCATIONS` in `config.py` ([BurbSec/pixbot](https://github.com/BurbSec/pixbot)). pixbot reads the folder list live from `main`, so the folder must exist there too

### 5. Hardcoded spots (not driven by `events.js`)

- [ ] **`src/routes/+layout.svelte`:** add the city to the organization JSON-LD `areaServed` list. Skip this if the city is already listed (e.g. another Chicago location)
- [ ] **`src/routes/+page.svelte`:** if it's a new metro area, add it to `pageDescription`, which is the homepage meta, OG, and Twitter description. Keep it under about 160 characters
- [ ] **`src/routes/sponsors/+page.svelte`:** if the location isn't on the main Chicagoland Meetup, add its Meetup/Eventbrite link to the "Other Locations" dropdown
- [ ] **`README.md`:** update [Event Categories](#event-categories), the route list in [File Structure](#file-structure), and the gallery table

### 6. Off-site

- [ ] **Bluesky:** to use a `<name>.burbsec.com` handle, the DNS TXT record (`_atproto.<name>.burbsec.com`) has to be set before the handle verifies
- [ ] **Meetup/Eventbrite:** create the event series and use its URL for `meetupPage`/`eventbriteLink`

### 7. Verify

```bash
npm run build && npm run preview
```

Check the homepage card, navbar entry, event page (next date, venue address, buttons, gallery), `/sponsors/`, `/sitemap.xml`, and `/calendar/<slug>.ics`. Then paste the deployed URL into Google's [Rich Results Test](https://search.google.com/test/rich-results) to validate the JSON-LD.

## Modifying an Existing Location

Find the type of change below and update everything listed for it.

| Change | Update |
|--------|--------|
| **Meeting day/week/time** | `schedule`, `subtitle`, `cardSchedule`, `seo.title` and `seo.description` (they name the day), `sponsor.when`. Calendar subscribers get the change automatically |
| **Venue** | `structuredData` (name, address, postal code, **latitude/longitude**), `gmapsLink`, `seo.description` and `seo.keywords` (venue/neighborhood names), `sponsor.venueName`, and the prose in `src/routes/<slug>/+page.svelte` if it names the venue |
| **Time zone** (location moves to a different zone) | `schedule.tz` (IANA name, e.g. `America/New_York`), or `structuredData.tz` if there's no `schedule` |
| **Shield / logo** | Replace the file in `static/images/` to the [logo specs](#1-shield--logo). If the filename changes, update `eventImage` **and** `seo.image`, then delete the old file |
| **Links / socials** | `meetupPage`, `eventbriteLink`, `discordLink`, `blueskyHandle`. For Meetup/Eventbrite, also update the sponsors page "Other Locations" dropdown if the location is listed there |
| **Sponsorship numbers** | `sponsor.attendance`, `sponsor.crowd`, `sponsor.avgSponsorship` |
| **Display name only** (slug stays) | `title`, `cardTitle`, `seo.title`/`description`/`keywords`, page prose, README |

### Renaming a location (slug change)

GitHub Pages can't send HTTP redirects, so old URLs have to be kept alive by hand. See `southeast` → `southbend` for a worked example.

- [ ] Change `slug` and add the old one to `formerSlugs: ['<old>']`. This keeps `/calendar/<old>.ics` working for existing subscribers
- [ ] Move `src/routes/<old>/` to `src/routes/<new>/` and update the slug string in both files
- [ ] Re-create `src/routes/<old>/+page.js` as a redirect (it prerenders to a meta-refresh page):
  ```js
  import { redirect } from '@sveltejs/kit';

  export function load() {
    redirect(308, '/<new>/');
  }
  ```
- [ ] Update the display name fields listed in the table above, plus `areaServed` in `+layout.svelte` if the city changed
- [ ] Optionally rename the shield (see "Shield / logo" above)
- [ ] If you rename the gallery folder, `git mv` it, update `galleryFolder`, and update pixbot's `FALLBACK_LOCATIONS`
- [ ] Bluesky handles are tied to DNS, so leave `blueskyHandle` alone unless the new handle has been set up and verified

### Retiring a location

- [ ] Remove the entry from `events.js`, and remove the city from `areaServed`, `pageDescription`, and the sponsors dropdown if no other location still covers it
- [ ] Replace `src/routes/<slug>/` with a `+page.js` redirect to `/` (or to a nearby location), so search results and bookmarks don't 404
- [ ] Remove the folder from pixbot's `FALLBACK_LOCATIONS`. Keeping the photos in `static/images/irl/` is optional
- [ ] Update the README lists

## Reference

### SEO Fields

Every event page gets `<title>`, meta description and keywords, canonical URL, Open Graph, Twitter Card, `geo.*` tags, and `Event` JSON-LD from `EventPage.svelte`. The values come from these fields:

| Field | Falls back to | Guidance |
|-------|---------------|----------|
| `seo.title` | `<title> \| Burbsec` | Pattern: `BurbSec <Name> <City> \| Information Security Meetup Every <Cadence>` |
| `seo.description` | `<title> - <subtitle>` | About 150–160 characters. Name the city, cadence, and venue, and end with "No dues, no presentations, just networking." |
| `seo.keywords` | (omitted) | Comma-separated: `<city> information security`, `<city> cybersecurity meetup`, `<city> infosec`, venue + neighborhood, nearby suburbs, local groups (DC/2600 chapters) |
| `seo.image` | `SITE_URL + eventImage` | Absolute URL: `` `${SITE_URL}/images/<name>_shield.png` ``. Set it to `null` to use the shield |
| `structuredData.*` | No JSON-LD, Chicago `geo.*` tags | Needed for the JSON-LD `Event`, visible venue line, and correct `geo.*` tags. Use `venueName: 'Various Locations'` for roaming events. Get accurate lat/long from Google Maps (4 decimal places) |

### Event Data Fields

| Field | Required | Description |
|-------|----------|-------------|
| `slug` | Yes | URL path segment (e.g., `east`) |
| `title` | Yes | Display title (e.g., `BurbSec\|East`) |
| `subtitle` | Yes | Meeting cadence |
| `location` | Yes | Human-readable location |
| `eventImage` | Yes | Path to shield image in `static/` |
| `gmapsLink` | Yes | Google Maps link to venue |
| `cardTitle` | Yes | Short name for homepage card |
| `cardSchedule` | Yes | Short schedule for homepage card |
| `category` | Yes | `chicagoland`, `elsewhere`, or `special` |
| `schedule` | No | `{ week: 1-4 \| 'last', weekday: 0-6 (4 = Thursday), time: 'HH:MM' (24h local), tz: IANA zone }`. Drives next-date display and `.ics` feeds |
| `formerSlugs` | No | Retired slugs whose `/calendar/<old>.ics` should keep serving this feed |
| `blueskyHandle` | No | BlueSky social handle |
| `discordLink` | No | Discord server invite link |
| `meetupPage` | No | Meetup.com page (defaults to main BurbSec) |
| `eventbriteLink` | No | Eventbrite page link |
| `irlImage` | No | Path to a single IRL photo, shown only when the gallery is empty |
| `galleryFolder` | No | Subfolder name under `static/images/irl/` for gallery images |
| `seo` | No | Custom SEO title, description, keywords, image |
| `structuredData` | No | Venue details for JSON-LD schema |
| `sponsor` | No | Sponsor page card data (see below) |

### Sponsor Data Fields

The `/sponsors` page cards are auto-generated from the `sponsor` object on each event in `src/lib/data/events.js`. The `getSponsorEvents()` helper filters for events that have this field. Each `sponsor` object contains:

| Sub-field | Description | Example |
|-----------|-------------|---------|
| `when` | Meeting cadence (nullable) | `'Every LAST (Fourth or Fifth) Thursday'` |
| `attendance` | Typical turnout | `'30-100 (usually 30-50) active and prospective IT and Infosec professionals and enthusiasts'` |
| `crowd` | Audience profile (nullable) | `'Younger crowd, some students'` |
| `venueName` | Venue + city for the card | `'Navigator Taproom in Chicago'` |
| `avgSponsorship` | Suggested sponsorship amount | `'$1000'` |

These are all manually maintained strings — no external API or dynamic calculation is involved. To update the metrics, edit the `sponsor` object on the relevant event entry directly.

## Contributing

This site is open source. Feel free to submit issues and pull requests to improve the site.

## License

See [LICENSE](LICENSE) file for details.
