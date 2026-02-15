<script>
	import { chicagolandEvents, elsewhereEvents, specialEvents } from '$lib/data/events.js';

	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	/** Close the mobile menu when a link is clicked. */
	function closeMenu() {
		isMenuOpen = false;
	}
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Main navigation">
	<div class="container-fluid">
		<a class="navbar-brand d-flex align-items-center" href="/">
			<img src="/images/us-interstate.png" alt="" width="30" height="30" class="me-2" aria-hidden="true">
			Burbsec
		</a>

		<button
			class="navbar-toggler"
			type="button"
			on:click={toggleMenu}
			aria-controls="navbarNav"
			aria-expanded={isMenuOpen}
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse {isMenuOpen ? 'show' : ''}" id="navbarNav">
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				<!-- Chicagoland dropdown (auto-generated) -->
				<li class="nav-item dropdown">
					<button class="nav-link dropdown-toggle btn btn-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						Chicagoland
					</button>
					<ul class="dropdown-menu">
						{#each chicagolandEvents as event (event.slug)}
							<li><a class="dropdown-item" href="/{event.slug}" on:click={closeMenu}>{event.cardTitle}</a></li>
						{/each}
					</ul>
				</li>

				<!-- Elsewhere dropdown (auto-generated) -->
				<li class="nav-item dropdown">
					<button class="nav-link dropdown-toggle btn btn-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						Elsewhere
					</button>
					<ul class="dropdown-menu">
						{#each elsewhereEvents as event (event.slug)}
							<li><a class="dropdown-item" href="/{event.slug}" on:click={closeMenu}>{event.cardTitle}</a></li>
						{/each}
					</ul>
				</li>

				<!-- Special Interest dropdown (auto-generated) -->
				{#if specialEvents.length > 0}
					<li class="nav-item dropdown">
						<button class="nav-link dropdown-toggle btn btn-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Special Interest
						</button>
						<ul class="dropdown-menu">
							{#each specialEvents as event (event.slug)}
								<li><a class="dropdown-item" href="/{event.slug}" on:click={closeMenu}>{event.cardTitle}</a></li>
							{/each}
						</ul>
					</li>
				{/if}

				<li class="nav-item">
					<a class="nav-link" href="https://tinyurl.com/burbchat" target="_blank" rel="noopener noreferrer">
						<i class="fa-brands fa-discord"></i> Discord
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="https://www.meetup.com/burbsec/" target="_blank" rel="noopener noreferrer">
						<i class="fa-brands fa-meetup"></i> Next Meetups
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="https://www.linkedin.com/groups/4081253/" target="_blank" rel="noopener noreferrer">
						<i class="fa-brands fa-linkedin"></i> LinkedIn
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/sponsors" on:click={closeMenu}>
						<i class="fa-solid fa-hand-holding-medical"></i> Sponsor Us!
					</a>
				</li>
			</ul>
		</div>
	</div>
</nav>

