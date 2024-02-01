<script lang="ts">
	import {enhance} from '$app/forms';
	import Alert from '$lib/alert.svelte';
	import Button from '$lib/button.svelte';
	import Input from '$lib/input.svelte';

	let {form} = $props();
</script>

<svelte:head>
	<title>Sign Up | Conduit</title>
</svelte:head>

<div class="mx-auto max-w-lg px-4 py-8">
	<div class="text-center">
		<h1 class="text-4xl">Sign Up</h1>
		<a href="/login" class="text-emerald-500">Have an account?</a>
	</div>
	<div class="mt-3">
		{#if form && !form.success}
			<Alert status="error" class="mb-5">{form.message}</Alert>
		{/if}

		<form method="post" novalidate class="space-y-5" use:enhance>
			<Input size="lg" name="name" placeholder="Your Name" />
			<Input size="lg" name="email" type="email" placeholder="Email" />
			<Input size="lg" name="password" type="password" placeholder="Password" />
			<div class="flex justify-end">
				<Button size="lg" type="submit" class="w-32">Sign Up</Button>
			</div>
		</form>
	</div>
</div>
