<script lang="ts">
	import Button from '$lib/button.svelte';
	import Input from '$lib/input.svelte';
	import Textarea from '$lib/textarea.svelte';
</script>

<svelte:head>
	<title>Settings | Conduit</title>
</svelte:head>

<div class="mx-auto max-w-lg py-8">
	<h1 class="text-center text-4xl">Your Settings</h1>
	<form class="mt-3 space-y-4">
		<Input type="url" placeholder="URL of profile picture" />
		<Input size="lg" placeholder="Your name" />
		<Textarea size="lg" placeholder="Short bio about you" rows={3} />
		<Input size="lg" type="email" placeholder="Email" />
		<Input size="lg" type="password" placeholder="New Password" />
		<div class="flex justify-end">
			<Button type="submit" size="lg">Update Settings</Button>
		</div>
	</form>
</div>
