<script>
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { SITE_URL } from '$lib/data/events.js';

	const orgJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Burbsec Network',
		alternateName: 'Burbsec',
		description: 'The world\'s most fun information security meetup network connecting cybersecurity professionals, ethical hackers, and infosec enthusiasts.',
		url: SITE_URL,
		logo: `${SITE_URL}/images/hacker_shield.png`,
		image: `${SITE_URL}/images/hacker_shield.png`,
		foundingDate: '2020',
		sameAs: [
			'https://www.meetup.com/burbsec/',
			'https://discord.gg/burbsec',
			'https://www.linkedin.com/groups/4081253/',
			'https://github.com/BurbSec/burbsec.github.io'
		],
		contactPoint: {
			'@type': 'ContactPoint',
			contactType: 'Community Support',
			url: 'https://tinyurl.com/burbchat'
		},
		areaServed: [
			{ '@type': 'City', name: 'Chicago', addressRegion: 'IL', addressCountry: 'US' },
			{ '@type': 'City', name: 'Las Vegas', addressRegion: 'NV', addressCountry: 'US' },
			{ '@type': 'City', name: 'Galway', addressCountry: 'IE' },
			{ '@type': 'City', name: 'Minneapolis', addressRegion: 'MN', addressCountry: 'US' }
		],
		keywords: 'information security, cybersecurity, hacking, infosec, meetup, chicago, security professionals, ethical hacking, penetration testing, cybersecurity community, security events, networking, CISSP, CEH, security training, vulnerability assessment, incident response, malware analysis, digital forensics, security awareness, chicago hacker meetup, chicago security community, defcon chicago, chicago infosec community'
	});
</script>

<svelte:head>
	<!-- Organization Structured Data (global — page-level SEO is set per-route) -->
	{@html `<script type="application/ld+json">${orgJsonLd}</script>`}
</svelte:head>

<!-- Skip to content link for keyboard / screen-reader users -->
<a href="#maincontent" class="skip-link">Skip to main content</a>

<Navbar />
<main id="maincontent" tabindex="-1">
	<slot />
</main>
<Footer />

<style>
	:global(body) {
		background-color: #15202b;
		min-height: 100vh;
		color: white;
	}

	main {
		min-height: calc(100vh - 200px);
	}

	/* Accessible skip-to-content link — visible only on focus */
	.skip-link {
		position: absolute;
		top: -100%;
		left: 50%;
		transform: translateX(-50%);
		background: #ffc107;
		color: #000;
		padding: 0.5rem 1.5rem;
		border-radius: 0 0 0.375rem 0.375rem;
		z-index: 9999;
		font-weight: 600;
		text-decoration: none;
		transition: top 0.2s ease;
	}

	.skip-link:focus {
		top: 0;
	}
</style>