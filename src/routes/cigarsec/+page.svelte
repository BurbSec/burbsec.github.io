<script>
	import EventPage from '$lib/components/EventPage.svelte';
	import { getEventProps } from '$lib/data/events.js';

	let { data } = $props();

	const event = getEventProps('cigarsec');
</script>

<EventPage {...event} galleryImages={data.galleryImages}>
	<p>
		CigarSec is our special interest group that combines the relaxed atmosphere of cigar smoking
		with information security discussions. Join fellow security professionals for an afternoon of
		premium cigars, co-working, and great conversation in a unique setting.
	</p>

	<p>
		Whether you're a cigar aficionado or just curious about the hobby, CigarSec provides a
		distinctive networking opportunity. Share knowledge, discuss the latest in cybersecurity,
		and enjoy quality tobacco in good company.
	</p>
</EventPage>
