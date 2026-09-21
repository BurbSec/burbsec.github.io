<script>
	import Icon from '$lib/components/Icon.svelte';
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Page Not Found | Burbsec</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="error-page container text-center py-5">
	<div class="row justify-content-center">
		<div class="col-lg-6">
			<h1 class="display-1 fw-bold mb-3">{page.status}</h1>
			<h2 class="mb-4">
				{#if page.status === 404}
					Page Not Found
				{:else}
					Something Went Wrong
				{/if}
			</h2>
			<p class="lead mb-4">
				{#if page.status === 404}
					Ope! We're really sorry about this. You went looking for a page and we
					just don't have it. That's on us.
					<br /><br />
					Can we get you a beer while we figure out where it went?
				{:else if page.error?.message}
					{page.error.message}
				{:else}
					An unexpected error occurred. Please try again later.
				{/if}
			</p>
			<div class="d-flex justify-content-center">
				<a href="/" class="btn btn-primary btn-lg">
					{#if page.status === 404}
						WELP, it's about time we headed home
					{:else}
						Back to Home
					{/if}
				</a>
			</div>
		</div>
	</div>
</div>
