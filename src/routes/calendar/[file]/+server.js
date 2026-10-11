import { error } from '@sveltejs/kit';
import { allEvents } from '$lib/data/events.js';
import { buildCalendar } from '$lib/server/ics.js';

/**
 * Prerendered .ics calendar files: /calendar/<slug>.ics per event with a
 * fixed schedule, plus /calendar/burbsec.ics combining all of them. Retired
 * slugs (`formerSlugs`) keep serving the renamed event's feed so existing
 * calendar subscriptions don't break — GitHub Pages can't redirect.
 */

export const prerender = true;

const scheduledEvents = allEvents.filter((e) => e.schedule);

const eventsByFile = new Map(
	scheduledEvents.flatMap((e) =>
		[e.slug, ...(e.formerSlugs ?? [])].map((slug) => [`${slug}.ics`, e])
	)
);

export function entries() {
	return [...eventsByFile.keys(), 'burbsec.ics'].map((file) => ({ file }));
}

export function GET({ params }) {
	let body;
	if (params.file === 'burbsec.ics') {
		body = buildCalendar(scheduledEvents, 'BurbSec Network');
	} else {
		const event = eventsByFile.get(params.file);
		if (!event) error(404, 'Not found');
		body = buildCalendar([event], event.title);
	}

	return new Response(body, {
		headers: { 'Content-Type': 'text/calendar; charset=utf-8' }
	});
}
