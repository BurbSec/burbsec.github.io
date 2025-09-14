<script>
	import EventPage from '$lib/components/EventPage.svelte';
</script>

<svelte:head>
	<title>BurbSec East Chicago | Information Security Meetup Every Last Thursday</title>
	<meta name="description" content="Join BurbSec East Chicago - an informal information security meetup for cybersecurity enthusiasts, ethical hackers, and IT professionals. Every last Thursday at Navigator Taproom. A welcoming community for Chicago's infosec professionals seeking networking opportunities. No dues, no presentations, just networking!" />
	
	<!-- Location-specific keywords -->
	<meta name="keywords" content="chicago information security, chicago cybersecurity meetup, chicago infosec, chicago hacking meetup, chicago security professionals, navigator taproom, chicago tech meetup, cybersecurity networking chicago, ethical hacking chicago, IT security chicago, dc312 chicago, dcg312 chicago, chicago 2600, defcon chicago, chicago hacker community, chicago security community, chicago infosec networking" />
	
	<!-- Open Graph Tags -->
	<meta property="og:title" content="BurbSec East Chicago | Information Security Meetup Every Last Thursday" />
	<meta property="og:description" content="Join BurbSec East Chicago - an informal information security meetup for cybersecurity enthusiasts, ethical hackers, and IT professionals. Every last Thursday at Navigator Taproom." />
	<meta property="og:url" content="https://burbsec.github.io/east" />
	<meta property="og:image" content="https://burbsec.github.io/images/east_shield.png" />
	
	<!-- Twitter Card Tags -->
	<meta name="twitter:title" content="BurbSec East Chicago | Information Security Meetup Every Last Thursday" />
	<meta name="twitter:description" content="Join BurbSec East Chicago - an informal information security meetup for cybersecurity enthusiasts, ethical hackers, and IT professionals." />
	<meta name="twitter:image" content="https://burbsec.github.io/images/east_shield.png" />
	
	<!-- Location-specific structured data -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "Event",
		"name": "BurbSec East Chicago Information Security Meetup",
		"description": "Informal meetup of Information Security enthusiasts, engineers, hackers, and general geeks in Chicago. A welcoming community for Chicago's cybersecurity professionals. Great networking with no dues, no presentations, and no pushy salespeople.",
		"startDate": "2025-01-30T18:00:00-06:00",
		"endDate": "2025-01-30T22:00:00-06:00",
		"eventSchedule": {
			"@type": "Schedule",
			"repeatFrequency": "P1M",
			"byDay": "Thursday",
			"byMonthWeek": -1
		},
		"eventStatus": "https://schema.org/EventScheduled",
		"eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
		"location": {
			"@type": "Place",
			"name": "Navigator Taproom",
			"address": {
				"@type": "PostalAddress",
				"streetAddress": "5062 N Lincoln Ave",
				"addressLocality": "Chicago",
				"addressRegion": "IL",
				"postalCode": "60625",
				"addressCountry": "US"
			},
			"geo": {
				"@type": "GeoCoordinates",
				"latitude": "41.9742",
				"longitude": "-87.6892"
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
			"url": "https://www.meetup.com/burbsec/"
		},
		"audience": {
			"@type": "Audience",
			"audienceType": "Information Security Professionals, Cybersecurity Enthusiasts, Ethical Hackers, IT Professionals"
		},
		"keywords": "information security, cybersecurity, hacking, infosec, meetup, chicago, networking, security professionals, ethical hacking, IT security, chicago hacker meetup, chicago security community, defcon chicago, chicago infosec community",
		"image": "https://burbsec.github.io/images/east_shield.png"
	}
	</script>`}
	
</svelte:head>

<EventPage
	title="BurbSec|East"
	subtitle="Meets Every Last Thursday of the Month"
	location="Chicago, IL"
	eventImage="/images/east_shield.png"
	blueskyHandle="east.burbsec.com"
	gmapsLink="https://maps.app.goo.gl/r8nxdKddizJqfU4u9"
	irlImage="/images/irl/east.jpg"
>
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