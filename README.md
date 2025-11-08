# BurbSec

A SvelteKit website for BurbSec information security meetups and events.

## About

BurbSec is an information security meetup network hosting events across multiple locations including the greater Chicagoland area, Las Vegas, Galway (Ireland), Minneapolis, and more. This site provides information about upcoming events, locations, and sponsors.

## Project Structure

This is a SvelteKit application with the following structure:

- **Chicagoland Event Pages**: BurbSec locations across the Chicago metropolitan area
  - Prime - Schaumburg (`/prime`)
  - North - Wheeling (`/north`)
  - South - Hickory Hills (`/south`)
  - East - Chicago (`/east`)
  - West - Naperville (`/west`)
  - Northwest - Crystal Lake (`/northwest`)
  - Southeast - South Bend, IN (`/southeast`)
  
- **Elsewhere Event Pages**: BurbSec locations outside the Chicagoland area
  - Galway, Ireland (`/galway`)
  - Las Vegas, NV (`/lasvegas`)
  - Minneapolis, MN (`/minneapolis`)
  
- **Special Interest Groups**
  - CigarSec (`/cigarsec`)
  
- **Other Pages**
  - Sponsors (`/sponsors`)

## Development

### Prerequisites

- Node.js (version 16 or higher)
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

To build the application for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Technology Stack

- **Framework**: SvelteKit
- **Build Tool**: Vite
- **Styling**: Bootstrap 5 + Custom CSS
- **Icons**: Font Awesome 6
- **Deployment**: Static site generation (GitHub Pages)

## File Structure

```
src/
├── app.html              # Main HTML template
├── app.css               # Global styles
├── lib/
│   └── components/       # Reusable Svelte components
│       ├── EventPage.svelte   # Reusable event page component
│       ├── Footer.svelte      # Site footer
│       └── Navbar.svelte      # Navigation bar with dropdowns
└── routes/               # Page routes
    ├── +layout.svelte    # Layout wrapper
    ├── +page.svelte      # Homepage
    ├── cigarsec/         # CigarSec special interest page
    ├── east/             # Chicago event page
    ├── galway/           # Galway, Ireland event page
    ├── lasvegas/         # Las Vegas event page
    ├── minneapolis/      # Minneapolis event page
    ├── north/            # Wheeling event page
    ├── northwest/        # Crystal Lake event page
    ├── prime/            # Schaumburg event page
    ├── south/            # Hickory Hills event page
    ├── southeast/        # South Bend event page
    ├── sponsors/         # Sponsors page
    └── west/             # Naperville event page

static/
├── images/               # Event shields and IRL photos
├── videos/               # Background video
├── sitemap.xml          # Site map for search engines
└── robots.txt           # Crawler directives
```

## Adding New Event Locations

To add a new event location:

1. Create a new directory in `src/routes/` (e.g., `src/routes/newlocation/`)
2. Add a `+page.svelte` file using the `EventPage` component with appropriate props:
   - `title`: Event title (e.g., "BurbSec|Minneapolis")
   - `subtitle`: Meeting frequency (e.g., "Monthly Meetup")
   - `location`: City/Location name
   - `eventImage`: Path to shield/logo image
   - `gmapsLink`: Google Maps link to venue
   - `blueskyHandle`: (optional) BlueSky social handle
   - `discordLink`: (optional) Discord server invite link
   - `eventbriteLink`: (optional) Eventbrite page link
   - `meetupPage`: (optional) Meetup.com page link (defaults to main BurbSec meetup)
   - `irlImage`: (optional) Path to IRL photo from event
3. Add event shield image to `static/images/`
4. Update the homepage (`src/routes/+page.svelte`) to include the new location card
5. Update the navbar (`src/lib/components/Navbar.svelte`) to add the location to appropriate dropdown menu
6. Update `static/sitemap.xml` with the new URL

### EventPage Component Features

The `EventPage` component supports:
- Optional social media integrations (BlueSky or Discord)
- Flexible meetup links (Meetup.com or Eventbrite with calendar icon)
- IRL event photos
- Automatic SEO metadata and structured data support

## Contributing

This site is open source. Feel free to submit issues and pull requests to improve the site.

## License

See [LICENSE](LICENSE) file for details.