<script>
	import EventPage from '$lib/components/EventPage.svelte';
	import { getEventProps } from '$lib/data/events.js';

	const event = getEventProps('lasvegas');
</script>

<EventPage {...event}>
	<p>
		BurbSec Las Vegas brings the fun and networking of our signature meetup format to Sin City.
		Join fellow information security professionals for an evening of great conversation, networking,
		and community building in a relaxed atmosphere.
	</p>

	<p>
		We're still working on finding the perfect consistent venue, but overall our Las Vegas location
		offers a unique desert perspective on cybersecurity in the entertainment capital.
		Whether you're a seasoned CISO or just starting your career in cybersecurity, you'll find a
		welcoming community ready to share knowledge and experiences.
	</p>

	<p>
		Keep an eye on this specific recurring event on our <a href="https://www.meetup.com/burbsecvegas/" target="_blank" rel="noopener noreferrer">Meetup Page</a>
	</p>
</EventPage>