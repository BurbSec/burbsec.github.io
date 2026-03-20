/**
 * Centralized event data for the BurbSec Network.
 *
 * Adding a new event location:
 *  1. Add an entry to the appropriate array below (chicagoland, elsewhere, or special).
 *  2. Create a minimal route page at src/routes/<slug>/+page.svelte that imports
 *     the event via getEventProps() and renders <EventPage>.
 *  3. Drop the shield image into static/images/.
 *  4. That's it — the homepage cards, navbar, sitemap, and sponsors page all
 *     pull from this single file automatically.
 */

const SITE_URL = 'https://burbsec.com';

/** @typedef {'chicagoland'|'elsewhere'|'special'} EventCategory */

/**
 * @typedef {Object} BurbSecEvent
 * @property {string} slug          - URL path segment (e.g. 'east')
 * @property {string} title         - Display title (e.g. 'BurbSec|East')
 * @property {string} subtitle      - Meeting cadence
 * @property {string} location      - Human-readable location
 * @property {string} eventImage    - Path to shield/logo in static/
 * @property {string} gmapsLink     - Google Maps link
 * @property {string} cardTitle     - Short name for homepage card
 * @property {string} cardSchedule  - Short schedule for homepage card
 * @property {EventCategory} category
 * @property {string|null} [blueskyHandle]
 * @property {string|null} [discordLink]
 * @property {string}       [meetupPage]
 * @property {string|null} [eventbriteLink]
 * @property {string|null} [irlImage]
 * @property {string|null} [galleryFolder] - Subfolder name under static/images/irl/ for gallery images
 * @property {Object}      [seo]           - Per-page SEO overrides
 * @property {Object}      [structuredData] - Extra JSON-LD fields
 * @property {Object|null} [sponsor]       - Sponsor page card data
 */

