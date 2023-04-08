<script>
	// @ts-nocheck
	import FaMinus from 'svelte-icons/fa/FaMinus.svelte';
	import FaPlus from 'svelte-icons/fa/FaPlus.svelte';

	let increaseAmt;
	let decreaseAmt;
	export let product;
	let { images } = product;
	let index = 0;
	const next = () => {
		index = (index + 1) % images.length;
	};
	const prev = () => {
		index = (index - 1 + images.length) % images.length;
	};

	async function increaseInventory() {
		if (!isFinite(increaseAmt)) return;
		let increase = await fetch('/api/update-dash-inventory', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ direction: 'increase', value: increaseAmt, id: product.id })
		});
		window.location.reload();
		//need to find a way to reload in the product data here
	}
	async function decreaseInventory() {
		if (!isFinite(decreaseAmt)) return;
		let decrease = await fetch('/api/update-dash-inventory', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ direction: 'decrease', value: decreaseAmt, id: product.id })
		});
		window.location.reload();
		//need to find a way to reload in the product data here
	}
</script>

<div class="p-4 my-2 rounded bg-[#33a8bdc9] border border-white flex justify-between text-right">
	<div class="min-w-[200px]">
		<div class="text-left">{product.name}</div>
		{#each [images[index]] as src (index)}
			<div class=" flex justify-center items-center min-h-[150px]">
				<img {src} alt="" class="h-[150px] max-w-[200px]" />
			</div>
		{/each}
		<div class="flex justify-between">
			<button on:click={next}>Next</button>
			<button on:click={prev}>Prev</button>
		</div>
	</div>
	<div class="flex flex-col justify-center text-center">
		<div>Available: {product.metadata.available}</div>
		<div>In a basket: {product.metadata.in_a_basket}</div>
		<div>Sold: {product.metadata.sold}</div>
		<div>Total Inventory: {product.metadata.total}</div>
	</div>
	<div class="flex flex-col justify-between">
		<div>
			<h1>Add inventory</h1>
			<div class="flex justify-between mx-4">
				<input
					type="number"
					class="p-2 my-2 text-right bg-[#2d48f77d] w-16 rounded"
					bind:value={increaseAmt}
				/>
				<button class="w-2" on:click={increaseInventory}><FaPlus /></button>
			</div>
		</div>
		<div class="text-left mt-4 mb-2">
			<h1>Remove inventory</h1>
			<div class="flex justify-between mx-4">
				<input
					type="number"
					class="p-2 my-2  text-right bg-[#2d48f77d] w-16 rounded"
					bind:value={decreaseAmt}
				/>
				<button class="w-2" on:click={decreaseInventory}><FaMinus /></button>
			</div>
		</div>
	</div>
</div>
