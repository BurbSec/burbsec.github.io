# BurbSec

A SvelteKit website for BurbSec information security meetups and events.

## Architecture

This project uses a **data-driven architecture** where all event metadata lives in a single source of truth — `src/lib/data/events.js`. The homepage cards, navigation dropdowns, sponsors page, SEO meta tags, and structured data (JSON-LD) are all **auto-generated** from this file. Individual route pages only contain unique prose content.

### Event Categories

- **Chicagoland** — Chicago, Wheeling, Hickory Hills, Schaumburg, Crystal Lake, Naperville, South Bend
- **Elsewhere** — Minneapolis, Las Vegas, Galway (Ireland)
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
    ├── east/                # Chicago event page
    ├── north/               # Wheeling event page
    ├── south/               # Hickory Hills event page
    ├── west/                # Naperville event page
    ├── prime/               # Schaumburg event page
    ├── southeast/           # South Bend event page
    ├── minneapolis/         # Minneapolis event page
    ├── lasvegas/            # Las Vegas event page
    ├── galway/              # Galway, Ireland event page
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
│       ├── mpls/
│       ├── north/
│       ├── prime/
│       ├── south/
│       ├── southeast/
│       └── west/
├── videos/                 # Background video
├── sitemap.xml             # Site map for search engines
└── robots.txt              # Crawler directives
```

## Adding Gallery Images

Each event location has an image gallery powered by `ImageGallery.svelte`. Gallery images are auto-discovered at build time by `gallery.js` — no code changes required.

### How It Works

1. Find the correct folder under `static/images/irl/` for the location where the photos were taken:

   | Location | Gallery Folder |
   |----------|---------------|
   | Chicago (East) | `static/images/irl/east/` |
   | Wheeling (North) | `static/images/irl/north/` |
   | Hickory Hills (South) | `static/images/irl/south/` |
   | Schaumburg (Prime) | `static/images/irl/prime/` |
   | Naperville (West) | `static/images/irl/west/` |
   | South Bend (Southeast) | `static/images/irl/southeast/` |
   | Minneapolis | `static/images/irl/mpls/` |
   | Las Vegas | `static/images/irl/lasvegas/` |
   | Galway, Ireland | `static/images/irl/galway/` |
   | CigarSec | `static/images/irl/cigarsec/` |

2. Drop your image files (`.jpg`, `.jpeg`, `.png`, or `.webp`) into that folder. **`.webp` is strongly preferred** for file size.

3. That's it! The next build will automatically pick up the new images and display them in that location's gallery ribbon. Images are sorted alphabetically by filename.

> **Tip:** The gallery folder name for each event is set via the `galleryFolder` field in `src/lib/data/events.js`. When adding a brand-new event location, create a matching folder under `static/images/irl/` and set the `galleryFolder` field in the event data.

## Adding New Event Locations

Adding a new event is now a **three-step process** (down from six):

1. **Add the event to `src/lib/data/events.js`** in the appropriate array (`chicagolandEvents`, `elsewhereEvents`, or `specialEvents`). This automatically updates:
   - Homepage location cards
   - Navbar dropdown menus
   - Sponsors page (if `sponsor` data is provided)
   - SEO meta tags and structured data (if `seo`/`structuredData` fields are provided)

2. **Create a minimal route** at `src/routes/<slug>/` with two files:

   `+page.server.js` — loads gallery images at build time:
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

   `+page.svelte` — renders the event page:
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

3. Drop the shield image into `static/images/` and update `static/sitemap.xml`.

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
| `blueskyHandle` | No | BlueSky social handle |
| `discordLink` | No | Discord server invite link |
| `meetupPage` | No | Meetup.com page (defaults to main BurbSec) |
| `eventbriteLink` | No | Eventbrite page link |
| `irlImage` | No | Path to IRL photo |
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
