<script>
	import EventPage from '$lib/components/EventPage.svelte';
	import { getEventProps } from '$lib/data/events.js';

	let { data } = $props();

	const event = getEventProps('milwaukee');
</script>

<EventPage {...event} galleryImages={data.galleryImages}>
	<div class="alert alert-warning" role="alert">
		<strong>Heads up: we meet in Greendale, NOT Milwaukee!</strong> The Explorium Brewpub
		has more than one location. The one in Milwaukee is the <strong>WRONG</strong> venue.
		Make sure you're headed to <strong>The Explorium Brewpub Greendale, 5300 S 76th St,
		Greendale, WI 53129</strong>.
	</div>

	<p>
		BurbSec Milwaukee brings the fun and networking of our signature meetup format to
		the Milwaukee area. Join fellow information security professionals for an evening
		of conversation, networking, and community building in a relaxed atmosphere.
	</p>

	<p>
		Despite the name, our Milwaukee-area meetup takes place in Greendale, WI, at The
		Explorium Brewpub Greendale. Whether you're a seasoned cybersecurity professional,
		student, or just getting started in the field, you'll find a welcoming community
		ready to share knowledge and experiences.
	</p>
</EventPage>
