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

<div class="container-lg pb-3 flex-fill">
	<div class="row pt-2">
		<article id="maincontent" class="col-lg-8 mt-3 mx-auto">
			<div class="text-center mb-5">
				<h1>Sponsor BurbSec</h1>
				<p class="lead">Support the World's Most Fun InfoSec Meetup Network</p>
			</div>

			<div class="mb-5">
				<h2 class="text-center">Why Sponsor BurbSec?</h2>
				<p>
					BurbSec is a unique network of information security meetups that brings together professionals,
					enthusiasts, and students from across the Chicagoland area and beyond. Our events are known for
					their relaxed atmosphere, great networking opportunities, and diverse community!
				</p>

				<h3 class="text-center">What We Offer</h3>
				<ul>
					<li>Access to a diverse community of InfoSec professionals</li>
					<li>Brand visibility at multiple locations</li>
					<li>Networking opportunities with industry leaders</li>
					<li>Support for the next generation of security professionals</li>
				</ul>

				<h3 class="text-center">Sponsorship Flexibility</h3>
				<p>
					What exactly is being sponsored is completely up to you. Most choose to just set a tab limit with the wait staff, sometimes only covering drinks. Some sponsors also choose to pick up a few orders of finger foods, whereas others simply pick up the full tabs of whomever was in attendance until a set time. Completely up to you and what your sponsorship budget looks like. Be sure to take into consideration the location of the event you wish to sponsor as the costs can vary greatly.
				</p>
				<p>
					Be sure to bring something to make your team memorable! Here are some ideas that have gone over well in the past:
				</p>
				<ul>
					<li>Cool stickers (not just boring vendor logo ones)</li>
					<li>An awesome item to raffle (big Lego sets or other tactile hobby items go over well)</li>
					<li><em>Useful</em> swag such as nice USB chargers, socks, or coffee mugs</li>
				</ul>

				<div class="text-center mt-5">
					<h3 class="text-center">Interested in Sponsoring?</h3>
					<p>Contact us to learn more about sponsorship opportunities.</p>
					<div>
						<a href="https://www.meetup.com/burbsec/events/" class="btn btn-primary btn-lg me-2" target="_blank" rel="noopener noreferrer">
							<i class="fa fa-calendar"></i> Find an Event to Sponsor
						</a>  and then &nbsp;
						<a href="mailto:sponsors@burbsec.com" class="btn btn-primary btn-lg">
							<i class="fa fa-envelope"></i> Contact Us
						</a>
					</div>
				</div>

				<div class="mt-5">
					<h3 class="text-center">Meetup Details & Sponsorship Information</h3>
					<p>
						Join us in fostering innovation and collaboration at our dynamic meetups, where your brand can connect with a vibrant community of information security professionals and enthusiasts! As a sponsor, you'll gain unparalleled exposure to a diverse audience, showcasing your commitment to industry growth and thought leadership in an environment brimming with potential. Here's a brief rundown of all our gatherings and their stats so you can easily choose who you'd like to help:
					</p>

					<!-- Sponsor cards (auto-generated from events data) -->
					<div class="row g-4 mt-4">
						{#each sponsorEvents as event (event.slug)}
							<div class="col-lg-6">
								<a href="/{event.slug}" class="text-decoration-none">
									<div class="card h-100 card-hover">
										<div class="card-body">
											<h5 class="card-title">{event.title}</h5>
											<p class="card-text">
												{#if event.sponsor.when}
													<strong>When:</strong> {event.sponsor.when}<br>
												{/if}
												<strong>Attendance:</strong> {event.sponsor.attendance}<br>
												{#if event.sponsor.crowd}
													<strong>Crowd:</strong> {event.sponsor.crowd}<br>
												{/if}
												<strong>Location:</strong> {event.sponsor.venueName}<br>
												<strong>Average Sponsorship:</strong> {event.sponsor.avgSponsorship}
											</p>
										</div>
									</div>
								</a>
							</div>
						{/each}
					</div>

					</div>
			</div>
		</article>
	</div>
</div>
