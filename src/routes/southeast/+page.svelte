<script>
	import EventPage from '$lib/components/EventPage.svelte';
	import { getEventProps } from '$lib/data/events.js';

	let { data } = $props();

	const event = getEventProps('southeast');
</script>

<EventPage {...event} galleryImages={data.galleryImages}>
	<p>
		BurbSec Southeast brings the fun and networking of our signature meetup format to the southeast suburbs.
		Join fellow information security professionals for an evening of great conversation, networking,
		and community building in a relaxed atmosphere.
	</p>

	<p>
		Our South Bend location offers easy access for professionals throughout the southeast Chicagoland area,
		as well as Northeast Indiana! Whether you're a seasoned CISO or just starting your career in cybersecurity,
		you'll find a welcoming community ready to share knowledge and experiences.
	</p>
</EventPage>
