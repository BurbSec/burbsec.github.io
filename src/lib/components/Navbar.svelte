<script>
	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
	<div class="container-fluid">
		<a class="navbar-brand d-flex align-items-center" href="/">
			<img src="/images/us-interstate.png" alt="Burbsec" width="30" height="30" class="me-2">
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
				<li class="nav-item dropdown">
					<button class="nav-link dropdown-toggle btn btn-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						Chicagoland
					</button>
					<ul class="dropdown-menu">
						<li><a class="dropdown-item" href="/east">Chicago</a></li>
						<li><a class="dropdown-item" href="/northwest">Crystal Lake</a></li>
						<li><a class="dropdown-item" href="/north">Wheeling</a></li>
						<li><a class="dropdown-item" href="/south">Hickory Hills</a></li>
						<li><a class="dropdown-item" href="/west">Naperville</a></li>
						<li><a class="dropdown-item" href="/prime">Schaumburg</a></li>
						<li><a class="dropdown-item" href="/southeast">South Bend, IN</a></li>
					</ul>
				</li>
				<li class="nav-item dropdown">
					<button class="nav-link dropdown-toggle btn btn-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						Elsewhere
					</button>
					<ul class="dropdown-menu">
						<li><a class="dropdown-item" href="/galway">Galway, Ireland</a></li>
						<li><a class="dropdown-item" href="/lasvegas">Las Vegas, NV</a></li>
					</ul>
				</li>
				<li class="nav-item dropdown">
					<button class="nav-link dropdown-toggle btn btn-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						Special Interest
					</button>
					<ul class="dropdown-menu">
						<li><a class="dropdown-item" href="/cigarsec">CigarSec</a></li>
					</ul>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="https://tinyurl.com/burbchat" target="_blank" rel="noopener">
						<i class="fa-brands fa-discord"></i> Discord
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="https://www.meetup.com/burbsec/" target="_blank" rel="noopener">
						<i class="fa-brands fa-meetup"></i> Next Meetups
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="https://www.linkedin.com/groups/4081253/" target="_blank" rel="noopener">
						<i class="fa-brands fa-linkedin"></i> LinkedIn
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/sponsors">
						<i class="fa-solid fa-hand-holding-medical"></i> Sponsor Us!
					</a>
				</li>
			</ul>
		</div>
	</div>
</nav>

<style>
	.navbar-nav .nav-link,
	.navbar-nav .dropdown-item {
		padding-left: 0.75rem;
		padding-right: 0.75rem;
	}
	
	.navbar-nav .nav-link i {
		font-size: 1rem;
		margin-right: 0.5rem;
	}
	
	.navbar-nav .btn-link {
		border: none;
		color: rgba(255, 255, 255, 0.55);
		text-decoration: none;
		padding: 0.5rem 1rem;
	}
	
	.navbar-nav .btn-link:hover,
	.navbar-nav .btn-link:focus {
		color: rgba(255, 255, 255, 0.75);
	}
	
	@media (max-width: 991px) {
		.navbar-nav .nav-link,
		.navbar-nav .dropdown-item {
			padding-left: 1rem;
			padding-right: 1rem;
		}
	}
</style>
