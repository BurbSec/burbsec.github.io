<script>
	import { page } from '$app/state';
	import { SITE_URL } from '$lib/data/events.js';
	import ImageGallery from '$lib/components/ImageGallery.svelte';

	let {
		title,
		subtitle,
		location,
		eventImage,
		blueskyHandle = null,
		discordLink = null,
		gmapsLink,
		meetupPage = 'https://www.meetup.com/burbsec/events//',
		eventbriteLink = null,
		irlImage = null,
		/** @type {string[]} */
		galleryImages = [],
		/** @type {import('$lib/data/events.js').BurbSecEvent['seo']|null} */
		seo = null,
		/** @type {import('$lib/data/events.js').BurbSecEvent['structuredData']|null} */
		structuredData = null,
		children
	} = $props();

	let canonicalUrl = $derived(`${SITE_URL}${page.url.pathname}`);
	let pageTitle = $derived(seo?.title ?? `${title} | Burbsec`);
	let pageDescription = $derived(seo?.description ?? `${title} - ${subtitle}`);
	let ogImage = $derived(seo?.image ?? `${SITE_URL}${eventImage}`);

	let jsonLd = $derived(
		structuredData
			? JSON.stringify({
					'@context': 'https://schema.org',
					'@type': 'Event',
					name: `${title} Information Security Meetup`,
					description: pageDescription,
					eventSchedule: {
						'@type': 'Schedule',
						repeatFrequency: 'P1M'
					},
					eventStatus: 'https://schema.org/EventScheduled',
					eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
					location: {
						'@type': 'Place',
						name: structuredData.venueName,
						address: {
							'@type': 'PostalAddress',
							...(structuredData.streetAddress && { streetAddress: structuredData.streetAddress }),
							addressLocality: structuredData.addressLocality,
							addressRegion: structuredData.addressRegion,
							...(structuredData.postalCode && { postalCode: structuredData.postalCode }),
							addressCountry: structuredData.addressCountry
						},
						geo: {
							'@type': 'GeoCoordinates',
							latitude: structuredData.latitude,
							longitude: structuredData.longitude
						}
					},
					organizer: {
						'@type': 'Organization',
						name: 'BurbSec Network',
						url: SITE_URL
					},
					offers: {
						'@type': 'Offer',
						price: '0',
						priceCurrency: 'USD',
						availability: 'https://schema.org/InStock',
						validFrom: `2010-06-01T00:00:00${structuredData.timezone || '-06:00'}`,
						url: eventbriteLink ?? meetupPage
					},
					audience: {
						'@type': 'Audience',
						audienceType:
							'Information Security Professionals, Cybersecurity Enthusiasts, Ethical Hackers, IT Professionals'
					},
					image: ogImage,
					url: canonicalUrl
				})
			: null
	);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	{#if seo?.keywords}
		<meta name="keywords" content={seo.keywords} />
	{/if}
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph -->
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={ogImage} />

	<!-- Twitter Card -->
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={ogImage} />

	<!-- Structured Data -->
	{#if jsonLd}
		{@html `<script type="application/ld+json">${jsonLd}</script>`}
	{/if}
</svelte:head>

<div class="event-page container-lg pb-3 flex-fill">
	<div class="row pt-2">
		<article id="maincontent" class="col-lg-8 mt-3 mx-auto">
			<div class="text-center mb-4">
				<h1>{title}</h1>
				<p class="lead">{subtitle}</p>
			</div>

			<div class="row justify-content-center align-items-center mb-4">
				{#if blueskyHandle}
					<div class="col-sm d-flex flex-column mb-2">
						<a href="https://bsky.app/profile/{blueskyHandle}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
							<img src="/images/bluesky.svg" alt="Bluesky" width="24" height="24" class="me-2 bluesky-icon">
							Follow us on BlueSky!
						</a>
					</div>
				{/if}
				{#if discordLink}
					<div class="col-sm d-flex flex-column mb-2">
						<a href={discordLink} class="btn btn-primary" target="_blank" rel="noopener noreferrer">
							<i class="fa-brands fa-discord fa-xl"></i>
							Join us on Discord!
						</a>
					</div>
				{/if}
				<div class="col-sm d-flex flex-column mb-2">
					<a href={gmapsLink} class="btn btn-success" target="_blank" rel="noopener noreferrer">
						<i class="fa-solid fa-map-location-dot fa-xl"></i>
						{location}
					</a>
				</div>
				<div class="col-sm d-flex flex-column mb-2">
					{#if eventbriteLink}
						<a href={eventbriteLink} class="btn btn-warning" target="_blank" rel="noopener noreferrer">
							<i class="fa-solid fa-calendar-days fa-xl"></i>
							Next Meetups
						</a>
					{:else}
						<a href={meetupPage} class="btn btn-warning" target="_blank" rel="noopener noreferrer">
							<i class="fa-solid fa-calendar-days fa-xl"></i>
							Next Meetups
						</a>
					{/if}
				</div>
			</div>

			<div class="content mb-4">
				{@render children()}
			</div>

			<div class="text-center">
				<img src={eventImage} alt={title} class="event-image" loading="lazy" decoding="async" />
			</div>

			{#if galleryImages.length > 0}
				<ImageGallery images={galleryImages} alt="{title} IRL Photo" />
			{:else if irlImage}
				<div class="text-center mt-4">
					<img src={irlImage} alt="{title} IRL Photo" class="img-fluid rounded-3 irl-photo" width="600" height="400" loading="lazy" decoding="async" />
				</div>
			{/if}
		</article>
	</div>
</div>
