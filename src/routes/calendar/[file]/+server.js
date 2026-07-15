import { error } from '@sveltejs/kit';
import { allEvents } from '$lib/data/events.js';
import { buildCalendar } from '$lib/server/ics.js';

/**
 * Prerendered .ics calendar files: /calendar/<slug>.ics per event with a
 * fixed schedule, plus /calendar/burbsec.ics combining all of them.
 */

export const prerender = true;

const scheduledEvents = allEvents.filter((e) => e.schedule);

export function entries() {
	return [
		...scheduledEvents.map((e) => ({ file: `${e.slug}.ics` })),
		{ file: 'burbsec.ics' }
	];
}

export function GET({ params }) {
	let body;
	if (params.file === 'burbsec.ics') {
		body = buildCalendar(scheduledEvents, 'BurbSec Network');
	} else {
		const event = scheduledEvents.find((e) => `${e.slug}.ics` === params.file);
		if (!event) error(404, 'Not found');
		body = buildCalendar([event], event.title);
	}

	return new Response(body, {
		headers: { 'Content-Type': 'text/calendar; charset=utf-8' }
	});
}
