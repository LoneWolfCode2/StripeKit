<script>
	// @ts-nocheck

	import { supabaseClient } from '$lib/supabase';
	import { fade } from 'svelte/transition';
	$: productImageUrlArray = [];
	//expiramtental
	let input;
	let container;
	let image;
	let placeholder;
	let showImage = false;
	//expiramtental
	let prodImg1;
	let prodImg2;
	let prodImg3;
	let productName;
	let shippable = false;
	let weight;
	let height;
	let active = false;
	let description;
	let onHand;
	let available;
	let committed;
	let currency;
	let price;
	let taxBehavior;
	let statementDescriptor;
	let width;
	let length;

	let uploadToSB = async (prodImgArr) => {
		let img = prodImgArr[0];
		let random = Math.floor(Math.random() * 99999999999) + 1;
		const { error } = await supabaseClient.storage
			.from('productimages')
			.upload(`image${random}`, img);
		const { data } = supabaseClient.storage.from('productimages').getPublicUrl(`image${random}`);
		const { publicUrl } = data;
		if (error) {
			console.log(error);
		} else {
			productImageUrlArray.push(publicUrl);
			productImageUrlArray = productImageUrlArray;
		}
		console.log(productImageUrlArray);
	};
	let createProduct = async () => {
		fetch('api/create-a-product', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				productName: productName,
				active: active,
				description: description,
				onHand: onHand,
				available: available,
				committed: committed,
				currency: currency.toLowerCase(),
				price: price * 100,
				taxBehavior: taxBehavior,
				productImageUrlArray: productImageUrlArray,
				height: height,
				width: width,
				length: length,
				weight: weight,
				shippable: shippable,
				statementDescriptor: statementDescriptor
			})
		});
	};
	function onChange() {
		const file = input.files[0];
		if (file) {
			showImage = true;

			const reader = new FileReader();
			reader.addEventListener('load', function () {
				image.setAttribute('src', reader.result);
			});
			reader.readAsDataURL(file);

			return;
		}
		showImage = false;
	}
</script>

