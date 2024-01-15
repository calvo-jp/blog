<script lang="ts">
	import type {HTMLAttributes} from 'svelte/elements';
	import {twMerge} from 'tailwind-merge';

	let {
		class: className,
		children,
		...props
	} = $props<HTMLAttributes<HTMLDivElement>>();
</script>

<div
	role="group"
	class={twMerge(
		'flex flex-wrap',
		'[&_button:not(:first-child)]:rounded-l-none',
		'[&_button:not(:last-child)]:rounded-r-none',
		'[&_button:not(:last-child)]:border-r-0',
		className,
	)}
	{...props}
>
	{#if children}
		{@render children()}
	{/if}
</div>
