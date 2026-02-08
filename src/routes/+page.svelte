<script>
	import { chicagolandEvents, elsewhereEvents, specialEvents, allEvents, SITE_URL } from '$lib/data/events.js';

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

	<!-- Page-specific Twitter Card Tags -->
	<meta name="twitter:title" content="Burbsec | The World's Most Fun InfoSec Meetup Events!" />
	<meta name="twitter:description" content={pageDescription} />

	{@html `<script type="application/ld+json">${webPageJsonLd}</script>`}
</svelte:head>

<div class="home-page">
	<video autoplay muted loop playsinline preload="metadata" poster="/images/bg.jpg" class="background-video" aria-hidden="true">
		<source src="/videos/logo_bg.mp4" type="video/mp4">
		Your browser does not support the video tag.
	</video>
	<div class="hero-section">
		<div class="container">
			<div class="row justify-content-center text-center">
				<div class="col-lg-8">
					<h1 class="display-3 fw-bold mb-4 landingpage-title text-white">Burbsec|Network</h1>
					<p class="lead mb-5 landingpage-subtitle text-white">The World's Most Fun InfoSec Meetup Events!</p>
					<div class="d-flex flex-column flex-md-row gap-3 justify-content-center">
						<a href="https://tinyurl.com/burbchat" class="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
							<i class="fa-brands fa-discord"></i> Join the discussion on Discord!
						</a>
						<a href="https://www.meetup.com/burbsec/" class="btn btn-warning btn-lg" target="_blank" rel="noopener noreferrer">
							<i class="fa-brands fa-meetup"></i> Find your local Burbsec meet!
						</a>
					</div>
					<div class="d-flex flex-column flex-md-row gap-3 justify-content-center mt-3">
						<a href="/sponsors" class="btn btn-success btn-lg">
							<i class="fa-solid fa-hand-holding-medical"></i> Sponsor a night of fun!
						</a>
						<a href="https://chicagoinfosecevents.github.io/" class="btn btn-info btn-lg" target="_blank" rel="noopener noreferrer">
							<i class="fa-solid fa-calendar-days"></i> Full Chicagoland Infosec Calendar
						</a>
					</div>
					<div class="text-center mt-5">
						<p class="text-white mb-2">Scroll for more!</p>
						<img src="/images/scroll_down.png" alt="Scroll down" width="30" height="30" class="scroll-indicator" decoding="async">
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="container my-5">
		<div class="row">
			<div class="col-12 text-center mb-5">
				<h2>Our Locations</h2>
				<p class="lead">Join us at one of our many locations across the Chicagoland area and beyond!</p>
			</div>
		</div>

		<!-- Chicagoland Events (auto-generated) -->
		<div class="row g-4">
			{#each chicagolandEvents as event (event.slug)}
				<div class="col-md-6 col-lg-4">
					<div class="card event-card h-100">
						<div class="card-body text-center">
							<img src={event.eventImage}
								 alt="{event.cardTitle} shield"
								 class="mb-3" width="80" height="80" loading="lazy" decoding="async">
							<h5 class="card-title">{event.cardTitle}</h5>
							<p class="card-text">{event.cardSchedule}</p>
							<a href="/{event.slug}" class="btn btn-outline-primary">Learn More</a>
						</div>
					</div>
				</div>
			{/each}

			<!-- Elsewhere Events (auto-generated) -->
			{#each elsewhereEvents as event (event.slug)}
				<div class="col-md-6 col-lg-4">
					<div class="card event-card h-100">
						<div class="card-body text-center">
							<img src={event.eventImage}
								 alt="{event.cardTitle} shield"
								 class="mb-3" width="80" height="80" loading="lazy" decoding="async">
							<h5 class="card-title">{event.cardTitle}</h5>
							<p class="card-text">{event.cardSchedule}</p>
							<a href="/{event.slug}" class="btn btn-outline-primary">Learn More</a>
						</div>
					</div>
				</div>
			{/each}

			<!-- Special Interest Groups (auto-generated) -->
			{#each specialEvents as event (event.slug)}
				<div class="col-md-6 col-lg-4">
					<div class="card event-card h-100">
						<div class="card-body text-center">
							<img src={event.eventImage}
								 alt="{event.cardTitle} shield"
								 class="mb-3" width="80" height="80" loading="lazy" decoding="async">
							<h5 class="card-title">{event.cardTitle}</h5>
							<p class="card-text">{event.cardSchedule}</p>
							<a href="/{event.slug}" class="btn btn-outline-primary">Learn More</a>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	/* Scoped styles for the homepage */
	.home-page {
		position: relative;
		min-height: 100vh;
		overflow: hidden;
	}
	
	.background-video {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: -2;
	}
	
	.home-page::before {
		content: '';
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(rgba(0,0,0,0.56), rgba(0,0,0,0.64));
		z-index: -1;
	}
	
	.home-page .hero-section {
		background: none;
		position: relative;
		z-index: 1;
	}
	
	/* Event card images - component-specific */
	:global(.event-card img) {
		object-fit: contain;
		width: auto;
		max-width: 100%;
	}
	
	/* Scroll indicator animation */
	.scroll-indicator {
		animation: bounce 2s infinite;
		filter: brightness(0) invert(1);
	}
	
	@keyframes bounce {
		0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
		40% { transform: translateY(-10px); }
		60% { transform: translateY(-5px); }
	}
	
	/* Responsive design */
	@media (min-width: 992px) {
		:global(.hero-section .display-3) { font-size: 5.4rem; }
		:global(.hero-section .lead) { font-size: 1.5rem; }
		:global(.hero-section .btn-lg) {
			font-size: 1.5rem;
			padding: 0.6rem 1.2rem;
		}
		:global(.hero-section p) { font-size: 1.2rem; }
		.scroll-indicator {
			width: 36px;
			height: 36px;
		}
	}
</style>