<div in:fade out:fade class="p-2 mt-8 rounded-xl">
	<div class="text-red-500 mb-2">*CANNOT BE CHANGED</div>
	<form on:submit|preventDefault={createProduct} class="grid md:grid-cols-12 gap-4">
		<div
			class="bg-[rgba(255,255,255,0.15)] backdrop-blur p-4 rounded border border-white col-span-4"
		>
			<h1 class="font-extrabold text-xl mb-4">Product Information</h1>

			<div class="flex flex-col justify-evenly">
				<div class="flex justify-between items-center">
					<label>Product Name</label>
					<input bind:value={productName} type="text" class="max-w-[50%]" />
				</div>
				<div class="flex justify-between items-center">
					<label>Active?</label>
					<input type="checkbox" bind:checked={active} />
				</div>
				<div class="flex justify-between items-center">
					<label>Description</label>
					<input type="text" bind:value={description} class="max-w-[50%]" />
				</div>
			</div>
		</div>
		<div
			class=" bg-[rgba(255,255,255,0.15)] backdrop-blur p-4 rounded border border-white col-span-4"
		>
			<h1 class="font-extrabold text-xl mb-4">Inventory</h1>
			<div class="mb-4 flex justify-between items-center">
				<label>onHand</label>
				<input type="number" min="0" bind:value={onHand} />
			</div>
			<div class="mb-4 flex justify-between items-center">
				<label>Available</label>
				<input type="number" bind:value={available} />
			</div>
			<div class="mb-4 flex justify-between items-center">
				<label>Committed</label>
				<input type="number" bind:value={committed} />
			</div>
		</div>
		<div
			class="bg-[rgba(255,255,255,0.15)] backdrop-blur p-4 rounded border border-white col-span-4"
		>
			<h1 class="font-extrabold text-xl mb-4">Pricing Information</h1>
			<div class="mb-4 flex justify-between items-center">
				<label>Currency (3-letter ISO)</label>
				<input
					type="text"
					placeholder="USD"
					minlength="3"
					maxlength="3"
					bind:value={currency}
					class="w-[25%]"
				/>
			</div>
			<div class="mb-4 flex justify-between items-center">
				<label>Price $</label>
				<input type="number" step="0.01" placeholder="0.00" min="0.00" bind:value={price} />
			</div>
			<div class="mb-4 flex justify-between items-center">
				<label>Tax Behavior </label>
				<div>
					<select name="tax_behavior" id="tax_behavior" required bind:value={taxBehavior}>
						<option value="inclusive">Inclusive</option>
						<option value="exclusive">Exclusive</option>
						<option value="unspecified">Unspecified</option>
					</select>
					<span class="text-red-500 font-bold">*</span>
				</div>
			</div>
			<div class="mb-4 flex justify-between items-center">
				<label>Statement Descriptor</label>
				<input type="text" bind:value={statementDescriptor} />
			</div>
		</div>
		<!-- PRICING GRID ITEMS -->
		<div
			class="bg-[rgba(255,255,255,0.15)] backdrop-blur w-full p-4 rounded border border-white col-span-6"
		>
			<h1 class="font-extrabold text-xl mb-4">
				Product Photos <span class="text-red-500">*</span>
			</h1>
			<div class="w-[50%]">
				<div class="mb-4 flex justify-between">
					<label class={`custom-file-upload ${prodImg1 ? 'bg-green-500' : null} `}>
						<input
							type="file"
							name="prod1"
							id="prod1"
							accept="image/*"
							bind:files={prodImg1}
							bind:this={input}
							on:change={() => {
								uploadToSB(prodImg1);
								onChange();
							}}
						/>
						UPLOAD
					</label>
				</div>
				<div class="mb-4">
					<label class={`custom-file-upload ${prodImg2 ? 'bg-green-500' : null} `}>
						<input
							type="file"
							name="prod1"
							id="prod1"
							accept="image/*"
							bind:files={prodImg2}
							on:change={uploadToSB(prodImg2)}
						/>
						UPLOAD
					</label>
				</div>
				<div class="mb-4">
					<label class={`custom-file-upload ${prodImg3 ? 'bg-green-500' : null} `}>
						<input
							type="file"
							name="prod1"
							id="prod1"
							accept="image/*"
							bind:files={prodImg3}
							on:change={uploadToSB(prodImg3)}
						/>
						UPLOAD
					</label>
				</div>
			</div>
			<div class="flex gap-1">
				{#each productImageUrlArray as image}
					<img src={image} alt="" class="w-1/3" />
				{/each}
			</div>
		</div>
		<!-- SHIPPING GRID ITEM -->
		<div
			class="bg-[rgba(255,255,255,0.15)] backdrop-blur p-4 rounded border border-white col-span-6"
		>
			<h1 class="font-extrabold text-xl mb-4">Shipping</h1>
			<div class="flex justify-between mb-4">
				<label>Height (in)</label>
				<input type="number" bind:value={height} />
			</div>
			<div class="flex justify-between mb-4">
				<label>Width (in)</label>
				<input type="number" bind:value={width} />
			</div>
			<div class="flex justify-between mb-4">
				<label>Length (in)</label>
				<input type="number" bind:value={length} />
			</div>
			<div class="flex justify-between mb-4">
				<label>Weight (oz)</label>
				<input type="number" bind:value={weight} />
			</div>
			<div class="flex justify-between">
				<label>Shippable?</label>
				<input type="checkbox" bind:checked={shippable} />
			</div>
		</div>
		<!-- CREATE BUTTON -->
		<div class="flex justify-center items-center col-span-12">
			<button
				type="submit"
				class="px-6 py-2 text-sm transition-colors duration-300 rounded-full shadow-xl text-emerald-100 bg-emerald-500 hover:bg-emerald-600 shadow-emerald-400/30"
				>Create</button
			>
		</div>
	</form>
</div>

<style>
	input::file-selector-button {
		color: dodgerblue;
		padding: 0.5rem;
		border-radius: 0.75rem;
		backdrop-filter: blur;
		background-color: rgba(255, 255, 255, 0.15);
		border-color: white;
	}
	input {
		padding: 0.3rem 0.7rem;
		border-radius: 0.75rem;
	}
	input[type='file'] {
		display: none;
	}
	.custom-file-upload {
		border: 1px solid #ccc;
		display: inline-block;
		padding: 6px 12px;
		cursor: pointer;
	}
</style>
