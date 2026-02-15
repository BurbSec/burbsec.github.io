<script>
	import EventPage from '$lib/components/EventPage.svelte';
	import { getEventProps } from '$lib/data/events.js';

	let { data } = $props();

	const event = getEventProps('galway');
</script>

<EventPage {...event} galleryImages={data.galleryImages}>
	<p>
		BurbSec Galway brings the fun and networking of our signature meetup format to Ireland.
		Join fellow information security professionals for an evening of great conversation, networking,
		and community building in a relaxed atmosphere.
	</p>

	<p>
		Our Galway location meets at Murty Rabbit's, and offers a unique international perspective on cybersecurity.
		Whether you're a seasoned CISO or just starting your career in cybersecurity, you'll find a
		welcoming community ready to share knowledge and experiences from across the pond.
	</p>
</EventPage>
