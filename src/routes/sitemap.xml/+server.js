import { allEvents, SITE_URL } from '$lib/data/events.js';

export const prerender = true;

const LASTMOD = new Date().toISOString().slice(0, 10);

function urlEntry({ loc, priority, changefreq = 'monthly', image }) {
	const img = image
		? `
    <image:image>
      <image:loc>${image.loc}</image:loc>
      <image:title>${image.title}</image:title>
      <image:caption>${image.caption}</image:caption>
    </image:image>`
		: '';
	return `  <url>
    <loc>${loc}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${img}
  </url>`;
}

export function GET() {
	const entries = [
		urlEntry({
			loc: `${SITE_URL}/`,
			priority: '1.0',
			changefreq: 'weekly',
			image: {
				loc: `${SITE_URL}/images/hacker_shield.png`,
				title: 'Burbsec Network Logo',
				caption: "The world's most fun information security meetup network"
			}
		}),
		...allEvents.map((e) =>
			urlEntry({
				loc: `${SITE_URL}/${e.slug}/`,
				priority: e.category === 'special' ? '0.7' : '0.8',
				image: {
					loc: `${SITE_URL}${e.eventImage}`,
					title: `${e.cardTitle} Burbsec Meetup`,
					caption: `Information security meetup in ${e.location}`
				}
			})
		),
		urlEntry({ loc: `${SITE_URL}/sponsors/`, priority: '0.6' })
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: { 'content-type': 'application/xml' }
	});
}