/** @type {BurbSecEvent[]} */
export const chicagolandEvents = [
	{
		slug: 'east',
		title: 'BurbSec|East',
		subtitle: 'Meets Every Last Thursday of the Month',
		location: 'Chicago, IL',
		eventImage: '/images/east_shield.png',
		gmapsLink: 'https://maps.app.goo.gl/r8nxdKddizJqfU4u9',
		blueskyHandle: 'east.burbsec.com',
		discordLink: 'https://tinyurl.com/burbchat',
		meetupPage: 'https://www.meetup.com/burbsec/events//',
		eventbriteLink: null,
		irlImage: '/images/irl/east.webp',
		galleryFolder: 'east',
		cardTitle: 'Chicago',
		cardSchedule: 'Every Last Thursday',
		category: 'chicagoland',
		seo: {
			title: 'BurbSec East Chicago | Information Security Meetup Every Last Thursday',
			description:
				'Join BurbSec East Chicago - an informal information security meetup for cybersecurity enthusiasts, ethical hackers, and IT professionals. Every last Thursday at Navigator Taproom. A welcoming community for Chicago\'s infosec professionals seeking networking opportunities. No dues, no presentations, just networking!',
			keywords:
				'chicago information security, chicago cybersecurity meetup, chicago infosec, chicago hacking meetup, chicago security professionals, navigator taproom, chicago tech meetup, cybersecurity networking chicago, ethical hacking chicago, IT security chicago, dc312 chicago, dcg312 chicago, chicago 2600, defcon chicago, chicago hacker community, chicago security community, chicago infosec networking',
			image: `${SITE_URL}/images/east_shield.png`
		},
		structuredData: {
			venueName: 'Navigator Taproom',
			streetAddress: '5062 N Lincoln Ave',
			addressLocality: 'Chicago',
			addressRegion: 'IL',
			postalCode: '60625',
			addressCountry: 'US',
			latitude: '41.9742',
			longitude: '-87.6892',
			timezone: '-06:00'
		},
		sponsor: {
			when: 'Every LAST (Fourth or Fifth) Thursday',
			attendance: '30-100 (usually 30-50) active and prospective IT and Infosec professionals and enthusiasts',
			crowd: 'Younger crowd, some students. Many looking to begin or switch careers',
			venueName: 'Navigator Taproom in Chicago',
			avgSponsorship: '$1000'
		}
	},
	{
		slug: 'north',
		title: 'BurbSec|North',
		subtitle: 'Meets Every Second Thursday of the Month',
		location: 'Wheeling, IL',
		eventImage: '/images/north_shield.png',
		gmapsLink: 'https://maps.app.goo.gl/vKw3rXeF5XBbqDPk9',
		blueskyHandle: 'north.burbsec.com',
		discordLink: 'https://tinyurl.com/burbchat',
		meetupPage: 'https://www.meetup.com/burbsec/events//',
		eventbriteLink: null,
		irlImage: '/images/irl/north.webp',
		galleryFolder: 'north',
		cardTitle: 'Wheeling',
		cardSchedule: 'Every Second Thursday',
		category: 'chicagoland',
		seo: {
			title: 'BurbSec North Wheeling | Information Security Meetup Every Second Thursday',
			description: 'Join BurbSec North in Wheeling, IL - an informal information security meetup for cybersecurity enthusiasts and IT professionals. Every second Thursday at D\'Agostino\'s Pizzeria. No dues, no presentations, just great networking!',
			keywords: 'wheeling information security, wheeling cybersecurity meetup, north suburbs infosec, chicagoland security meetup, wheeling tech meetup, cybersecurity networking wheeling',
			image: `${SITE_URL}/images/north_shield.png`
		},
		structuredData: {
			venueName: "D'Agostino's Pizzeria",
			addressLocality: 'Wheeling',
			addressRegion: 'IL',
			addressCountry: 'US',
			latitude: '42.1392',
			longitude: '-87.9290'
		},
		sponsor: {
			when: 'Every SECOND Thursday',
			attendance: '15-20 active and prospective IT and Infosec professionals and enthusiasts',
			crowd: 'Older, more experienced',
			venueName: "D'Agostino's Pizzeria in Wheeling",
			avgSponsorship: '$350'
		}
	},
	{
		slug: 'south',
		title: 'BurbSec|South',
		subtitle: 'Meets Every Second Thursday of the Month',
		location: 'Hickory Hills, IL',
		eventImage: '/images/south_shield.png',
		gmapsLink: 'https://maps.app.goo.gl/7TwUErotFbsUHMXu8',
		blueskyHandle: 'south.burbsec.com',
		discordLink: 'https://tinyurl.com/burbchat',
		meetupPage: 'https://www.meetup.com/burbsec/events//',
		eventbriteLink: null,
		irlImage: '/images/irl/south.webp',
		galleryFolder: 'south',
		cardTitle: 'Hickory Hills',
		cardSchedule: 'Every Second Thursday',
		category: 'chicagoland',
		seo: {
			title: 'BurbSec South Hickory Hills | Information Security Meetup Every Second Thursday',
			description: 'Join BurbSec South in Hickory Hills, IL - an informal information security meetup for cybersecurity enthusiasts, students, and IT professionals. Every second Thursday at Prime Time Restaurant.',
			keywords: 'hickory hills information security, south suburbs cybersecurity meetup, chicagoland infosec, hickory hills tech meetup, south side security meetup, cybersecurity networking south suburbs',
			image: `${SITE_URL}/images/south_shield.png`
		},
		structuredData: {
			venueName: 'Prime Time Restaurant',
			addressLocality: 'Hickory Hills',
			addressRegion: 'IL',
			addressCountry: 'US',
			latitude: '41.7253',
			longitude: '-87.8256'
		},
		sponsor: {
			when: 'Also meets every SECOND Thursday',
			attendance: '20-30 active and prospective IT and Infosec professionals and enthusiasts',
			crowd: 'Younger crowd, some students',
			venueName: 'Prime Time Restaurant in Hickory Hills',
			avgSponsorship: '$600'
		}
	},
	{
		slug: 'prime',
		title: 'BurbSec|Prime',
		subtitle: 'Meets Every First Thursday of the Month',
		location: 'Schaumburg, IL',
		eventImage: '/images/prime_shield.png',
		gmapsLink: 'https://maps.app.goo.gl/pF7Jx6aANbpB5X5x6',
		blueskyHandle: 'prime.burbsec.com',
		discordLink: 'https://tinyurl.com/burbchat',
		meetupPage: 'https://www.meetup.com/burbsec/events//',
		eventbriteLink: null,
		irlImage: '/images/irl/prime.webp',
		galleryFolder: 'prime',
		cardTitle: 'Schaumburg',
		cardSchedule: 'Every First Thursday',
		category: 'chicagoland',
		seo: {
			title: 'BurbSec Prime Schaumburg | Information Security Meetup Every First Thursday',
			description: 'Join BurbSec Prime in Schaumburg, IL - the flagship information security meetup at Enterrium in Woodfield Mall. Every first Thursday. Connect with experienced cybersecurity professionals.',
			keywords: 'schaumburg information security, schaumburg cybersecurity meetup, woodfield mall tech meetup, chicagoland infosec, schaumburg security professionals, cybersecurity networking schaumburg',
			image: `${SITE_URL}/images/prime_shield.png`
		},
		structuredData: {
			venueName: 'Enterrium at Woodfield Mall',
			addressLocality: 'Schaumburg',
			addressRegion: 'IL',
			addressCountry: 'US',
			latitude: '42.0451',
			longitude: '-88.0340'
		},
		sponsor: {
			when: 'Every FIRST Thursday',
			attendance: '20-40 active and prospective IT and Infosec professionals and enthusiasts',
			crowd: 'Experienced',
			venueName: 'Enterrium in the Woodfield Mall, Schaumburg',
			avgSponsorship: '$700'
		}
	},
	{
		slug: 'northwest',
		title: 'BurbSec|Northwest',
		subtitle: 'Meets Every Fourth Thursday of the Month',
		location: 'Crystal Lake, IL',
		eventImage: '/images/northwest_shield.jpg',
		gmapsLink: 'https://maps.app.goo.gl/3sPARGKDgtfDEUct7',
		blueskyHandle: 'northwest.burbsec.com',
		discordLink: 'https://tinyurl.com/burbchat',
		meetupPage: 'https://www.meetup.com/burbsec/events//',
		eventbriteLink: null,
		irlImage: '/images/irl/northwest.webp',
		galleryFolder: 'northwest',
		cardTitle: 'Crystal Lake',
		cardSchedule: 'Every Fourth Thursday',
		category: 'chicagoland',
		seo: {
			title: 'BurbSec Northwest Crystal Lake | Information Security Meetup Every Fourth Thursday',
			description: 'Join BurbSec Northwest in Crystal Lake, IL - an informal information security meetup at Crystal Lake Brewing. Every fourth Thursday. Connect with cybersecurity professionals in the northwest suburbs.',
			keywords: 'crystal lake information security, crystal lake cybersecurity meetup, northwest suburbs infosec, mchenry county tech meetup, cybersecurity networking crystal lake',
			image: `${SITE_URL}/images/northwest_shield.jpg`
		},
		structuredData: {
			venueName: 'Crystal Lake Brewing',
			addressLocality: 'Crystal Lake',
			addressRegion: 'IL',
			addressCountry: 'US',
			latitude: '42.2411',
			longitude: '-88.3162'
		},
		sponsor: {
			when: 'Every FOURTH Thursday',
			attendance: '5-10 active and prospective IT and Infosec professionals and enthusiasts',
			crowd: null,
			venueName: 'Crystal Lake Brewing in Crystal Lake',
			avgSponsorship: '$250'
		}
	},
	{
		slug: 'west',
		title: 'BurbSec|West',
		subtitle: 'Meets Every Third Thursday of the Month',
		location: 'Naperville, IL',
		eventImage: '/images/west_shield.png',
		gmapsLink: 'https://maps.app.goo.gl/PzHrLb5qNxooVLDg8',
		blueskyHandle: 'west.burbsec.com',
		discordLink: 'https://tinyurl.com/burbchat',
		meetupPage: 'https://www.meetup.com/burbsec/events//',
		eventbriteLink: null,
		irlImage: '/images/irl/west.webp',
		galleryFolder: 'west',
		cardTitle: 'Naperville',
		cardSchedule: 'Every Third Thursday',
		category: 'chicagoland',
		seo: {
			title: 'BurbSec West Naperville | Information Security Meetup Every Third Thursday',
			description: 'Join BurbSec West in Naperville, IL - an informal information security meetup at Granite City Food & Brewery. Every third Thursday. Network with cybersecurity professionals in the western suburbs.',
			keywords: 'naperville information security, naperville cybersecurity meetup, west suburbs infosec, dupage county tech meetup, cybersecurity networking naperville, naperville security professionals',
			image: `${SITE_URL}/images/west_shield.png`
		},
		structuredData: {
			venueName: 'Granite City Food & Brewery',
			streetAddress: '1828 Abriter Ct',
			addressLocality: 'Naperville',
			addressRegion: 'IL',
			addressCountry: 'US',
			latitude: '41.7508',
			longitude: '-88.2120'
		},
		sponsor: {
			when: 'Every THIRD Thursday',
			attendance: '20-30 active and prospective IT and Infosec professionals and enthusiasts',
			crowd: 'Moderately experienced',
			venueName: 'Granite City Food & Brewery in Naperville',
			avgSponsorship: '$500'
		}
	},
	{
		slug: 'southeast',
		title: 'BurbSec|Southeast',
		subtitle: 'Meets Every First Monday of the Month',
		location: 'South Bend, IN',
		eventImage: '/images/southeast_shield.jpg',
		gmapsLink: 'https://maps.app.goo.gl/HNuZoxi129o6UFsF9',
		blueskyHandle: 'southeast.burbsec.com',
		discordLink: 'https://tinyurl.com/burbchat',
		meetupPage: 'https://www.meetup.com/burbsec/events//',
		eventbriteLink: null,
		irlImage: '/images/irl/southeast.webp',
		galleryFolder: 'southeast',
		cardTitle: 'South Bend, IN',
		cardSchedule: 'Every First Monday',
		category: 'chicagoland',
		seo: {
			title: 'BurbSec Southeast South Bend | Information Security Meetup Every First Monday',
			description: 'Join BurbSec Southeast in South Bend, IN - an informal information security meetup for cybersecurity enthusiasts in Northwest Indiana. Every first Monday. Great for early-career professionals.',
			keywords: 'south bend information security, indiana cybersecurity meetup, northwest indiana infosec, south bend tech meetup, indiana security professionals, cybersecurity networking indiana',
			image: `${SITE_URL}/images/southeast_shield.jpg`
		},
		structuredData: {
			venueName: 'South Bend Venue',
			addressLocality: 'South Bend',
			addressRegion: 'IN',
			addressCountry: 'US',
			latitude: '41.6764',
			longitude: '-86.2520'
		},
		sponsor: {
			when: 'Every FIRST Monday',
			attendance: '25-40 active and prospective IT and Infosec professionals and enthusiasts',
			crowd: 'Younger, early career',
			venueName: 'NW Indiana',
			avgSponsorship: '$250'
		}
	}
];

