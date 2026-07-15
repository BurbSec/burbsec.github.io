<script>
	import { icons } from '$lib/data/icons.js';

	/**
	 * Inline SVG icon, sized to the surrounding text like Font Awesome's
	 * <i> tags were. `size` mirrors the FA sizing classes previously used.
	 *
	 * @type {{ name: string, size?: '1x' | 'xl' | '2x', class?: string }}
	 */
	let { name, size = '1x', class: className = '' } = $props();

	let icon = $derived(icons[name]);
</script>

{#if icon}
	<svg
		class="icon{size === '1x' ? '' : ` icon-${size}`} {className}"
		viewBox={icon.viewBox}
		fill="currentColor"
		aria-hidden="true"
	><path d={icon.d} /></svg>
{/if}
