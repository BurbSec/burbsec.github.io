<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Page Not Found | Burbsec</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="container text-center py-5">
	<div class="row justify-content-center">
		<div class="col-lg-6">
			<h1 class="display-1 fw-bold mb-3">{$page.status}</h1>
			<h2 class="mb-4">
				{#if $page.status === 404}
					Page Not Found
				{:else}
					Something Went Wrong
				{/if}
			</h2>
			<p class="lead mb-4">
				{#if $page.error?.message}
					{$page.error.message}
				{:else if $page.status === 404}
					The page you're looking for doesn't exist or has been moved.
				{:else}
					An unexpected error occurred. Please try again later.
				{/if}
			</p>
			<div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
				<a href="/" class="btn btn-primary btn-lg">
					<i class="fa-solid fa-house"></i> Back to Home
				</a>
				<a href="https://tinyurl.com/burbchat" class="btn btn-outline-light btn-lg" target="_blank" rel="noopener noreferrer">
					<i class="fa-brands fa-discord"></i> Get Help on Discord
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	.display-1 {
		font-size: 8rem;
		opacity: 0.3;
	}

	@media (max-width: 576px) {
		.display-1 {
			font-size: 5rem;
		}
	}
</style>
