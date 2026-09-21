<script>
	import Icon from '$lib/components/Icon.svelte';
</script>

<footer class="bg-dark text-light py-4 mt-5">
	<div class="container">
		<div class="row align-items-center">
			<div class="col-md-6">
				<p class="h5 mb-1">BurbSec Network</p>
				<p class="mb-0">The World's Most Fun Information Security Meetup Network</p>
			</div>
			<div class="col-md-6">
				<div class="d-flex flex-column flex-md-row gap-2 gap-md-4 justify-content-md-end justify-content-start mt-3 mt-md-0">
					<a href="/calendar/burbsec.ics" class="text-light" download aria-label="Download all BurbSec meetups as a calendar file">
						<Icon name="calendar" /> Add all meetups to calendar
					</a>
					<a href="https://github.com/BurbSec/burbsec.github.io" class="text-light" target="_blank" rel="noopener noreferrer" aria-label="BurbSec source code on GitHub">
						<Icon name="github" /> Repo on GitHub
					</a>
				</div>
			</div>
		</div>
		<hr class="my-3">
		<div class="row">
			<div class="col-12 text-center">
				<p class="mb-0">&copy; {new Date().getFullYear()} BurbSec Network. All rights reserved.</p>
			</div>
		</div>
	</div>
</footer>
