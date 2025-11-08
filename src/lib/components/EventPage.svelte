<script>
	import { page } from '$app/stores';
	export let title;
	export let subtitle;
	export let location;
	export let eventImage;
	export let blueskyHandle = null;
	export let discordLink = null;
	export let gmapsLink;
	export let meetupPage = "https://www.meetup.com/burbsec/";
	export let eventbriteLink = null;
	export let irlImage = null;
</script>

<svelte:head>
	<title>{title} | Burbsec</title>
	<meta name="description" content="{title} - {subtitle}" />
	<!-- Canonical URL -->
	<link rel="canonical" href={`https://burbsec.github.io${$page.url.pathname}`} />
</svelte:head>

<div class="container-lg pb-3 flex-fill">
	<div class="row pt-2">
		<article id="maincontent" class="col-lg-8 mt-3 mx-auto">
			<div class="text-center mb-4">
				<h1>{title}</h1>
				<p class="lead">{subtitle}</p>
			</div>
			
			<div class="row justify-content-center align-items-center mb-4">
				{#if blueskyHandle}
					<div class="col-sm d-flex flex-column mb-2">
						<a href="https://bsky.app/profile/{blueskyHandle}" class="btn btn-primary" target="_blank" rel="noopener">
							<img src="/images/bluesky.svg" alt="Bluesky" width="24" height="24" class="me-2 bluesky-icon">
							Follow us on BlueSky!
						</a>
					</div>
				{/if}
				{#if discordLink}
					<div class="col-sm d-flex flex-column mb-2">
						<a href={discordLink} class="btn btn-primary" target="_blank" rel="noopener">
							<i class="fa-brands fa-discord fa-xl"></i>
							Join us on Discord!
						</a>
					</div>
				{/if}
				<div class="col-sm d-flex flex-column mb-2">
					<a href={gmapsLink} class="btn btn-success" target="_blank" rel="noopener">
						<i class="fa-solid fa-map-location-dot fa-xl"></i>
						{location}
					</a>
				</div>
				<div class="col-sm d-flex flex-column mb-2">
					{#if eventbriteLink}
						<a href={eventbriteLink} class="btn btn-warning" target="_blank" rel="noopener">
							<i class="fa-solid fa-calendar-days fa-xl"></i>
							Next Meetups
						</a>
					{:else}
						<a href={meetupPage} class="btn btn-warning" target="_blank" rel="noopener">
							<i class="fa-solid fa-calendar-days fa-xl"></i>
							Next Meetups
						</a>
					{/if}
				</div>
			</div>
			
			<div class="content mb-4">
				<slot />
			</div>
			
			<div class="text-center">
				<img src={eventImage} alt={title} width="100" height="100" loading="lazy" />
			</div>
			
			{#if irlImage}
				<div class="text-center mt-4">
					<img src={irlImage} alt="{title} IRL Photo" class="img-fluid rounded-3 irl-photo" loading="lazy" />
				</div>
			{/if}
		</article>
	</div>
</div>

<style>
	.btn {
		margin-bottom: 0.5rem;
	}
	
	.bluesky-icon {
		filter: brightness(0) invert(1);
	}
	
	.irl-photo {
		max-width: 600px;
	}
	
	@media (max-width: 576px) {
		.col-sm {
			margin-bottom: 1rem;
		}
	}
</style>