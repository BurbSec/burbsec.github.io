import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

/**
 * Generate ribbon thumbnails for gallery images.
 *
 * Mirrors static/images/irl/<folder>/ into static/images/irl-thumbs/<folder>/,
 * resizing each image to THUMB_HEIGHT px tall (the ribbon renders at ~200px;
 * 2x for hi-DPI screens). Originals are only loaded when the modal opens.
 *
 * Output dir is gitignored and rebuilt on demand; up-to-date thumbs (newer
 * than their source) are skipped so repeat runs are fast.
 */

const THUMB_HEIGHT = 400;
const SRC_ROOT = path.join(process.cwd(), 'static', 'images', 'irl');
const OUT_ROOT = path.join(process.cwd(), 'static', 'images', 'irl-thumbs');
const IMAGE_RE = /\.(jpg|jpeg|png|webp)$/i;

if (!fs.existsSync(SRC_ROOT)) {
	console.log('No gallery source directory found, skipping thumbnails.');
	process.exit(0);
}

let generated = 0;
let skipped = 0;

const folders = fs
	.readdirSync(SRC_ROOT, { withFileTypes: true })
	.filter((d) => d.isDirectory())
	.map((d) => d.name);

for (const folder of folders) {
	const srcDir = path.join(SRC_ROOT, folder);
	const outDir = path.join(OUT_ROOT, folder);
	fs.mkdirSync(outDir, { recursive: true });

	const files = fs.readdirSync(srcDir).filter((f) => IMAGE_RE.test(f));

	// Remove thumbs whose source image no longer exists
	for (const stale of fs.readdirSync(outDir)) {
		const srcName = stale.replace(/\.webp$/, '');
		if (!files.some((f) => f.replace(IMAGE_RE, '') === srcName)) {
			fs.rmSync(path.join(outDir, stale));
		}
	}

	for (const file of files) {
		const srcPath = path.join(srcDir, file);
		const outPath = path.join(outDir, file.replace(IMAGE_RE, '') + '.webp');

		if (fs.existsSync(outPath) && fs.statSync(outPath).mtimeMs >= fs.statSync(srcPath).mtimeMs) {
			skipped++;
			continue;
		}

		await sharp(srcPath)
			.resize({ height: THUMB_HEIGHT, withoutEnlargement: true })
			.webp({ quality: 78 })
			.toFile(outPath);
		generated++;
	}
}

console.log(`Thumbnails: ${generated} generated, ${skipped} up to date.`);
