<script>
	import EventPage from '$lib/components/EventPage.svelte';
	import { getEventProps } from '$lib/data/events.js';

	export let data;

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
		Meeting at Navigator Taproom, it has over 40 beers on tap, along
		with many great ciders, wines, and cocktails, all using a self-serve RFID
		system! Aside from that, they also have a small you-call-it bar, and you can even
		have food delivered. Several food options exist within walking distance as well!
	</p>
</EventPage>
