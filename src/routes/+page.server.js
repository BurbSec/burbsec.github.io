import { getFirstImagePerFolder } from '$lib/server/gallery.js';
import { allEvents } from '$lib/data/events.js';

export function load() {
	const folders = allEvents
		.map((e) => e.galleryFolder)
		.filter(Boolean);

	return {
		heroImages: getFirstImagePerFolder(folders)
	};
}
