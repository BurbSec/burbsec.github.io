<script>
	import EventPage from '$lib/components/EventPage.svelte';
</script>

<svelte:head>
	<title>BurbSec Las Vegas | Information Security Meetup in Sin City</title>
	<meta name="description" content="Join BurbSec Las Vegas - information security meetup in Sin City! Connect with cybersecurity professionals, ethical hackers, and infosec enthusiasts in the entertainment capital. Monthly networking events." />
	
	<!-- Location-specific keywords -->
	<meta name="keywords" content="las vegas information security, las vegas cybersecurity meetup, las vegas infosec, las vegas hacking meetup, las vegas security professionals, sin city cybersecurity, nevada infosec, vegas tech meetup, cybersecurity networking las vegas, ethical hacking las vegas, IT security las vegas, nevada security meetup" />
	
	<!-- Open Graph Tags -->
	<meta property="og:title" content="BurbSec Las Vegas | Information Security Meetup in Sin City" />
	<meta property="og:description" content="Join BurbSec Las Vegas - information security meetup in Sin City! Connect with cybersecurity professionals, ethical hackers, and infosec enthusiasts in the entertainment capital." />
	<meta property="og:url" content="https://burbsec.github.io/lasvegas" />
	<meta property="og:image" content="https://burbsec.github.io/images/vegas_shield.png" />
	
	<!-- Twitter Card Tags -->
	<meta name="twitter:title" content="BurbSec Las Vegas | Information Security Meetup in Sin City" />
	<meta name="twitter:description" content="Join BurbSec Las Vegas - information security meetup in Sin City! Connect with cybersecurity professionals and infosec enthusiasts." />
	<meta name="twitter:image" content="https://burbsec.github.io/images/vegas_shield.png" />
	
	<!-- Location-specific structured data -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "Event",
		"name": "BurbSec Las Vegas Information Security Meetup",
		"description": "BurbSec Las Vegas brings the fun and networking of our signature meetup format to Sin City. Join fellow information security professionals for an evening of great conversation, networking, and community building.",
		"startDate": "2025-01-30T18:00:00-08:00",
		"endDate": "2025-01-30T22:00:00-08:00",
		"eventSchedule": {
			"@type": "Schedule",
			"repeatFrequency": "P1M"
		},
		"eventStatus": "https://schema.org/EventScheduled",
		"eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
		"location": {
			"@type": "Place",
			"name": "Las Vegas",
			"address": {
				"@type": "PostalAddress",
				"addressLocality": "Las Vegas",
				"addressRegion": "NV",
				"addressCountry": "US"
			},
			"geo": {
				"@type": "GeoCoordinates",
				"latitude": "36.1699",
				"longitude": "-115.1398"
			}
		},
		"organizer": {
			"@type": "Organization",
			"name": "BurbSec Network",
			"url": "https://burbsec.github.io/"
		},
		"performer": {
			"@type": "Organization",
			"name": "BurbSec Network"
		},
		"offers": {
			"@type": "Offer",
			"price": "0",
			"priceCurrency": "USD",
			"availability": "https://schema.org/InStock",
			"validFrom": "2024-01-01T00:00:00-08:00",
			"url": "https://www.meetup.com/burbsecvegas/"
		},
		"audience": {
			"@type": "Audience",
			"audienceType": "Information Security Professionals, Cybersecurity Enthusiasts, Ethical Hackers, IT Professionals"
		},
		"keywords": "information security, cybersecurity, hacking, infosec, meetup, las vegas, sin city, networking, security professionals, ethical hacking, IT security, nevada",
		"image": "https://burbsec.github.io/images/vegas_shield.png",
		"url": "https://www.meetup.com/burbsecvegas/"
	}
	</script>`}
	
</svelte:head>

<EventPage
	title="BurbSec|Las Vegas"
	subtitle="Monthly Meetup"
	location="Las Vegas, NV"
	eventImage="/images/vegas_shield.png"
	blueskyHandle="lasvegas.burbsec.com"
	gmapsLink="https://maps.app.goo.gl/FiRoGYPdMi1nB5SeA"
	meetupPage="https://www.meetup.com/burbsecvegas/"
	irlImage="/images/irl/vegas.jpg"
>
	<p>
		BurbSec Las Vegas brings the fun and networking of our signature meetup format to Sin City. 
		Join fellow information security professionals for an evening of great conversation, networking, 
		and community building in a relaxed atmosphere.
	</p>
	
	<p>
		We're still working on finding the perfect consistent venue, but overall uur Las Vegas location 
		offers a unique desert perspective on cybersecurity in the entertainment capital. 
		Whether you're a seasoned CISO or just starting your career in cybersecurity, you'll find a 
		welcoming community ready to share knowledge and experiences.
	</p>
	
	<p>
		Keep an eye on this specific recurring event on our <a href="https://www.meetup.com/burbsecvegas/">Meetup Page</a>
	</p>
</EventPage>