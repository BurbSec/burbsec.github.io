import fs from 'fs';
import path from 'path';

/**
 * Read gallery images from a folder under static/images/irl/.
 * Runs at build time during prerendering to bake the image list into static output.
 *
 * @param {string} folder - Subfolder name (e.g. 'east', 'north', 'mpls')
 * @returns {string[]} Array of URL paths to gallery images
 */
export function getGalleryImages(folder) {
	if (!folder) return [];

	const dir = path.join(process.cwd(), 'static', 'images', 'irl', folder);

	if (!fs.existsSync(dir)) return [];

	return fs
		.readdirSync(dir)
		.filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
		.sort((a, b) => a.localeCompare(b))
		.map((f) => `/images/irl/${folder}/${f}`);
}

/**
 * Get the first image from each gallery folder that has images.
 * Used on the homepage to build a sampler ribbon.
 *
 * @param {string[]} folders - Array of subfolder names
 * @returns {string[]} Array of URL paths (one per folder that has images)
 */
export function getFirstImagePerFolder(folders) {
	/** @type {string[]} */
	const result = [];

	for (const folder of folders) {
		const images = getGalleryImages(folder);
		if (images.length > 0) {
			result.push(images[0]);
		}
	}

	return result;
}
