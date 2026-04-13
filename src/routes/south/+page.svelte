<script>
	import EventPage from '$lib/components/EventPage.svelte';
	import { getEventProps } from '$lib/data/events.js';

	let { data } = $props();

	const event = getEventProps('south');
</script>

<EventPage {...event} galleryImages={data.galleryImages}>
	<p>
		BurbSec South brings the fun and networking of our signature meetup format to the southern suburbs.
		Join fellow information security professionals for an evening of great conversation, networking,
		and community building in a relaxed atmosphere.
	</p>

	<p>
		Our Mishawaka location at Hop Station offers a welcoming spot for professionals throughout the
		northern Indiana and surrounding area. Whether you're a seasoned CISO or just starting your
		career in cybersecurity, you'll find a community ready to share knowledge and experiences.
	</p>
</EventPage>
