<script lang="ts">
	import {enhance} from '$app/forms';
	import Alert from '$lib/alert.svelte';
	import Button from '$lib/button.svelte';
	import Input from '$lib/input.svelte';
	import Textarea from '$lib/textarea.svelte';

	let {data, form} = $props();
</script>

<svelte:head>
	<title>Settings | Conduit</title>
</svelte:head>

<div class="mx-auto max-w-lg py-8">
	<h1 class="text-center text-4xl">Your Settings</h1>

	{#if form}
		{#if form.success}
			<Alert class="my-4">{form.message}</Alert>
		{:else}
			<Alert status="error" class="my-4">{form.message}</Alert>
		{/if}
	{/if}

	<form
		method="post"
		action="?/updateProfile"
		novalidate
		use:enhance
		class="mt-3 space-y-4"
	>
		<Input
			name="image"
			type="url"
			placeholder="URL of profile picture"
			value={data.user?.image}
		/>
		<Input
			size="lg"
			name="name"
			placeholder="Your name"
			value={data.user?.name}
		/>
		<Textarea
			size="lg"
			name="bio"
			placeholder="Short bio about you"
			rows={3}
			value={data.user?.bio}
		/>
		<Input
			size="lg"
			name="email"
			type="email"
			placeholder="Email"
			value={data.user?.email}
		/>
		<Input
			size="lg"
			name="password"
			type="password"
			placeholder="New Password"
		/>
		<div class="flex justify-end">
			<Button type="submit" size="lg">Update Settings</Button>
		</div>
	</form>
	<form
		method="post"
		action="?/logout"
		use:enhance
		class="mt-5 border-t border-neutral-200 pt-5"
	>
		<button
			type="submit"
			class="rounded border border-rose-500 px-4 py-2 text-rose-500 hover:bg-rose-50"
		>
			Or click here to logout.
		</button>
	</form>
</div>
