<script lang="ts">
	import Input from '$lib/input.svelte';
	import {uniqBy} from '$lib/unique-by';
	import XIcon from '$lib/x-icon.svelte';

	interface Props {
		name?: string;
		value: string[];
		onchange(value: string[]): void;
	}

	let {name, value, onchange} = $props<Props>();

	let inputValue = $state('');
	let inputValid = $derived(inputValue.trim().length > 1);
</script>

<div>
	<Input
		value={inputValue}
		oninput={(e) => {
			inputValue = e.currentTarget.value;
		}}
		placeholder="Enter tags"
		onkeydown={(e) => {
			if (!inputValid) return;

			if (e.key === 'Enter') {
				e.preventDefault();
				e.currentTarget.focus();

				const v = inputValue;
				const l = uniqBy([...value, v], (t) => t.toLowerCase());

				onchange?.(l);
				inputValue = '';
			}
		}}
	/>

	{#if value.length > 0}
		<ul class="mt-2 flex flex-wrap items-center gap-1">
			{#each value as tag (tag)}
				<li
					class="flex items-center gap-1 rounded-full bg-gray-600 px-2 py-1 text-white"
				>
					<span class="text-sm leading-none">{tag}</span>
					<button
						type="button"
						class="flex"
						onclick={() => {
							const c = [...value];
							const l = c.filter((i) => i !== tag);

							onchange(l);
						}}
					>
						<XIcon class="h-3 w-3" />
					</button>
				</li>
			{/each}
		</ul>
	{/if}

	<input {name} type="hidden" value={value.join()} />
</div>
