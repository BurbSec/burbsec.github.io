import { redirect } from '@sveltejs/kit';

// BurbSec Southeast was renamed BurbSec South Bend. Prerendering turns this
// into a meta-refresh page, since GitHub Pages can't send real redirects.
export function load() {
	redirect(308, '/southbend/');
}
