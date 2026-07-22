<script>
	import EventPage from '$lib/components/EventPage.svelte';
	import { getEventProps } from '$lib/data/events.js';

	let { data } = $props();

	const event = getEventProps('east');
</script>

<EventPage {...event} galleryImages={data.galleryImages}>
	<p>
		Burbsec East is an informal meetup of Information Security enthusiasts,
		engineers, hackers, and general geeks! Expect a night of great networking and
		lubricated conversations! The crowd is very chill, about 30-70 strong, with
		experience levels ranging from college students through CISOs! We have NO
		DUES, NO PRESENTATIONS, and NO PUSHY SALESPEOPLE!
	</p>

	<p>
		Meeting at Gracie O'Malley's in Wicker Park, it's a neighborhood Irish sports bar with a
		solid local beer selection, pub fare, and shareable appetizers. Plenty of room to grab a
		table, and several other food options exist within walking distance as well!
	</p>
</EventPage>
