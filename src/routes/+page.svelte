<script>
	// Trigger rebuild to fix production deployment
</script>

<svelte:head>
	<title>Burbsec | The World's Most Fun InfoSec Meetup Events!</title>
	<meta name="description" content="Join Burbsec, the premier information security meetup network! Weekly cybersecurity events in Chicago, Las Vegas, Galway & more. Connect with ethical hackers, security professionals, and infosec enthusiasts. Free networking events with hands-on training, CTFs, and industry talks." />
	
	<!-- Page-specific Open Graph Tags -->
	<meta property="og:title" content="Burbsec | The World's Most Fun InfoSec Meetup Events!" />
	<meta property="og:description" content="Join Burbsec, the premier information security meetup network! Weekly cybersecurity events in Chicago, Las Vegas, Galway & more. Connect with ethical hackers, security professionals, and infosec enthusiasts." />
	<meta property="og:url" content="https://burbsec.github.io/" />
	
	<!-- Page-specific Twitter Card Tags -->
	<meta name="twitter:title" content="Burbsec | The World's Most Fun InfoSec Meetup Events!" />
	<meta name="twitter:description" content="Join Burbsec, the premier information security meetup network! Weekly cybersecurity events in Chicago, Las Vegas, Galway & more." />
	
	<!-- Additional page-specific structured data -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "WebPage",
		"name": "Burbsec - Information Security Meetup Network",
		"description": "The world's most fun information security meetup network with events across Chicago, Las Vegas, Galway and more locations.",
		"url": "https://burbsec.github.io/",
		"mainEntity": {
			"@type": "Organization",
			"name": "Burbsec Network",
			"description": "Information security meetup network connecting cybersecurity professionals worldwide",
			"hasOfferCatalog": {
				"@type": "OfferCatalog",
				"name": "Cybersecurity Events",
				"itemListElement": [
					{
						"@type": "Offer",
						"itemOffered": {
							"@type": "Event",
							"name": "BurbSec East",
							"description": "Monthly information security meetup in Chicago",
							"category": "Technology"
						}
					},
					{
						"@type": "Offer",
						"itemOffered": {
							"@type": "Event",
							"name": "BurbSec Southeast",
							"description": "Monthly information security meetup in Southeast Chicagoland",
							"category": "Technology"
						}
					},
					{
						"@type": "Offer",
						"itemOffered": {
							"@type": "Event",
							"name": "BurbSec Las Vegas",
							"description": "Monthly information security meetup in Las Vegas",
							"category": "Technology"
						}
					},
					{
						"@type": "Offer",
						"itemOffered": {
							"@type": "Event",
							"name": "BurbSec Galway",
							"description": "Monthly information security meetup in Galway, Ireland",
							"category": "Technology"
						}
					}
				]
			}
		},
		"breadcrumb": {
			"@type": "BreadcrumbList",
			"itemListElement": [
				{
					"@type": "ListItem",
					"position": 1,
					"name": "Home",
					"item": "https://burbsec.github.io/"
				}
			]
		}
	}
	</script>`}
</svelte:head>

<div class="home-page">
	<video autoplay muted loop playsinline class="background-video">
		<source src="/videos/logo_bg.mp4" type="video/mp4">
		<!-- Fallback for browsers that don't support video -->
		<div class="video-fallback"></div>
	</video>
	<div class="hero-section">
		<div class="container">
			<div class="row justify-content-center text-center">
				<div class="col-lg-8">
					<h1 class="display-3 fw-bold mb-4 landingpage-title text-white">Burbsec|Network</h1>
					<p class="lead mb-5 landingpage-subtitle text-white">The World's Most Fun InfoSec Meetup Events!</p>
					<div class="d-flex flex-column flex-md-row gap-3 justify-content-center">
						<a href="https://tinyurl.com/burbchat" class="btn btn-primary btn-lg" target="_blank" rel="noopener">
							<i class="fa-brands fa-discord"></i> Join the discussion on Discord!
						</a>
						<a href="https://www.meetup.com/burbsec/" class="btn btn-warning btn-lg" target="_blank" rel="noopener">
							<i class="fa-brands fa-meetup"></i> Find your weekly local event!
						</a>
					</div>
					<div class="d-flex justify-content-center mt-3">
						<a href="/sponsors" class="btn btn-success btn-lg">
							<i class="fa-solid fa-hand-holding-medical"></i> Sponsor a night of fun!
						</a>
					</div>
					<div class="text-center mt-5">
						<p class="text-white mb-2">Scroll for more!</p>
						<img src="/images/scroll_down.png" alt="Scroll down" width="30" height="30" class="scroll-indicator">
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
		
		<div class="row g-4">
			<!-- Chicagoland Events -->
			<div class="col-md-6 col-lg-4">
				<div class="card event-card h-100">
					<div class="card-body text-center">
						<img src="/images/east_shield.png"
							 srcset="/images/east_shield.png 1x"
							 alt="Chicago" class="mb-3" width="80" height="80" loading="lazy">
						<h5 class="card-title">Chicago</h5>
						<p class="card-text">Every Last Thursday</p>
						<a href="/east" class="btn btn-outline-primary">Learn More</a>
					</div>
				</div>
			</div>
			
			<div class="col-md-6 col-lg-4">
				<div class="card event-card h-100">
					<div class="card-body text-center">
						<img src="/images/north_shield.png"
							 srcset="/images/north_shield.png 1x"
							 alt="Wheeling" class="mb-3" width="80" height="80" loading="lazy">
						<h5 class="card-title">Wheeling</h5>
						<p class="card-text">Every Second Thursday</p>
						<a href="/north" class="btn btn-outline-primary">Learn More</a>
					</div>
				</div>
			</div>
			
			<div class="col-md-6 col-lg-4">
				<div class="card event-card h-100">
					<div class="card-body text-center">
						<img src="/images/west_shield.png"
							 srcset="/images/west_shield.png 1x"
							 alt="Naperville" class="mb-3" width="80" height="80" loading="lazy">
						<h5 class="card-title">Naperville</h5>
						<p class="card-text">Every Third Thursday</p>
						<a href="/west" class="btn btn-outline-primary">Learn More</a>
					</div>
				</div>
			</div>
			
			<div class="col-md-6 col-lg-4">
				<div class="card event-card h-100">
					<div class="card-body text-center">
						<img src="/images/prime_shield.png"
							 srcset="/images/prime_shield.png 1x"
							 alt="Schaumburg" class="mb-3" width="80" height="80" loading="lazy">
						<h5 class="card-title">Schaumburg</h5>
						<p class="card-text">Every First Thursday</p>
						<a href="/prime" class="btn btn-outline-primary">Learn More</a>
					</div>
				</div>
			</div>
			
			<div class="col-md-6 col-lg-4">
				<div class="card event-card h-100">
					<div class="card-body text-center">
						<img src="/images/northwest_shield.jpg"
							 srcset="/images/northwest_shield.jpg 1x"
							 alt="Crystal Lake" class="mb-3" width="80" height="80" loading="lazy">
						<h5 class="card-title">Crystal Lake</h5>
						<p class="card-text">Every Fourth Thursday</p>
						<a href="/northwest" class="btn btn-outline-primary">Learn More</a>
					</div>
				</div>
			</div>
			
			<div class="col-md-6 col-lg-4">
				<div class="card event-card h-100">
					<div class="card-body text-center">
						<img src="/images/south_shield.png"
							 srcset="/images/south_shield.png 1x"
							 alt="Hickory Hills" class="mb-3" width="80" height="80" loading="lazy">
						<h5 class="card-title">Hickory Hills</h5>
						<p class="card-text">Every Second Thursday</p>
						<a href="/south" class="btn btn-outline-primary">Learn More</a>
					</div>
				</div>
			</div>
			
			<div class="col-md-6 col-lg-4">
				<div class="card event-card h-100">
					<div class="card-body text-center">
						<img src="/images/southeast_shield.jpg"
							 srcset="/images/southeast_shield.jpg 1x"
							 alt="Southeast" class="mb-3" width="80" height="80" loading="lazy">
						<h5 class="card-title">South bend, IN</h5>
						<p class="card-text">Every First Monday</p>
						<a href="/southeast" class="btn btn-outline-primary">Learn More</a>
					</div>
				</div>
			</div>
			
			<!-- Elsewhere Events -->
			<div class="col-md-6 col-lg-4">
				<div class="card event-card h-100">
					<div class="card-body text-center">
						<img src="/images/hacker_shield.png"
							 srcset="/images/hacker_shield.png 1x"
							 alt="Minneapolis" class="mb-3" width="80" height="80" loading="lazy">
						<h5 class="card-title">Minneapolis, MN</h5>
						<p class="card-text">Monthly Meetup</p>
						<a href="/minneapolis" class="btn btn-outline-primary">Learn More</a>
					</div>
				</div>
			</div>
			
			<div class="col-md-6 col-lg-4">
				<div class="card event-card h-100">
					<div class="card-body text-center">
						<img src="/images/vegas_shield.png"
							 srcset="/images/vegas_shield.png 1x"
							 alt="Las Vegas" class="mb-3" width="80" height="80" loading="lazy">
						<h5 class="card-title">Las Vegas</h5>
						<p class="card-text">Monthly Meetup</p>
						<a href="/lasvegas" class="btn btn-outline-primary">Learn More</a>
					</div>
				</div>
			</div>
			
			<div class="col-md-6 col-lg-4">
				<div class="card event-card h-100">
					<div class="card-body text-center">
						<img src="/images/galway_road_sign.jpg"
							 srcset="/images/galway_road_sign.jpg 1x"
							 alt="Galway" class="mb-3" width="80" height="80" loading="lazy">
						<h5 class="card-title">Galway, Ireland</h5>
						<p class="card-text">Monthly Meetup</p>
						<a href="/galway" class="btn btn-outline-primary">Learn More</a>
					</div>
				</div>
			</div>
			
			<!-- Special Interest -->
			<div class="col-md-6 col-lg-4">
				<div class="card event-card h-100">
					<div class="card-body text-center">
						<img src="/images/cigar_shield.png"
							 srcset="/images/cigar_shield.png 1x"
							 alt="CigarSec" class="mb-3" width="80" height="80" loading="lazy">
						<h5 class="card-title">CigarSec</h5>
						<p class="card-text">Special Interest Group</p>
						<a href="/cigarsec" class="btn btn-outline-primary">Learn More</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	/* Component-specific styles using CSS-in-JS approach */
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
	
	.video-fallback {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(rgba(0,0,0,0.56), rgba(0,0,0,0.64)), url('/images/network.gif');
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
		background-repeat: no-repeat;
		z-index: -2;
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