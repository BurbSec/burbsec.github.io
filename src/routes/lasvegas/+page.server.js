import { getGalleryImages } from '$lib/server/gallery.js';
import { getEvent } from '$lib/data/events.js';

export function load() {
	const event = getEvent('lasvegas');
	return {
		galleryImages: getGalleryImages(event?.galleryFolder)
	};
}
