<script>
	import EventPage from '$lib/components/EventPage.svelte';
	import { getEventProps } from '$lib/data/events.js';

	let { data } = $props();

	const event = getEventProps('southbend');
</script>

<EventPage {...event} galleryImages={data.galleryImages}>
	<p>
		BurbSec South Bend brings the fun and networking of our signature meetup format to Michiana.
		Join fellow information security professionals for an evening of great conversation, networking,
		and community building in a relaxed atmosphere.
	</p>

	<p>
		Our Mishawaka location at Hop Station offers easy access for professionals throughout Northern Indiana
		and the surrounding area. Whether you're a seasoned CISO or just starting your career in cybersecurity,
		you'll find a welcoming community ready to share knowledge and experiences.
	</p>
</EventPage>
