# BurbSec

A SvelteKit website for BurbSec information security meetups and events.

## About

BurbSec is an information security meetup network hosting events across multiple locations including the greater Chicagoland area, Las Vegas, Galway (Ireland), Minneapolis, and more. This site provides information about upcoming events, locations, and sponsors.

## Architecture

This project uses a **data-driven architecture** where all event metadata lives in a single source of truth — `src/lib/data/events.js`. The homepage cards, navigation dropdowns, sponsors page, SEO meta tags, and structured data (JSON-LD) are all **auto-generated** from this file. Individual route pages only contain unique prose content.

### Event Categories

- **Chicagoland** — Chicago, Wheeling, Hickory Hills, Schaumburg, Crystal Lake, Naperville, South Bend
- **Elsewhere** — Minneapolis, Las Vegas, Galway (Ireland)
- **Special Interest** — CigarSec

### Other Pages

- **Sponsors** (`/sponsors`) — auto-generated cards from events with sponsor data
- **Error** (`+error.svelte`) — branded 404 / error page

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
4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build    # Outputs to build/ with Brotli + Gzip precompression
npm run preview  # Preview the production build locally
```

## Technology Stack

- **Framework**: SvelteKit 2 + Svelte 4
- **Build Tool**: Vite 5
- **Styling**: Bootstrap 5.3.8 (CDN with SRI) + Custom CSS
- **Icons**: Font Awesome 6.5.1 (CDN with SRI)
- **Deployment**: Static site generation → GitHub Pages (Node 22)
- **Domain**: `burbsec.com` (via CNAME)

### Security Features

- **Subresource Integrity (SRI)** hashes on all CDN resources
- **Content Security Policy (CSP)** meta tag
- **Referrer Policy** (`strict-origin-when-cross-origin`)
- **`security.txt`** at `/.well-known/security.txt`
- Consistent `rel="noopener noreferrer"` on all external links

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
│   │   └── events.js       # ★ Single source of truth for all event data
│   └── components/
│       ├── EventPage.svelte # Reusable event page (auto-generates SEO + JSON-LD)
│       ├── Footer.svelte    # Site footer
│       └── Navbar.svelte    # Data-driven navigation bar
└── routes/
    ├── +layout.svelte       # Layout (skip-link, org structured data)
    ├── +layout.js           # Prerender + trailing slash config
    ├── +page.svelte         # Homepage (data-driven location cards)
    ├── +error.svelte        # Branded error / 404 page
    ├── sponsors/            # Sponsors page (data-driven cards)
    ├── east/                # Chicago event page
    ├── north/               # Wheeling event page
    ├── south/               # Hickory Hills event page
    ├── west/                # Naperville event page
    ├── prime/               # Schaumburg event page
    ├── northwest/           # Crystal Lake event page
    ├── southeast/           # South Bend event page
    ├── minneapolis/         # Minneapolis event page
    ├── lasvegas/            # Las Vegas event page
    ├── galway/              # Galway, Ireland event page
    └── cigarsec/            # CigarSec special interest page

static/
├── .well-known/
│   └── security.txt        # Security contact info (RFC 9116)
├── images/                 # Event shields and IRL photos
├── videos/                 # Background video
├── sitemap.xml             # Site map for search engines
└── robots.txt              # Crawler directives
```

## Adding New Event Locations

Adding a new event is now a **two-step process** (down from six):

1. **Add the event to `src/lib/data/events.js`** in the appropriate array (`chicagolandEvents`, `elsewhereEvents`, or `specialEvents`). This automatically updates:
   - Homepage location cards
   - Navbar dropdown menus
   - Sponsors page (if `sponsor` data is provided)
   - SEO meta tags and structured data (if `seo`/`structuredData` fields are provided)

2. **Create a minimal route page** at `src/routes/<slug>/+page.svelte`:
   ```svelte
   <script>
     import EventPage from '$lib/components/EventPage.svelte';
     import { getEventProps } from '$lib/data/events.js';
     const event = getEventProps('your-slug');
   </script>

   <EventPage {...event}>
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
| `seo` | No | Custom SEO title, description, keywords, image |
| `structuredData` | No | Venue details for JSON-LD schema |
| `sponsor` | No | Sponsor page card data |

## Contributing

This site is open source. Feel free to submit issues and pull requests to improve the site.

## License

See [LICENSE](LICENSE) file for details.