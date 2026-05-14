<script>
	import { onMount } from 'svelte';

	let canvasEl = $state();

	onMount(() => {
		// Honor reduced-motion preference — leave the canvas blank.
		const reduceMotion =
			typeof window !== 'undefined' &&
			window.matchMedia &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduceMotion) return;

		const canvas = canvasEl;
		const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });

		// Brand-aligned palette: cyan dominant, amber + red accents.
		const COLORS = ['#00d4ff', '#00d4ff', '#00d4ff', '#00d4ff', '#ffc107', '#ff3058'];

		const paths = [];
		const pulses = [];
		const sparks = [];
		let W = 0;
		let H = 0;

		// Offscreen substrate — the faint static traces, rendered once per
		// resize and blitted each frame.
		const sub = document.createElement('canvas');
		const sctx = sub.getContext('2d');

		function resize() {
			W = window.innerWidth;
			H = window.innerHeight;
			canvas.width = W;
			canvas.height = H;
			sub.width = W;
			sub.height = H;
			buildPaths();
			renderSubstrate();
		}

		function buildPaths() {
			paths.length = 0;
			const N = Math.min(55, Math.max(30, Math.floor((W * H) / 45000)));
			for (let i = 0; i < N; i++) {
				const p = makePath();
				if (p) paths.push(p);
			}
		}

		function makePath() {
			let x = Math.random() * W;
			let y = Math.random() * H;
			const pts = [{ x, y }];
			const segs = 4 + Math.floor(Math.random() * 6);
			let horiz = Math.random() > 0.5;
			for (let s = 0; s < segs; s++) {
				const len = 60 + Math.random() * 240;
				const dir = Math.random() > 0.5 ? 1 : -1;
				const nx = horiz ? x + len * dir : x;
				const ny = horiz ? y : y + len * dir;
				x = Math.max(-50, Math.min(W + 50, nx));
				y = Math.max(-50, Math.min(H + 50, ny));
				pts.push({ x, y });
				horiz = !horiz;
			}
			if (pts.length < 3) return null;
			const segLens = [];
			let total = 0;
			for (let i = 1; i < pts.length; i++) {
				const L = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
				segLens.push(L);
				total += L;
			}
			return { pts, segLens, total };
		}

		function pointAt(path, t) {
			if (t <= 0) return path.pts[0];
			if (t >= 1) return path.pts[path.pts.length - 1];
			const target = t * path.total;
			let acc = 0;
			for (let i = 0; i < path.segLens.length; i++) {
				const L = path.segLens[i];
				if (acc + L >= target) {
					const f = (target - acc) / L;
					const a = path.pts[i];
					const b = path.pts[i + 1];
					return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
				}
				acc += L;
			}
			return path.pts[path.pts.length - 1];
		}

		function renderSubstrate() {
			sctx.clearRect(0, 0, W, H);
			sctx.lineCap = 'round';
			sctx.lineJoin = 'round';
			sctx.strokeStyle = 'rgba(0,212,255,0.07)';
			sctx.lineWidth = 0.6;
			for (const p of paths) {
				sctx.beginPath();
				sctx.moveTo(p.pts[0].x, p.pts[0].y);
				for (let i = 1; i < p.pts.length; i++) sctx.lineTo(p.pts[i].x, p.pts[i].y);
				sctx.stroke();
			}
		}

		function spawnPulse() {
			if (paths.length === 0) return;
			pulses.push({
				path: paths[Math.floor(Math.random() * paths.length)],
				t: 0,
				speed: 0.001 + Math.random() * 0.0035,
				color: COLORS[Math.floor(Math.random() * COLORS.length)],
				tail: 0.05 + Math.random() * 0.13
			});
		}

		function spawnSpark(x, y, color) {
			const n = 4 + Math.floor(Math.random() * 4);
			for (let i = 0; i < n; i++) {
				const ang = Math.random() * Math.PI * 2;
				const spd = 0.5 + Math.random() * 1.8;
				sparks.push({
					x,
					y,
					vx: Math.cos(ang) * spd,
					vy: Math.sin(ang) * spd,
					life: 1,
					decay: 0.03 + Math.random() * 0.04,
					color
				});
			}
		}

		// 3-pass halation — wide soft, medium, bright core under
		// globalCompositeOperation='lighter' replaces shadowBlur (which is the
		// single most expensive thing you can do in a canvas2D animation).
		const TRAIL_STEPS = 8;
		function drawPulseTrail(p) {
			const path = p.path;
			const trail = [];
			for (let k = 0; k <= TRAIL_STEPS; k++) {
				const tk = p.t - (k / TRAIL_STEPS) * p.tail;
				if (tk < 0) break;
				trail.push(pointAt(path, Math.min(1, tk)));
			}
			if (trail.length < 2) return null;

			ctx.strokeStyle = p.color;
			ctx.beginPath();
			ctx.moveTo(trail[0].x, trail[0].y);
			for (let k = 1; k < trail.length; k++) ctx.lineTo(trail[k].x, trail[k].y);

			ctx.globalAlpha = 0.16;
			ctx.lineWidth = 7;
			ctx.stroke();
			ctx.globalAlpha = 0.42;
			ctx.lineWidth = 2.5;
			ctx.stroke();
			ctx.globalAlpha = 0.95;
			ctx.lineWidth = 1.1;
			ctx.stroke();

			return trail[0];
		}

		// 60fps cap regardless of display refresh rate.
		const FRAME_MS = 1000 / 60;
		let lastFrame = 0;
		let running = true;
		let rafId = 0;

		function frame(now) {
			if (running) rafId = requestAnimationFrame(frame);
			if (now - lastFrame < FRAME_MS) return;
			lastFrame = now;

			// Soft fade — destination-out alpha-erases the previous frame.
			ctx.globalCompositeOperation = 'destination-out';
			ctx.fillStyle = 'rgba(0,0,0,0.22)';
			ctx.fillRect(0, 0, W, H);

			// Blit the static substrate.
			ctx.globalCompositeOperation = 'source-over';
			ctx.globalAlpha = 1;
			ctx.drawImage(sub, 0, 0);

			// Additive composite for glowing pulses.
			ctx.globalCompositeOperation = 'lighter';
			ctx.lineCap = 'round';
			ctx.lineJoin = 'round';

			for (let i = pulses.length - 1; i >= 0; i--) {
				const p = pulses[i];
				p.t += p.speed;
				if (p.t > 1 + p.tail) {
					const end = p.path.pts[p.path.pts.length - 1];
					spawnSpark(end.x, end.y, p.color);
					pulses.splice(i, 1);
					continue;
				}
				const head = drawPulseTrail(p);
				if (p.t <= 1 && head) {
					ctx.fillStyle = p.color;
					ctx.globalAlpha = 0.45;
					ctx.beginPath();
					ctx.arc(head.x, head.y, 5, 0, Math.PI * 2);
					ctx.fill();
					ctx.fillStyle = '#ffffff';
					ctx.globalAlpha = 1;
					ctx.beginPath();
					ctx.arc(head.x, head.y, 2, 0, Math.PI * 2);
					ctx.fill();
				}
			}

			// Sparks (additive — no shadowBlur required).
			for (let i = sparks.length - 1; i >= 0; i--) {
				const s = sparks[i];
				s.x += s.vx;
				s.y += s.vy;
				s.vx *= 0.92;
				s.vy *= 0.92;
				s.life -= s.decay;
				if (s.life <= 0) {
					sparks.splice(i, 1);
					continue;
				}
				ctx.fillStyle = s.color;
				ctx.globalAlpha = s.life * 0.9;
				ctx.beginPath();
				ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
				ctx.fill();
			}

			ctx.globalAlpha = 1;
			ctx.globalCompositeOperation = 'source-over';

			const target = 22;
			if (pulses.length < target && Math.random() < 0.3) spawnPulse();
		}

		function handleVisibility() {
			if (document.hidden) {
				running = false;
			} else if (!running) {
				running = true;
				lastFrame = 0;
				rafId = requestAnimationFrame(frame);
			}
		}

		let rzTimer = null;
		function handleResize() {
			clearTimeout(rzTimer);
			rzTimer = setTimeout(resize, 150);
		}

		resize();
		for (let i = 0; i < 10; i++) spawnPulse();
		rafId = requestAnimationFrame(frame);

		document.addEventListener('visibilitychange', handleVisibility);
		window.addEventListener('resize', handleResize);

		return () => {
			running = false;
			cancelAnimationFrame(rafId);
			clearTimeout(rzTimer);
			document.removeEventListener('visibilitychange', handleVisibility);
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<canvas bind:this={canvasEl} class="laser-lines-bg" aria-hidden="true"></canvas>

<style>
	.laser-lines-bg {
		position: fixed;
		inset: 0;
		width: 100vw;
		height: 100vh;
		/* Negative z-index keeps the canvas behind all naturally-flowing
		   content (navbar, main, footer) without needing to promote them to
		   their own stacking contexts. Still sits above body backgrounds. */
		z-index: -1;
		pointer-events: none;
		/* Dim the whole layer so the pulses read as ambient atmosphere
		   instead of competing with page content (matches the subtle vibe
		   of bsides312.org). */
		opacity: 0.35;
	}

	@media (prefers-reduced-motion: reduce) {
		.laser-lines-bg {
			display: none;
		}
	}
</style>
