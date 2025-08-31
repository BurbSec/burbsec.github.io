# BurbSec

A SvelteKit website for BurbSec information security meetups and events.

## About

BurbSec is an information security meetup network hosting events across multiple locations including Chicago, Las Vegas, Galway, and more. This site provides information about upcoming events, locations, and sponsors.

## Project Structure

This is a SvelteKit application with the following structure:

- **Event Pages**: Individual pages for different BurbSec locations and events
  - Prime (`/prime`)
  - North (`/north`) 
  - South (`/south`)
  - East (`/east`)
  - West (`/west`)
  - Northwest (`/northwest`)
  - Galway (`/galway`)
  - Las Vegas (`/lasvegas`)
  - CigarSec (`/cigarsec`)
- **Sponsors**: Information about event sponsors (`/sponsors`)

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
│       ├── EventPage.svelte
│       ├── Footer.svelte
│       └── Navbar.svelte
└── routes/               # Page routes
    ├── +layout.svelte    # Layout wrapper
    ├── +page.svelte      # Homepage
    ├── east/             # Chicago event page
    ├── lasvegas/         # Las Vegas event page
    ├── galway/           # Galway event page
    ├── north/            # Wheeling event page
    ├── south/            # Hickory Hills event page
    ├── west/             # Naperville event page
    ├── northwest/        # Crystal Lake event page
    ├── prime/            # Schaumburg event page
    ├── cigarsec/         # CigarSec special interest
    └── sponsors/         # Sponsors page

static/
├── images/               # Event shields and photos
├── videos/               # Background video
├── sitemap.xml          # Site map for search engines
└── robots.txt           # Crawler directives
```

## Adding New Events

To add a new event location:

1. Create a new directory in `src/routes/` (e.g., `src/routes/newlocation/`)
2. Add a `+page.svelte` file using the `EventPage` component
3. Add event shield image to `static/images/`
4. Update the homepage (`src/routes/+page.svelte`) to include the new location
5. Update `static/sitemap.xml` with the new URL

## Contributing

This site is open source. Feel free to submit issues and pull requests to improve the site.

## License

See [LICENSE](LICENSE) file for details.