<script>
	import EventPage from '$lib/components/EventPage.svelte';
	import { getEventProps } from '$lib/data/events.js';

	let { data } = $props();

	const event = getEventProps('milwaukee');
</script>

<EventPage {...event} galleryImages={data.galleryImages}>
	<p>
		BurbSec Milwaukee brings the fun and networking of our signature meetup format to
		the Milwaukee area. Join fellow information security professionals for an evening
		of conversation, networking, and community building in a relaxed atmosphere.
	</p>

	<p>
		Our Milwaukee-area meetup takes place at The Explorium Brewpub in Greendale, WI.
		Whether you're a seasoned cybersecurity professional, student, or just getting
		started in the field, you'll find a welcoming community ready to share knowledge
		and experiences.
	</p>
</EventPage>
