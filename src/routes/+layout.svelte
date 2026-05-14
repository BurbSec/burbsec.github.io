<script>
	import '../app.css';
	import { page } from '$app/state';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import LaserLinesBackground from '$lib/components/LaserLinesBackground.svelte';
	import { SITE_URL } from '$lib/data/events.js';

	let { children } = $props();

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
			'https://www.meetup.com/burbsec/events/',
			'https://tinyurl.com/burbchat',
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

<!-- Laser-lines background on every page EXCEPT the home page, which has
     its own background video. -->
{#if page.url.pathname !== '/'}
	<LaserLinesBackground />
{/if}

<Navbar />
<main id="maincontent" tabindex="-1">
	{@render children()}
</main>
<Footer />
