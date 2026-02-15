<script>
	import EventPage from '$lib/components/EventPage.svelte';
	import { getEventProps } from '$lib/data/events.js';

	let { data } = $props();

	const event = getEventProps('minneapolis');
</script>

<EventPage {...event} galleryImages={data.galleryImages}>
	<p>
		BurbSec Minneapolis brings the fun and networking of our signature meetup format to the Twin Cities.
		Join fellow information security professionals for an evening of great conversation, networking,
		and community building in a relaxed atmosphere at Forgotten Star Brewing Co.
	</p>

	<p>
		Our MPLS location offers a unique venue in the heart of Minnesota's
		vibrant tech scene. Whether you're a seasoned CISO or just starting your career in cybersecurity, you'll
		find a welcoming community ready to share knowledge and experiences!
	</p>

	<p>
		Join our Discord community and check out upcoming events on our
		<a href="https://www.eventbrite.com/e/burbsec-mpls-networking-meetup-tickets-1749486103029?aff=oddtdtcreator" target="_blank" rel="noopener noreferrer">Eventbrite page</a>
		to connect with the Minneapolis cybersecurity community!
	</p>
</EventPage>
