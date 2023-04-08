<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	export let open: boolean;
	import { basket } from '../stores';
	// @ts-ignore
	let basket_array;

	basket.subscribe((value) => {
		basket_array = value;
	});
</script>

<div
	class={`fixed right-0 bottom-0 top-0  z-40 bg-white border  ${
		open ? 'w-[30%] px-8' : 'w-0 opacity-0 '
	} transition-all duration-300 bg-gradient-to-br from-indigo-500 to-sky-500`}
>
	<div class="flex flex-col mt-16 gap-8">
		{#each basket_array as product}
			<div
				class="py-4 flex justify-evenly items-center border bg-[#ffffff7f] border-white rounded-xl"
			>
				<div class="flex">
					{product.name}
				</div>
				<div class="flex flex-col justify-center items-center">
					<div class="">
						{product.qty} QTY
					</div>
					${product.price / 100}
				</div>
				<div
					class="h-16 aspect-square overflow-hidden bg-[#ffffff7f] rounded-full flex justify-center items-center"
				>
					<img src={product.imgURL} />
				</div>
			</div>
		{/each}
	</div>
	<div class="">
		<button
			on:click={() => {
				goto('./checkout');
			}}
			class="border absolute bottom-4 left-4 right-4 border-white px-4 py-3 rounded-xl hover:bg-[#ffffff4b] text-white hover:text-black transition-all duration-300"
			>Checkout</button
		>
	</div>
</div>
