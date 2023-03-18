<script>
	import { fade } from 'svelte/transition';
	let priceChangeDetected = false;
	export let productSelected;

	let { images } = productSelected;
	let index = 0;
	const next = () => {
		index = (index + 1) % images.length;
	};
	const prev = () => {
		index = (index - 1 + images.length) % images.length;
	};

	let updateProduct = async () => {
		let res = fetch('api/update-product', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: productSelected.id,
				productUpdate: productSelected,
				priceChangeDetected: priceChangeDetected
			})
		});
	};
	let deleteProduct = async () => {
		productSelected.active = !productSelected.active;
		updateProduct();
	};
</script>

<div
	in:fade={{ delay: 400 }}
	out:fade
	class="px-6 py-2 bg-gradient-to-tr from-[#000428] to-[#004e92] rounded-xl text-white "
>
	<div class="text-center">
		{productSelected.name}
	</div>
	<div class="grid grid-cols-3 gap-4 p-2">
		{#each [images[index]] as src (index)}
			<img {src} alt="" />
		{/each}
		<div class="flex justify-between absolute left-8 w-[17rem]">
			<button on:click={next}>Next</button>
			<button on:click={prev}>Prev</button>
		</div>
		<div class="flex gap-4 items-center py-2">
			<label>Name</label>
			<input type="text" name="" id="" bind:value={productSelected.name} />
		</div>
		<div class="flex flex-col justify-center gap-4 items-center py-2">
			<label class="font-bold">Price</label>
			<input
				type="number"
				step="0.01"
				on:change={() => {
					priceChangeDetected = true;
				}}
				bind:value={productSelected.default_price.unit_amount_decimal}
			/>
			<label class="font-bold">Currency (3-Letter ISO)</label>
			<input type="text" value={productSelected.default_price.currency} />
		</div>
		<div class="flex flex-col justify-center gap-4 items-center py-2">
			<label class="font-bold">Description</label>
			<input type="text" bind:value={productSelected.description} />
		</div>
		<!-- images -->
		<div class="py-2">
			<div class="font-bold text-center mb-4">Inventory</div>
			<div class="flex items-center justify-between">
				<div>on hand</div>
				<input type="number" class="w-1/4 mb-2" bind:value={productSelected.metadata.onHand} />
			</div>
			<div class="flex items-center justify-between">
				<div>committed</div>
				<input type="number" class="w-1/4 mb-2" bind:value={productSelected.metadata.committed} />
			</div>
			<div class="flex items-center justify-between">
				<div>Available</div>
				<input type="number" class="w-1/4 mb-2" bind:value={productSelected.metadata.available} />
			</div>
		</div>
		<div class="py-2">
			<div class="font-bold text-center">Dimensions</div>
			<div class="flex  items-center justify-between">
				<div class="">Height</div>
				<input
					type="number"
					class="w-1/4 mb-2"
					bind:value={productSelected.package_dimensions.height}
				/>
			</div>
			<div class="flex items-center justify-between">
				<div class="">Width</div>
				<input
					type="number"
					class="w-1/4 mb-2"
					bind:value={productSelected.package_dimensions.width}
				/>
			</div>
			<div class="flex items-center justify-between">
				<div class="">Length</div>
				<input
					type="number"
					class="w-1/4 mb-2"
					bind:value={productSelected.package_dimensions.length}
				/>
			</div>
			<div class="flex items-center justify-between">
				<div class="">Weight</div>
				<input
					type="number"
					class="w-1/4 mb-2"
					bind:value={productSelected.package_dimensions.weight}
				/>
			</div>
			<div class="flex items-center justify-between">
				<div class="">Shippable?</div>
				<input
					type="checkbox"
					name=""
					id=""
					class="w-1/4 mb-2"
					bind:checked={productSelected.shippable}
				/>
			</div>
		</div>
		<div class="py-2 flex flex-col justify-center items-center">
			<div class="font-bold text-center mb-4">Statement Descriptor</div>
			<input type="text" value={productSelected.statement_descriptor} />
		</div>
		<div class="flex flex-col items-center justify-center gap-8">
			<button
				on:click={updateProduct}
				class="px-6 py-2 text-sm text-blue-100 transition-colors duration-300 bg-blue-500 rounded-full shadow-xl hover:bg-blue-600 shadow-blue-400/30"
				>Update</button
			>
			{#if !productSelected.active}
				<button
					on:click={deleteProduct}
					class="px-6 py-2 text-sm text-red-100 transition-colors duration-300 bg-red-500 rounded-full shadow-xl hover:bg-red-600 shadow-red-400/30"
					>Re-activeate</button
				>
			{:else}
				<button
					on:click={deleteProduct}
					class="px-6 py-2 text-sm text-red-100 transition-colors duration-300 bg-red-500 rounded-full shadow-xl hover:bg-red-600 shadow-red-400/30"
					>Delete</button
				>
			{/if}
		</div>
	</div>
</div>

<style>
	img {
		position: relative;
	}
	input {
		border: 1px solid blueviolet;
		padding: 0.3rem 0.7rem;
		border-radius: 0.5rem;
		color: black;
	}
</style>
