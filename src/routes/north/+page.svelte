<script>
	import EventPage from '$lib/components/EventPage.svelte';
	import { getEventProps } from '$lib/data/events.js';

	let { data } = $props();

	const event = getEventProps('north');
</script>

<EventPage {...event} galleryImages={data.galleryImages}>
	<p>
		BurbSec North brings the fun and networking of our signature meetup format to the northern suburbs.
		Join fellow information security professionals for an evening of great conversation, networking,
		and community building in a relaxed atmosphere.
	</p>

	<p>
		Our Wheeling location offers easy access for professionals throughout the northern Chicagoland area.
		Whether you're a seasoned CISO or just starting your career in cybersecurity, you'll find a
		welcoming community ready to share knowledge and experiences.
	</p>
</EventPage>
