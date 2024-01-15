<script lang="ts">
	import Button from '$lib/button.svelte';
	import Input from '$lib/input.svelte';
</script>

<svelte:head>
	<title>Sign In | Conduit</title>
</svelte:head>

<div class="mx-auto max-w-lg px-4 py-8">
	<div class="text-center">
		<h1 class="text-4xl">Sign In</h1>
		<a href="/register" class="text-emerald-500">Need an account?</a>
	</div>
	<div class="mt-3">
		<form class="space-y-5" noValidate>
			<Input size="lg" type="email" placeholder="Email" />
			<Input size="lg" type="password" placeholder="Password" />
			<div class="flex justify-end">
				<Button size="lg" type="submit" class="w-32">Sign In</Button>
			</div>
		</form>
	</div>
</div>
