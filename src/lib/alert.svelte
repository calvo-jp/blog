<script lang="ts">
	import type {HTMLAttributes} from 'svelte/elements';
	import {twMerge} from 'tailwind-merge';
	import CheckCircleIcon from './check-circle-icon.svelte';
	import ExclamationCircleIcon from './exclamation-circle-icon.svelte';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		status?: 'error' | 'success';
	}

	let {
		status = 'success',
		children,
		class: className,
		...props
	} = $props<Props>();
</script>

<div
	role="alert"
	class={twMerge(
		'flex items-center gap-2 rounded p-4 leading-none',
		status === 'error' && 'bg-red-50 text-red-600',
		status === 'success' && 'bg-green-50 text-green-600',
		className,
	)}
	{...props}
>
	{#if status === 'error'}
		<CheckCircleIcon class="h-5 w-5" />
	{:else}
		<ExclamationCircleIcon class="h-5 w-5" />
	{/if}

	{#if children}
		{@render children()}
	{/if}
</div>
