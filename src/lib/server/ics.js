import { nextOccurrence } from '$lib/utils/schedule.js';
import { SITE_URL } from '$lib/data/events.js';

/**
 * iCalendar (.ics) generation for recurring meetups. Runs at build time only;
 * the prerendered files are served statically from /calendar/<slug>.ics.
 */

const EVENT_DURATION_HOURS = 3;

const BYDAY_CODES = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

/**
 * Minimal VTIMEZONE definitions (post-2007 US DST rules; EU rules for Dublin).
 * Keyed by IANA zone name as used in events.js schedules.
 */
const VTIMEZONES = {
	'America/Chicago': [
		'BEGIN:VTIMEZONE',
		'TZID:America/Chicago',
		'BEGIN:DAYLIGHT',
		'TZOFFSETFROM:-0600',
		'TZOFFSETTO:-0500',
		'TZNAME:CDT',
		'DTSTART:20070311T020000',
		'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU',
		'END:DAYLIGHT',
		'BEGIN:STANDARD',
		'TZOFFSETFROM:-0500',
		'TZOFFSETTO:-0600',
		'TZNAME:CST',
		'DTSTART:20071104T020000',
		'RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU',
		'END:STANDARD',
		'END:VTIMEZONE'
	],
	'America/New_York': [
		'BEGIN:VTIMEZONE',
		'TZID:America/New_York',
		'BEGIN:DAYLIGHT',
		'TZOFFSETFROM:-0500',
		'TZOFFSETTO:-0400',
		'TZNAME:EDT',
		'DTSTART:20070311T020000',
		'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU',
		'END:DAYLIGHT',
		'BEGIN:STANDARD',
		'TZOFFSETFROM:-0400',
		'TZOFFSETTO:-0500',
		'TZNAME:EST',
		'DTSTART:20071104T020000',
		'RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU',
		'END:STANDARD',
		'END:VTIMEZONE'
	],
	'Europe/Dublin': [
		'BEGIN:VTIMEZONE',
		'TZID:Europe/Dublin',
		'BEGIN:DAYLIGHT',
		'TZOFFSETFROM:+0000',
		'TZOFFSETTO:+0100',
		'TZNAME:IST',
		'DTSTART:19810329T010000',
		'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
		'END:DAYLIGHT',
		'BEGIN:STANDARD',
		'TZOFFSETFROM:+0100',
		'TZOFFSETTO:+0000',
		'TZNAME:GMT',
		'DTSTART:19961027T020000',
		'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
		'END:STANDARD',
		'END:VTIMEZONE'
	]
};

/** Escape text per RFC 5545 (backslash, semicolon, comma, newline). */
function esc(text) {
	return String(text).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

/** Fold lines longer than 75 octets with CRLF + space continuation. */
function fold(line) {
	const out = [];
	while (line.length > 75) {
		out.push(line.slice(0, 75));
		line = ' ' + line.slice(75);
	}
	out.push(line);
	return out;
}

/** YYYYMMDDTHHMMSS local wall time for DTSTART/DTEND. */
function localStamp(date, time) {
	const pad = (n) => String(n).padStart(2, '0');
	return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${time.replace(':', '')}00`;
}

/** Human/venue address string from structuredData. */
function locationText(event) {
	const sd = event.structuredData;
	if (!sd?.venueName) return event.location;
	return [sd.venueName, sd.streetAddress, `${sd.addressLocality}, ${sd.addressRegion}`]
		.filter(Boolean)
		.join(', ');
}

/** VEVENT lines for one recurring meetup. */
function vevent(event, dtstamp) {
	const { schedule } = event;
	const start = nextOccurrence(schedule);
	const [h, m] = schedule.time.split(':').map(Number);
	const endTime = `${String(h + EVENT_DURATION_HOURS).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
	const byday =
		(schedule.week === 'last' ? '-1' : String(schedule.week)) + BYDAY_CODES[schedule.weekday];

	return [
		'BEGIN:VEVENT',
		`UID:${event.slug}@burbsec.com`,
		`DTSTAMP:${dtstamp}`,
		`DTSTART;TZID=${schedule.tz}:${localStamp(start, schedule.time)}`,
		`DTEND;TZID=${schedule.tz}:${localStamp(start, endTime)}`,
		`RRULE:FREQ=MONTHLY;BYDAY=${byday}`,
		`SUMMARY:${esc(`${event.title} Meetup`)}`,
		`LOCATION:${esc(locationText(event))}`,
		`DESCRIPTION:${esc(`${event.subtitle}. No dues, no presentations, just networking! Details: ${SITE_URL}/${event.slug}/`)}`,
		`URL:${SITE_URL}/${event.slug}/`,
		'END:VEVENT'
	];
}

/**
 * Build a complete VCALENDAR for one or more events.
 * @param {import('$lib/data/events.js').BurbSecEvent[]} events - Must all have `schedule`
 * @param {string} calName - X-WR-CALNAME shown by calendar apps
 * @returns {string}
 */
export function buildCalendar(events, calName) {
	const dtstamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
	const zones = [...new Set(events.map((e) => e.schedule.tz))];

	const lines = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//BurbSec//burbsec.com//EN',
		'CALSCALE:GREGORIAN',
		'METHOD:PUBLISH',
		`X-WR-CALNAME:${esc(calName)}`,
		...zones.flatMap((tz) => VTIMEZONES[tz] ?? []),
		...events.flatMap((e) => vevent(e, dtstamp)),
		'END:VCALENDAR'
	];

	return lines.flatMap(fold).join('\r\n') + '\r\n';
}
