<script>
	import EventPage from '$lib/components/EventPage.svelte';
	import { getEventProps } from '$lib/data/events.js';

	let { data } = $props();

	const event = getEventProps('pilsen');
</script>

<EventPage {...event} galleryImages={data.galleryImages}>
	<p>
		BurbSec Pilsen is an informal meetup of Information Security enthusiasts, engineers,
		hackers, and general geeks! Expect a night of great networking and lubricated
		conversations, with experience levels ranging from college students through CISOs.
		We have NO DUES, NO PRESENTATIONS, and NO PUSHY SALESPEOPLE OR RECRUITERS!
	</p>

	<p>
		We meet at Monochrome Brewing on South Carpenter Street, a neighborhood taproom in the
		heart of Pilsen with plenty of room to spread out. Folks start rolling in around 6pm
		after work and the night usually runs four to six hours — come when you can, stay as
		long as you like.
	</p>
</EventPage>
