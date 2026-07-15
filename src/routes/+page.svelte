<script>
	import Icon from '$lib/components/Icon.svelte';
	import { allEvents, SITE_URL } from '$lib/data/events.js';
	import { nextOccurrence, formatShort } from '$lib/utils/schedule.js';
	import ImageGallery from '$lib/components/ImageGallery.svelte';

	let { data } = $props();

	const faqs = [
		{
			q: 'Do I need to RSVP or buy a ticket?',
			a: 'No — just show up. There are no tickets, no registration, and no waiting list. Walk in whenever you can make it and leave whenever you need to.'
		},
		{
			q: 'How much does it cost?',
			a: 'Nothing. There are no dues or cover charges — you only pay for your own food and drinks (and when a sponsor is on board, some of that gets covered too).'
		},
		{
			q: 'What actually happens at a meetup?',
			a: 'No presentations, no vendor pitches, no CPE sign-in sheets — just a few hours of informal networking with information security professionals, students, and enthusiasts over food and drinks.'
		},
		{
			q: "I'm new and don't know anyone. How do I find the group?",
			a: "Look for the BurbSec sign at the table, ask the venue staff where BurbSec is sitting, or hop into our Discord and say you're at the door — someone will come find you."
		},
		{
			q: 'Is there an age restriction?',
			a: 'It depends on the venue. Some of our locations are family-friendly restaurants and taprooms, others are 21+ bars — check with the specific venue before bringing anyone under drinking age.'
		}
	];

	const faqJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((f) => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: { '@type': 'Answer', text: f.a }
		}))
	});

	const pageDescription = 'Join Burbsec, the premier information security meetup network! Weekly cybersecurity events in Chicago, Las Vegas, Galway & more. Connect with ethical hackers, security professionals, and infosec enthusiasts. Free networking events with hands-on training, CTFs, and industry talks.';

	const webPageJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Burbsec - Information Security Meetup Network',
		description: pageDescription,
		url: SITE_URL,
		mainEntity: {
			'@type': 'Organization',
			name: 'Burbsec Network',
			description: 'Information security meetup network connecting cybersecurity professionals worldwide',
			hasOfferCatalog: {
				'@type': 'OfferCatalog',
				name: 'Cybersecurity Events',
				itemListElement: allEvents.map((e) => ({
					'@type': 'Offer',
					validFrom: `2010-06-01T00:00:00${e.structuredData?.timezone || '-06:00'}`,
					itemOffered: {
						'@type': 'Event',
						name: e.title,
						description: `${e.subtitle} in ${e.location}`,
						category: 'Technology'
					}
				}))
			}
		},
		breadcrumb: {
			'@type': 'BreadcrumbList',
			itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL }]
		}
	});
</script>

<svelte:head>
	<title>Burbsec | The World's Most Fun InfoSec Meetup Events!</title>
	<meta name="description" content={pageDescription} />
	<link rel="canonical" href={SITE_URL} />

	<!-- Page-specific Open Graph Tags -->
	<meta property="og:title" content="Burbsec | The World's Most Fun InfoSec Meetup Events!" />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:image" content={`${SITE_URL}/images/hacker_shield.png`} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Burbsec - The World's Most Fun InfoSec Meetup Network" />

	<!-- Page-specific Twitter Card Tags -->
	<meta name="twitter:title" content="Burbsec | The World's Most Fun InfoSec Meetup Events!" />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={`${SITE_URL}/images/hacker_shield.png`} />
	<meta name="twitter:image:alt" content="Burbsec - The World's Most Fun InfoSec Meetup Network" />

	{@html `<script type="application/ld+json">${webPageJsonLd}</script>`}
	{@html `<script type="application/ld+json">${faqJsonLd}</script>`}
</svelte:head>

<div class="home-page">
	<video autoplay muted loop playsinline preload="metadata" poster="/images/bg.jpg" class="background-video" aria-hidden="true">
		<source src="/videos/logo_bg.mp4" type="video/mp4">
		Your browser does not support the video tag.
	</video>
	<div class="hero-section">
		<div class="container hero-content">
			<div class="row justify-content-center text-center">
				<div class="col-lg-8">
					<h1 class="display-3 fw-bold mb-4 landingpage-title text-white">Burbsec|Network</h1>
					<p class="lead mb-5 landingpage-subtitle text-white">The World's Most Fun InfoSec Meetup Events!</p>
					<div class="d-flex flex-column flex-md-row gap-3 justify-content-center">
						<a href="https://tinyurl.com/burbchat" class="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
							<Icon name="discord" /> Join the discussion on Discord!
						</a>
						<a href="https://www.meetup.com/burbsec/events/" class="btn btn-danger btn-lg" target="_blank" rel="noopener noreferrer">
							<Icon name="meetup" /> Find your local Burbsec meet!
						</a>
					</div>
					<div class="d-flex flex-column flex-md-row gap-3 justify-content-center mt-3">
						<a href="/sponsors" class="btn btn-outline-primary btn-lg">
							<Icon name="hand-holding-medical" /> Sponsor a night of fun!
						</a>
						<a href="https://chicagoinfosecevents.github.io/" class="btn btn-outline-primary btn-lg" target="_blank" rel="noopener noreferrer">
							<Icon name="calendar-days" /> Full Chicagoland Infosec Calendar
						</a>
					</div>
				</div>
			</div>
		</div>
		{#if data.heroImages && data.heroImages.length > 0}
			<div class="hero-gallery">
				<ImageGallery images={data.heroImages} alt="BurbSec meetup" />
			</div>
		{/if}
		<div class="scroll-section text-center">
			<p class="text-white mb-2">Scroll for more!</p>
			<span class="scroll-indicator" aria-hidden="true"><span class="scroll-chevron"></span></span>
		</div>
	</div>

	<div class="content-band">
	<div class="container my-5">

		<div class="row">
			<div class="col-12 text-center mb-5 mt-4">
				<h2 class="section-heading">Our Locations</h2>
				<p class="lead">Join us at one of our many locations across the Chicagoland area and beyond!</p>
			</div>
		</div>

		<div class="row g-4">
			{#each allEvents as event (event.slug)}
				<div class="col-md-6 col-lg-4">
					<div class="card event-card h-100">
						<div class="card-body text-center">
							<img src={event.eventImage}
								 alt="{event.cardTitle} shield"
								 class="mb-3" width="80" height="80" loading="lazy" decoding="async">
							<h5 class="card-title">{event.cardTitle}</h5>
							<p class="card-text mb-1">{event.cardSchedule}</p>
							{#if event.schedule}
								<p class="card-next-date">Next: {formatShort(nextOccurrence(event.schedule))}</p>
							{:else}
								<p class="card-next-date">See Discord for dates</p>
							{/if}
							<a href="/{event.slug}" class="btn btn-outline-primary">Learn More</a>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div class="row mt-5" id="faq">
			<div class="col-lg-8 mx-auto">
				<div class="text-center mb-4">
					<h2 class="section-heading">First Time? FAQ</h2>
				</div>
				{#each faqs as faq (faq.q)}
					<div class="faq-item">
						<h3 class="faq-question h5">{faq.q}</h3>
						<p class="faq-answer mb-0">{faq.a}</p>
					</div>
				{/each}
				<p class="text-center mt-4 mb-0">
					<a href="/calendar/burbsec.ics" class="btn btn-primary btn-lg" download>
						<Icon name="calendar" /> Add all meetups to your calendar
					</a>
				</p>
			</div>
		</div>
	</div>
	</div>
</div>
