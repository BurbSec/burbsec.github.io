<script>
	import Icon from '$lib/components/Icon.svelte';
	/** @type {{ images?: Array<{ thumb: string, full: string }>, alt?: string }} */
	let {
		images = [],
		alt = 'Gallery image'
	} = $props();

	/** Index into `images` of the photo shown in the modal, or null when closed. */
	let modalIndex = $state(null);

	/** Duration in seconds per image — controls scroll speed */
	const SECONDS_PER_IMAGE = 4;

	/** How much faster than the base drift a held scroll button moves the ribbon. */
	const BOOST_FACTOR = 8;

	/**
	 * A tap on a touch screen only holds the button for ~80ms, which at boost
	 * speed is an invisible nudge. Every press therefore runs for at least this
	 * long, so a tap always advances the ribbon by a noticeable amount.
	 */
	const MIN_BOOST_MS = 450;

	/** Horizontal travel, in px, that separates a swipe from a tap. */
	const SWIPE_THRESHOLD = 50;

	/**
	 * A trackpad two-finger swipe arrives as a stream of wheel events, not as a
	 * pointer drag, so it needs its own accumulator. deltaX units are not pixels
	 * and come in volume, hence a separate (larger) threshold.
	 */
	const WHEEL_THRESHOLD = 120;

	/** Quiet gap that marks the end of one flick, momentum included. */
	const WHEEL_IDLE_MS = 180;

	/**
	 * Floor between two wheel-driven steps. Stepping decodes a full-size photo,
	 * which can stall the main thread past WHEEL_IDLE_MS and make one flick look
	 * like two gestures; this bounds the damage to one step either way.
	 */
	const WHEEL_COOLDOWN_MS = 350;

	let duration = $derived(images.length * SECONDS_PER_IMAGE);

	/** Once the rAF loop owns the transform, the CSS keyframe animation must stop. */
	let jsScrolling = $state(false);

	/** @type {HTMLElement|null} */
	let track = $state(null);

	/** -1 while the left button is held, 1 while the right one is, 0 otherwise. */
	let boost = $state(0);
	let hovering = $state(false);

	$effect(() => {
		if (!track) return;

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
		let offset = 0;
		let period = 0;
		let frame = 0;
		let last = 0;

		/**
		 * The seamless wrap distance is the offset of the first duplicate from the
		 * first original — i.e. one full set including its trailing gap. Half the
		 * track width is one gap short of that, so measure rather than assume.
		 */
		function measure() {
			const items = track.children;
			period =
				items.length > images.length
					? items[images.length].offsetLeft - items[0].offsetLeft
					: 0;
		}

		function tick(now) {
			const dt = Math.min((now - last) / 1000, 0.1);
			last = now;

			// Held button wins over hover-pause, which wins over the base drift.
			const base = reduced.matches || hovering ? 0 : 1;
			const speed = period / duration;
			const velocity = speed * (boost !== 0 ? boost * BOOST_FACTOR : base);

			if (velocity !== 0 && period > 0) {
				offset = (offset + velocity * dt) % period;
				if (offset < 0) offset += period;
				track.style.transform = `translateX(${-offset}px)`;
			}
			frame = requestAnimationFrame(tick);
		}

		measure();
		jsScrolling = true;
		last = performance.now();
		frame = requestAnimationFrame(tick);

		const onResize = () => measure();
		window.addEventListener('resize', onResize);

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('resize', onResize);
			jsScrolling = false;
			if (track) track.style.transform = '';
		};
	});

	/** @type {ReturnType<typeof setTimeout>|undefined} */
	let releaseTimer;
	let pressing = false;

	/** @param {number} direction -1 for left, 1 for right */
	function startBoost(direction) {
		clearTimeout(releaseTimer);
		pressing = true;
		boost = direction;
	}

	/**
	 * Release is wired to pointerup, pointerleave and pointercancel, any of which
	 * can follow the same press; only the first one should start the floor timer.
	 */
	function endBoost() {
		if (!pressing) return;
		pressing = false;
		// Hold the boost briefly so a quick tap still moves the ribbon visibly.
		releaseTimer = setTimeout(() => (boost = 0), MIN_BOOST_MS);
	}

	/** Enter/Space hold-to-scroll, so the buttons work without a pointer. */
	function boostKeydown(e, direction) {
		if (e.key !== 'Enter' && e.key !== ' ') return;
		e.preventDefault();
		startBoost(direction);
	}

	function boostKeyup(e) {
		if (e.key !== 'Enter' && e.key !== ' ') return;
		endBoost();
	}

	/** @type {HTMLElement|null} */
	let backdrop = $state(null);
	/** @type {HTMLElement|null} */
	let lastTrigger = null;

	function openModal(index, e) {
		lastTrigger = e?.currentTarget ?? null;
		modalIndex = index;
	}

	function closeModal() {
		modalIndex = null;
		lastTrigger?.focus();
		lastTrigger = null;
	}

	/**
	 * Move focus off the thumbnail that opened the modal. Left there, Space or
	 * Enter would re-fire its click and snap the modal back to that image, and
	 * the prev/next buttons would sit behind every remaining thumbnail in the
	 * tab order.
	 */
	$effect(() => {
		if (modalIndex !== null && backdrop) backdrop.focus();
	});

	/** @param {number} step -1 for previous, 1 for next; wraps around the series. */
	function stepModal(step) {
		if (modalIndex === null) return;
		modalIndex = (modalIndex + step + images.length) % images.length;
	}

	let modalImage = $derived(modalIndex === null ? null : images[modalIndex].full);

	// The ribbon shows thumbnails, so a neighbour's full-size original is not in
	// cache yet. Warm both so stepping doesn't land on a blank frame.
	$effect(() => {
		if (modalIndex === null || images.length < 2) return;
		for (const step of [-1, 1]) {
			const img = new Image();
			img.src = images[(modalIndex + step + images.length) % images.length].full;
		}
	});

	function handleKeydown(e) {
		if (modalIndex === null) return;
		if (e.key === 'Escape') {
			closeModal();
		} else if (e.key === 'ArrowLeft' && images.length > 1) {
			e.preventDefault();
			stepModal(-1);
		} else if (e.key === 'ArrowRight' && images.length > 1) {
			e.preventDefault();
			stepModal(1);
		}
	}

	/** @type {{ id: number, x: number, y: number }|null} */
	let swipeStart = null;
	/** Set when a pointer release resolved to a swipe, so the click that follows
	 *  it doesn't also close the modal. */
	let swiped = false;

	function swipeDown(e) {
		// Each press starts clean, so a swipe whose click never lands can't
		// swallow the next tap-to-close.
		swiped = false;
		// A drag begun on the close/prev/next buttons is theirs — otherwise it
		// would step once on release and again on their click.
		swipeStart = e.target.closest('button')
			? null
			: { id: e.pointerId, x: e.clientX, y: e.clientY };
	}

	function swipeUp(e) {
		if (!swipeStart || e.pointerId !== swipeStart.id) return;
		const dx = e.clientX - swipeStart.x;
		const dy = e.clientY - swipeStart.y;
		swipeStart = null;
		// Only a mostly-horizontal drag past the threshold counts; anything
		// shorter stays a tap and still closes via the backdrop.
		if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) <= Math.abs(dy)) return;
		swiped = true;
		stepModal(dx < 0 ? 1 : -1);
	}

	function swipeCancel() {
		swipeStart = null;
	}

	/**
	 * Trackpad horizontal swipes. One flick delivers a long decaying stream of
	 * wheel events, so deltaX is accumulated, stepped once past the threshold,
	 * then locked out until the stream goes quiet — otherwise a single flick
	 * would run through several images.
	 */
	$effect(() => {
		// Keyed on `backdrop` alone: reading modalIndex here would re-arm the
		// listener on every step and reset the lock mid-flick.
		if (!backdrop) return;

		let accum = 0;
		let locked = false;
		let lastStep = 0;
		/** @type {ReturnType<typeof setTimeout>|undefined} */
		let idle;

		function onWheel(e) {
			if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
			// Trackpads report pixels, but a tilt wheel reports lines or pages;
			// normalise so one threshold works for all of them.
			const scale = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerWidth : 1;
			// Also stops macOS Chrome/Safari reading the gesture as history
			// back/forward, which navigates away from the page entirely.
			e.preventDefault();

			clearTimeout(idle);
			idle = setTimeout(() => {
				accum = 0;
				locked = false;
			}, WHEEL_IDLE_MS);

			if (locked) return;
			// Hold the accumulator at zero through the cooldown so the tail of a
			// flick can't quietly build up another step.
			if (performance.now() - lastStep < WHEEL_COOLDOWN_MS) {
				accum = 0;
				return;
			}
			accum += e.deltaX * scale;
			if (Math.abs(accum) < WHEEL_THRESHOLD) return;
			// Natural scrolling: swiping left yields positive deltaX, which
			// advances, matching swipe-left-is-next on the pointer path.
			stepModal(accum > 0 ? 1 : -1);
			accum = 0;
			locked = true;
			lastStep = performance.now();
		}

		backdrop.addEventListener('wheel', onWheel, { passive: false });
		return () => {
			backdrop?.removeEventListener('wheel', onWheel);
			clearTimeout(idle);
		};
	});

	function handleBackdropClick(e) {
		// pointerup runs before click, so a completed swipe is already flagged.
		if (swiped) {
			swiped = false;
			return;
		}
		if (e.target === e.currentTarget) closeModal();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if images.length > 0}
	<div
		class="gallery-shell"
		onpointerenter={() => (hovering = true)}
		onpointerleave={() => (hovering = false)}
	>
		<div class="gallery-ribbon">
			<div
				bind:this={track}
				class="gallery-track"
				class:animate={!jsScrolling}
				style={!jsScrolling ? `animation-duration: ${duration}s;` : ''}
			>
				{#each images as image, i}
					<button
						class="gallery-item"
						onclick={(e) => openModal(i, e)}
						type="button"
						aria-label="View full image {i + 1}"
					>
						<img src={image.thumb} alt="{alt} {i + 1}" loading="lazy" decoding="async" />
					</button>
				{/each}
				<!-- Duplicate set for seamless loop -->
				{#each images as image, i}
					<button
						class="gallery-item"
						onclick={(e) => openModal(i, e)}
						type="button"
						aria-label="View full image {i + 1}"
						aria-hidden="true"
						tabindex="-1"
					>
						<img src={image.thumb} alt="" loading="lazy" decoding="async" />
					</button>
				{/each}
			</div>
		</div>

		<button
			class="gallery-scroll gallery-scroll-left"
			type="button"
			aria-label="Scroll photos left"
			onpointerdown={() => startBoost(-1)}
			onpointerup={endBoost}
			onpointerleave={endBoost}
			onpointercancel={endBoost}
			onkeydown={(e) => boostKeydown(e, -1)}
			onkeyup={boostKeyup}
			onblur={endBoost}
		>
			<Icon name="angles-left" />
		</button>
		<button
			class="gallery-scroll gallery-scroll-right"
			type="button"
			aria-label="Scroll photos right"
			onpointerdown={() => startBoost(1)}
			onpointerup={endBoost}
			onpointerleave={endBoost}
			onpointercancel={endBoost}
			onkeydown={(e) => boostKeydown(e, 1)}
			onkeyup={boostKeyup}
			onblur={endBoost}
		>
			<Icon name="angles-right" />
		</button>
	</div>
{/if}

{#if modalImage}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
	<div
		bind:this={backdrop}
		class="gallery-modal-backdrop"
		onclick={handleBackdropClick}
		onpointerdown={swipeDown}
		onpointerup={swipeUp}
		onpointercancel={swipeCancel}
		role="dialog"
		aria-modal="true"
		aria-label="Full size image"
		tabindex="-1"
	>
		<button class="gallery-modal-close" onclick={closeModal} aria-label="Close image" type="button">
			<Icon name="xmark" />
		</button>

		{#if images.length > 1}
			<button
				class="gallery-modal-nav gallery-modal-prev"
				onclick={() => stepModal(-1)}
				aria-label="Previous image"
				type="button"
			>
				<Icon name="chevron-left" />
			</button>
		{/if}

		<img src={modalImage} alt="{alt} full size" class="gallery-modal-image" />

		{#if images.length > 1}
			<button
				class="gallery-modal-nav gallery-modal-next"
				onclick={() => stepModal(1)}
				aria-label="Next image"
				type="button"
			>
				<Icon name="chevron-right" />
			</button>
			<p class="gallery-modal-counter" aria-live="polite">
				{modalIndex + 1} / {images.length}
			</p>
		{/if}
	</div>
{/if}
