<script>
	/** @type {{ images?: string[], alt?: string }} */
	let {
		images = [],
		alt = 'Gallery image'
	} = $props();

	/** @type {string|null} */
	let modalImage = $state(null);

	/** Duration in seconds per image — controls scroll speed */
	const SECONDS_PER_IMAGE = 4;

	/**
	 * Minimum number of images needed to enable the auto-scroll loop.
	 * Below this count, images are shown statically (centered).
	 * ~5 images × (200px + 12px gap) ≈ 1060px which roughly fills a viewport.
	 */
	const LOOP_THRESHOLD = 4;

	let shouldLoop = $derived(images.length >= LOOP_THRESHOLD);
	let duration = $derived(images.length * SECONDS_PER_IMAGE);

	function openModal(src) {
		modalImage = src;
	}

	function closeModal() {
		modalImage = null;
	}

	function handleKeydown(e) {
		if (e.key === 'Escape') closeModal();
	}

	function handleBackdropClick(e) {
		if (e.target === e.currentTarget) closeModal();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if images.length > 0}
	<div class="gallery-ribbon" class:static-ribbon={!shouldLoop}>
		<div
			class="gallery-track"
			class:animate={shouldLoop}
			style={shouldLoop ? `animation-duration: ${duration}s;` : ''}
		>
			{#each images as src, i}
				<button
					class="gallery-item"
					onclick={() => openModal(src)}
					type="button"
					aria-label="View full image {i + 1}"
				>
					<img {src} alt="{alt} {i + 1}" loading="lazy" decoding="async" />
				</button>
			{/each}
			{#if shouldLoop}
				<!-- Duplicate set for seamless loop -->
				{#each images as src, i}
					<button
						class="gallery-item"
						onclick={() => openModal(src)}
						type="button"
						aria-label="View full image {i + 1}"
						aria-hidden="true"
						tabindex="-1"
					>
						<img {src} alt="" loading="lazy" decoding="async" />
					</button>
				{/each}
			{/if}
		</div>
	</div>
{/if}

{#if modalImage}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
	<div
		class="gallery-modal-backdrop"
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		role="dialog"
		aria-modal="true"
		aria-label="Full size image"
		tabindex="-1"
	>
		<button class="gallery-modal-close" onclick={closeModal} aria-label="Close image" type="button">
			<i class="fa-solid fa-xmark"></i>
		</button>
		<img src={modalImage} alt="{alt} full size" class="gallery-modal-image" />
	</div>
{/if}