/** @type {BurbSecEvent[]} */
export const elsewhereEvents = [
	{
		slug: 'minneapolis',
		title: 'BurbSec|Minneapolis',
		subtitle: 'Meets every Third Thursday of the Month',
		location: 'Minneapolis, MN',
		eventImage: '/images/mpls_shield.png',
		gmapsLink: 'https://maps.app.goo.gl/MqP9s8EGQvQefiMu9',
		blueskyHandle: null,
		discordLink: 'https://tinyurl.com/burbchat',
		meetupPage: 'https://www.meetup.com/burbsec/events//',
		eventbriteLink:
			'https://www.eventbrite.com/e/burbsec-mpls-networking-meetup-tickets-1749486103029?aff=oddtdtcreator',
		irlImage: null,
		galleryFolder: 'mpls',
		cardTitle: 'Minneapolis, MN',
		cardSchedule: 'Every Third Thursday',
		category: 'elsewhere',
		seo: {
			title: 'BurbSec Minneapolis | Information Security Meetup in Minnesota',
			description:
				'Join BurbSec Minneapolis - information security meetup in Minnesota! Connect with cybersecurity professionals, ethical hackers, and infosec enthusiasts. Monthly networking events at Forgotten Star Brewing Co.',
			keywords:
				'minneapolis information security, minneapolis cybersecurity meetup, minneapolis infosec, minneapolis hacking meetup, minneapolis security professionals, minnesota cybersecurity, minnesota infosec, twin cities tech meetup, cybersecurity networking minneapolis, ethical hacking minneapolis, IT security minneapolis, minnesota security meetup',
			image: null
		},
		structuredData: {
			venueName: 'Forgotten Star Brewing Co.',
			addressLocality: 'Fridley',
			addressRegion: 'MN',
			addressCountry: 'US',
			latitude: '44.9778',
			longitude: '-93.2650',
			timezone: '-06:00'
		},
		sponsor: {
			when: 'Every THIRD Thursday',
			attendance: '25-40 active and prospective IT and Infosec professionals and enthusiasts',
			crowd: null,
			venueName: 'Forgotten Star Brewing Co. in Fridley, MN',
			avgSponsorship: '$250'
		}
	},
	{
		slug: 'lasvegas',
		title: 'BurbSec|Las Vegas',
		subtitle: 'Monthly Meetup',
		location: 'Las Vegas, NV',
		eventImage: '/images/vegas_shield.png',
		gmapsLink: 'https://maps.app.goo.gl/FiRoGYPdMi1nB5SeA',
		blueskyHandle: 'lasvegas.burbsec.com',
		discordLink: 'https://tinyurl.com/burbchat',
		meetupPage: 'https://www.meetup.com/burbsec/events/vegas/',
		eventbriteLink: null,
		irlImage: '/images/irl/vegas.webp',
		galleryFolder: 'lasvegas',
		cardTitle: 'Las Vegas',
		cardSchedule: 'Monthly Meetup',
		category: 'elsewhere',
		seo: {
			title: 'BurbSec Las Vegas | Information Security Meetup in Sin City',
			description:
				'Join BurbSec Las Vegas - information security meetup in Sin City! Connect with cybersecurity professionals, ethical hackers, and infosec enthusiasts in the entertainment capital. Monthly networking events.',
			keywords:
				'las vegas information security, las vegas cybersecurity meetup, las vegas infosec, las vegas hacking meetup, las vegas security professionals, sin city cybersecurity, nevada infosec, vegas tech meetup, cybersecurity networking las vegas, ethical hacking las vegas, IT security las vegas, nevada security meetup',
			image: `${SITE_URL}/images/vegas_shield.png`
		},
		structuredData: {
			venueName: 'Las Vegas',
			addressLocality: 'Las Vegas',
			addressRegion: 'NV',
			addressCountry: 'US',
			latitude: '36.1699',
			longitude: '-115.1398',
			timezone: '-08:00'
		},
		sponsor: {
			when: null,
			attendance: '20-40 active and prospective IT and Infosec professionals and enthusiasts',
			crowd: null,
			venueName: 'Various locations in Las Vegas, NV',
			avgSponsorship: '$250'
		}
	},
	{
		slug: 'galway',
		title: 'BurbSec|Galway',
		subtitle: 'Monthly Meetup',
		location: 'Galway, Ireland',
		eventImage: '/images/galway_road_sign.jpg',
		gmapsLink: 'https://maps.app.goo.gl/xQZRj9i17up8gyQ49',
		blueskyHandle: 'galway.burbsec.com',
		discordLink: 'https://tinyurl.com/burbchat',
		meetupPage: 'https://www.meetup.com/burbsec/events/-galway',
		eventbriteLink: null,
		irlImage: '/images/irl/galway.webp',
		galleryFolder: 'galway',
		cardTitle: 'Galway, Ireland',
		cardSchedule: 'Monthly Meetup',
		category: 'elsewhere',
		seo: {
			title: 'BurbSec Galway Ireland | Information Security Meetup',
			description: 'Join BurbSec Galway - information security meetup in Ireland! Connect with cybersecurity professionals and infosec enthusiasts in the west of Ireland. Monthly networking events.',
			keywords: 'galway information security, ireland cybersecurity meetup, galway infosec, ireland hacking meetup, galway security professionals, irish cybersecurity community, galway tech meetup',
			image: `${SITE_URL}/images/galway_road_sign.jpg`
		},
		structuredData: {
			venueName: 'Keanes Oranmore',
			addressLocality: 'Galway',
			addressRegion: 'Connacht',
			addressCountry: 'IE',
			latitude: '53.2707',
			longitude: '-9.0568'
		},
		sponsor: {
			when: null,
			attendance: '5-7 active and prospective IT and Infosec professionals and enthusiasts',
			crowd: null,
			venueName: "Keanes Oranmore in Galway, Ireland (Yes, Ireland)",
			avgSponsorship: '€200'
		}
	}
];

