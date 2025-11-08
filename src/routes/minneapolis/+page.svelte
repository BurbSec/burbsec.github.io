<script>
	import EventPage from '$lib/components/EventPage.svelte';
</script>

<svelte:head>
	<title>BurbSec Minneapolis | Information Security Meetup in Minnesota</title>
	<meta name="description" content="Join BurbSec Minneapolis - information security meetup in Minnesota! Connect with cybersecurity professionals, ethical hackers, and infosec enthusiasts. Monthly networking events at Forgotten Star Brewing Co." />
	
	<!-- Location-specific keywords -->
	<meta name="keywords" content="minneapolis information security, minneapolis cybersecurity meetup, minneapolis infosec, minneapolis hacking meetup, minneapolis security professionals, minnesota cybersecurity, minnesota infosec, twin cities tech meetup, cybersecurity networking minneapolis, ethical hacking minneapolis, IT security minneapolis, minnesota security meetup" />
	
	<!-- Open Graph Tags -->
	<meta property="og:title" content="BurbSec Minneapolis | Information Security Meetup in Minnesota" />
	<meta property="og:description" content="Join BurbSec Minneapolis - information security meetup in Minnesota! Connect with cybersecurity professionals, ethical hackers, and infosec enthusiasts at Forgotten Star Brewing Co." />
	<meta property="og:url" content="https://burbsec.github.io/minneapolis" />
	
	<!-- Twitter Card Tags -->
	<meta name="twitter:title" content="BurbSec Minneapolis | Information Security Meetup in Minnesota" />
	<meta name="twitter:description" content="Join BurbSec Minneapolis - information security meetup in Minnesota! Connect with cybersecurity professionals and infosec enthusiasts." />
	
	<!-- Location-specific structured data -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "Event",
		"name": "BurbSec Minneapolis Information Security Meetup",
		"description": "BurbSec Minneapolis brings the fun and networking of our signature meetup format to the Twin Cities. Join fellow information security professionals for an evening of great conversation, networking, and community building at Forgotten Star Brewing Co.",
		"eventSchedule": {
			"@type": "Schedule",
			"repeatFrequency": "P1M"
		},
		"eventStatus": "https://schema.org/EventScheduled",
		"eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
		"location": {
			"@type": "Place",
			"name": "Forgotten Star Brewing Co.",
			"address": {
				"@type": "PostalAddress",
				"addressLocality": "Fridley",
				"addressRegion": "MN",
				"addressCountry": "US"
			},
			"geo": {
				"@type": "GeoCoordinates",
				"latitude": "44.9778",
				"longitude": "-93.2650"
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
			"validFrom": "2024-01-01T00:00:00-06:00",
			"url": "https://www.eventbrite.com/e/burbsec-mpls-networking-meetup-tickets-1749486103029?aff=oddtdtcreator"
		},
		"audience": {
			"@type": "Audience",
			"audienceType": "Information Security Professionals, Cybersecurity Enthusiasts, Ethical Hackers, IT Professionals"
		},
		"keywords": "information security, cybersecurity, hacking, infosec, meetup, minneapolis, twin cities, minnesota, networking, security professionals, ethical hacking, IT security",
		"url": "https://www.eventbrite.com/e/burbsec-mpls-networking-meetup-tickets-1749486103029?aff=oddtdtcreator"
	}
	</script>`}
	
</svelte:head>

<EventPage
	title="BurbSec|Minneapolis"
	subtitle="Monthly Meetup"
	location="Minneapolis, MN"
	eventImage="/images/hacker_shield.png"
	discordLink="https://discord.gg/hmf7xZkG"
	gmapsLink="https://maps.app.goo.gl/MqP9s8EGQvQefiMu9"
	eventbriteLink="https://www.eventbrite.com/e/burbsec-mpls-networking-meetup-tickets-1749486103029?aff=oddtdtcreator"
>
	<p>
		BurbSec Minneapolis brings the fun and networking of our signature meetup format to the Twin Cities. 
		Join fellow information security professionals for an evening of great conversation, networking, 
		and community building in a relaxed atmosphere at Forgotten Star Brewing Co.
	</p>
	
	<p>
		Our Minneapolis location at Forgotten Star Brewing Co. offers a unique venue in the heart of Minnesota's 
		vibrant tech scene. Whether you're a seasoned CISO or just starting your career in cybersecurity, you'll 
		find a welcoming community ready to share knowledge and experiences.
	</p>
	
	<p>
		Join our Discord community and check out upcoming events on our 
		<a href="https://www.eventbrite.com/e/burbsec-mpls-networking-meetup-tickets-1749486103029?aff=oddtdtcreator">Eventbrite page</a> 
		to connect with the Minneapolis cybersecurity community!
	</p>
</EventPage>