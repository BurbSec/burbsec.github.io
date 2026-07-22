/**
 * Date math for recurring meetup schedules ("nth Thursday of the month").
 * Pure functions, safe on both server (prerender, ICS generation) and client.
 *
 * @typedef {import('$lib/data/events.js').BurbSecEvent['schedule']} Schedule
 */

/**
 * The occurrence of a schedule within a given month.
 * @param {Schedule} schedule
 * @param {number} year
 * @param {number} month - 0-indexed, may overflow (Date handles rollover)
 * @returns {Date}
 */
function occurrenceInMonth(schedule, year, month) {
	if (schedule.week === 'last') {
		const d = new Date(year, month + 1, 0); // last day of month
		d.setDate(d.getDate() - ((d.getDay() - schedule.weekday + 7) % 7));
		return d;
	}
	const d = new Date(year, month, 1);
	d.setDate(1 + ((schedule.weekday - d.getDay() + 7) % 7) + (schedule.week - 1) * 7);
	return d;
}

/**
 * Next occurrence of a schedule on or after `from`. A meetup counts as
 * upcoming through the end of its day, so it still shows while in progress.
 * @param {Schedule} schedule
 * @param {Date} [from]
 * @returns {Date}
 */
export function nextOccurrence(schedule, from = new Date()) {
	let d = occurrenceInMonth(schedule, from.getFullYear(), from.getMonth());
	const endOfDay = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59);
	if (endOfDay < from) {
		d = occurrenceInMonth(schedule, from.getFullYear(), from.getMonth() + 1);
	}
	return d;
}

/**
 * Short form for homepage cards, e.g. "Thu, Aug 13".
 * @param {Date} date
 */
export function formatShort(date) {
	return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

/**
 * Long form for event pages, e.g. "Thursday, August 13".
 * @param {Date} date
 */
export function formatLong(date) {
	return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

/**
 * UTC offset string (e.g. "-05:00") for an IANA zone on a given date, DST-aware.
 * @param {string} tz - IANA zone name, e.g. 'America/Chicago'
 * @param {Date} [date]
 */
export function utcOffset(tz, date = new Date()) {
	const name = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'longOffset' })
		.formatToParts(date)
		.find((p) => p.type === 'timeZoneName')?.value;
	const match = name?.match(/GMT([+-]\d{2}:\d{2})/);
	return match ? match[1] : '+00:00';
}

/**
 * 12-hour display for a 24h "HH:MM" wall time, e.g. "6:00 PM".
 * @param {string} time
 */
export function formatTime(time) {
	const [h, m] = time.split(':').map(Number);
	const suffix = h >= 12 ? 'PM' : 'AM';
	const hour12 = h % 12 || 12;
	return `${hour12}:${String(m).padStart(2, '0')} ${suffix}`;
}