/** @type {BurbSecEvent[]} */
export const specialEvents = [
	{
		slug: 'cigarsec',
		title: 'CigarSec',
		subtitle: 'Special Interest Group',
		location: 'Various Locations',
		eventImage: '/images/cigar_shield.png',
		gmapsLink: 'https://maps.app.goo.gl/hErgudNj7wSGGpaG9',
		blueskyHandle: 'cigars.burbsec.com',
		discordLink: 'https://tinyurl.com/burbchat',
		meetupPage: 'https://www.meetup.com/burbsec/events//',
		eventbriteLink: null,
		irlImage: null,
		cardTitle: 'CigarSec',
		cardSchedule: 'Special Interest Group',
		category: 'special',
		seo: {
			title: 'CigarSec | InfoSec Meets Cigars - BurbSec Special Interest Group',
			description: 'CigarSec is a BurbSec special interest group combining premium cigars with information security discussions. Join security professionals for co-working, networking, and great conversation.',
			keywords: 'cigarsec, cigar security meetup, infosec cigars, cybersecurity networking, security professionals cigars, burbsec special interest',
			image: `${SITE_URL}/images/cigar_shield.png`
		}
	}
];

/** All events in a single flat array. */
export const allEvents = [...chicagolandEvents, ...elsewhereEvents, ...specialEvents];

/**
 * Look up a single event by its URL slug.
 * @param {string} slug
 * @returns {BurbSecEvent|undefined}
 */
export function getEvent(slug) {
	return allEvents.find((e) => e.slug === slug);
}

/**
 * Look up an event and return only the props that EventPage accepts.
 * This avoids Svelte "unused export property" warnings when spreading.
 * @param {string} slug
 * @returns {Omit<BurbSecEvent, 'slug'|'cardTitle'|'cardSchedule'|'category'|'sponsor'|'galleryFolder'>}
 */
export function getEventProps(slug) {
 const event = getEvent(slug);
 if (!event) return undefined;
 const { slug: _slug, cardTitle, cardSchedule, category, sponsor, galleryFolder, ...props } = event;
 return props;
}

/**
 * Get all events that have sponsor data.
 * @returns {BurbSecEvent[]}
 */
export function getSponsorEvents() {
	return allEvents.filter((e) => e.sponsor);
}

/** The base URL for the live site (used in canonical tags, OG meta, structured data). */
export { SITE_URL };
