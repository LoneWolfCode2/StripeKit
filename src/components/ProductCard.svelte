<script>
	// @ts-nocheck

	import { fade } from 'svelte/transition';
	import FaShoppingBasket from 'svelte-icons/fa/FaShoppingBasket.svelte';
	export let product;

	let { images } = product;
	let index = 0;
	const next = () => {
		index = (index + 1) % images.length;
	};
	const prev = () => {
		index = (index - 1 + images.length) % images.length;
	};

	import { basket } from '../stores';
	let basket_array;

	basket.subscribe((value) => {
		basket_array = value;
	});

	async function addToBasket(productID) {
		basket.update((n) => {
			let i = basket_array.findIndex((e) => e.id === productID);
			if (i >= 0) {
				n[i].qty++;
			} else {
				n.push({
					name: product.name,
					id: productID,
					qty: 1,
					imgURL: product.images[0],
					price: product.default_price.unit_amount
				});
			}
			return n;
		});
		const updateInBasketInventory = await fetch('/api/add-to-basket', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ productID: productID })
		});
	}
</script>

<div
	in:fade
	out:fade
	class={`p-4 rounded-xl relative ${product.active ? 'bg-[#ffffff70]' : 'bg-[#042422d1]'}`}
>
	<div class="text-center">
		{product.name}
	</div>
	{#if !parseInt(product.metadata.available) > 0}
		<div class="bg-[#00000067] h-[300px] grid place-items-center text-red-600 font-bold">
			SOLD OUT
		</div>
	{:else}
		{#each [images[index]] as src (index)}
			<div class=" flex justify-center items-center min-h-[300px]">
				<img {src} alt="" />
			</div>
		{/each}
		<div class="flex justify-between">
			<button on:click={next}>Next</button>
			<button on:click={prev}>Prev</button>
		</div>
	{/if}
	<div class="flex justify-between pt-4">
		<div class="">${product.default_price.unit_amount / 100}</div>
		<button
			class="w-8 cursor-pointer"
			on:click={() => {
				addToBasket(product.id);
			}}
			disabled={!parseInt(product.metadata.available) > 0}
		>
			<FaShoppingBasket />
		</button>
	</div>
	{#if !product.active}
		<div
			class="text-3xl absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center rotate-45 text-red-500 font-bold"
		>
			DISABLED
		</div>
	{/if}
</div>

<style>
	img {
		position: relative;
	}
</style>
