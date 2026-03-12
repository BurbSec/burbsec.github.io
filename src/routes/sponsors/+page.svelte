<script>
	import { getSponsorEvents, SITE_URL } from '$lib/data/events.js';

	const sponsorEvents = getSponsorEvents();
</script>

<svelte:head>
	<title>Sponsors | Burbsec</title>
	<meta name="description" content="Sponsor BurbSec - Support the world's most fun InfoSec meetup network!" />
	<link rel="canonical" href={`${SITE_URL}/sponsors/`} />
	<meta property="og:title" content="Sponsor BurbSec | Support the InfoSec Community" />
	<meta property="og:description" content="Sponsor BurbSec - Support the world's most fun InfoSec meetup network. Get brand visibility with cybersecurity professionals across multiple locations." />
	<meta property="og:url" content={`${SITE_URL}/sponsors/`} />

	<!-- Twitter Card Tags -->
	<meta name="twitter:title" content="Sponsor BurbSec | Support the InfoSec Community" />
	<meta name="twitter:description" content="Sponsor BurbSec - Support the world's most fun InfoSec meetup network. Get brand visibility with cybersecurity professionals across multiple locations." />
</svelte:head>

<div class="sponsor-page">
	<!-- Hero banner -->
	<div class="sponsor-hero text-center py-5">
		<div class="container-xl">
			<img src="/images/hacker_shield.png" alt="BurbSec shield" width="100" height="100" class="mb-3" />
			<h1 class="display-4 fw-bold">Sponsor BurbSec</h1>
			<p class="lead mb-4">Support the World's Most Fun InfoSec Meetup Network</p>
			<div class="d-flex flex-column flex-md-row gap-3 justify-content-center">
				<a href="https://www.meetup.com/burbsec/events/" class="btn btn-warning btn-lg" target="_blank" rel="noopener noreferrer">
					<i class="fa fa-calendar"></i> Find an Event to Sponsor
				</a>
				<a href="mailto:sponsors@burbsec.com" class="btn btn-outline-light btn-lg">
					<i class="fa fa-envelope"></i> Contact Us
				</a>
			</div>
		</div>
	</div>

	<div class="container-xl pb-5">
		<article id="maincontent">

			<!-- Why Sponsor — feature cards -->
			<section class="my-5">
				<h2 class="text-center mb-4">Why Sponsor BurbSec?</h2>
				<p class="text-center mb-4">
					BurbSec is a unique network of information security meetups that brings together professionals,
					enthusiasts, and students from across the Chicagoland area and beyond. Our events are known for
					their relaxed atmosphere, great networking opportunities, and diverse community!
				</p>
				<div class="row g-4">
					<div class="col-sm-6 col-lg-3">
						<div class="sponsor-feature text-center p-4 rounded-3 h-100">
							<i class="fa-solid fa-users fa-2x mb-3 text-primary"></i>
							<h5>Diverse Community</h5>
							<p class="mb-0 small">Access active and prospective InfoSec professionals across multiple locations</p>
						</div>
					</div>
					<div class="col-sm-6 col-lg-3">
						<div class="sponsor-feature text-center p-4 rounded-3 h-100">
							<i class="fa-solid fa-bullhorn fa-2x mb-3 text-warning"></i>
							<h5>Brand Visibility</h5>
							<p class="mb-0 small">Get your brand in front of security professionals at events across the network</p>
						</div>
					</div>
					<div class="col-sm-6 col-lg-3">
						<div class="sponsor-feature text-center p-4 rounded-3 h-100">
							<i class="fa-solid fa-handshake fa-2x mb-3 text-success"></i>
							<h5>Networking</h5>
							<p class="mb-0 small">Connect directly with industry leaders and rising talent in cybersecurity</p>
						</div>
					</div>
					<div class="col-sm-6 col-lg-3">
						<div class="sponsor-feature text-center p-4 rounded-3 h-100">
							<i class="fa-solid fa-graduation-cap fa-2x mb-3 text-info"></i>
							<h5>Next Generation</h5>
							<p class="mb-0 small">Support students and career-changers entering the security field</p>
						</div>
					</div>
				</div>
			</section>

			<!-- Sponsorship Flexibility -->
			<section class="my-5">
				<h2 class="text-center mb-4">Sponsorship Flexibility</h2>
				<div class="row g-4 align-items-center">
					<div class="col-lg-6">
						<p>
							What exactly is being sponsored is completely up to you. Most choose to just set a tab limit with the wait staff, sometimes only covering drinks. Some sponsors also choose to pick up a few orders of finger foods, whereas others simply pick up the full tabs of whomever was in attendance until a set time. Completely up to you and what your sponsorship budget looks like. Be sure to take into consideration the location of the event you wish to sponsor as the costs can vary greatly.
						</p>
					</div>
					<div class="col-lg-6">
						<div class="sponsor-feature p-4 rounded-3">
							<h5 class="mb-3"><i class="fa-solid fa-lightbulb text-warning me-2"></i>Make It Memorable</h5>
							<p>Bring something to make your team stand out! Ideas that have gone over well:</p>
							<ul class="sponsor-tips mb-0">
								<li><i class="fa-solid fa-note-sticky text-warning me-2"></i>Cool stickers (not just boring vendor logo ones)</li>
								<li><i class="fa-solid fa-gift text-danger me-2"></i>An awesome item to raffle (big Lego sets or other tactile hobby items go over well)</li>
								<li><i class="fa-solid fa-mug-hot text-info me-2"></i><em>Useful</em> swag such as nice USB chargers, socks, or coffee mugs</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			<!-- Meetup Details -->
			<section class="my-5">
				<h2 class="text-center mb-3">Meetup Details & Sponsorship Information</h2>
				<p class="text-center mb-4">
					Here's a brief rundown of all our gatherings and their stats so you can easily choose who you'd like to help:
				</p>

				<div class="row g-4">
					{#each sponsorEvents as event (event.slug)}
						<div class="col-md-6 col-xl-4">
							<a href="/{event.slug}" class="text-decoration-none">
								<div class="card sponsor-card h-100 card-hover">
									<div class="card-body d-flex">
										<img src={event.eventImage} alt="{event.title} shield" width="60" height="60" class="me-3 flex-shrink-0 align-self-start" loading="lazy" decoding="async" />
										<div>
											<h5 class="card-title mb-2">{event.title}</h5>
											<p class="card-text small mb-0">
												{#if event.sponsor.when}
													<i class="fa-regular fa-calendar me-1 text-primary"></i> {event.sponsor.when}<br>
												{/if}
												<i class="fa-solid fa-user-group me-1 text-success"></i> {event.sponsor.attendance}<br>
												{#if event.sponsor.crowd}
													<i class="fa-solid fa-people-group me-1 text-info"></i> {event.sponsor.crowd}<br>
												{/if}
												<i class="fa-solid fa-location-dot me-1 text-danger"></i> {event.sponsor.venueName}<br>
												<span class="sponsor-amount"><i class="fa-solid fa-hand-holding-dollar me-1"></i> {event.sponsor.avgSponsorship}</span>
											</p>
										</div>
									</div>
								</div>
							</a>
						</div>
					{/each}
				</div>
			</section>

			<!-- CTA -->
			<section class="text-center my-5 py-4">
				<h3 class="mb-3">Ready to Sponsor?</h3>
				<p class="mb-4">Pick an event that fits your goals and budget, then reach out!</p>
				<div class="d-flex flex-column flex-md-row gap-3 justify-content-center">
					<a href="https://www.meetup.com/burbsec/events/" class="btn btn-warning btn-lg" target="_blank" rel="noopener noreferrer">
						<i class="fa fa-calendar"></i> Find an Event
					</a>
					<a href="mailto:sponsors@burbsec.com" class="btn btn-primary btn-lg">
						<i class="fa fa-envelope"></i> Contact Us
					</a>
				</div>
			</section>

		</article>
	</div>
</div>
