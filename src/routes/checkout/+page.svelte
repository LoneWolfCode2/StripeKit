<script>
	import { basket } from '../../stores';
	import { goto } from '$app/navigation';
	import { loadStripe } from '@stripe/stripe-js';
	import { Elements, PaymentElement, LinkAuthenticationElement, Address } from 'svelte-stripe';
	import { onMount } from 'svelte';
	export let data;
	let elements;
	let processing = false;
	let error = null;
	let basket_array;
	let clientSecret = data.data;

	basket.subscribe((value) => {
		basket_array = value;
	});

	let stripe = null;

	onMount(async () => {
		stripe = await loadStripe(
			'pk_test_51JnRvABq6A81Gm86wtF7mnmLYB5WtOcqRo259wi7WtcR7t9S53HIibEPRY6QXaD0891UxUDB0ZxEzcrzvyG4Pt9u00Sg99Kfhj'
		);
	});

	async function submit() {
		// avoid processing duplicates
		if (processing) return;
		processing = true;
		// confirm payment with stripe
		const result = await stripe.confirmPayment({
			elements,
			redirect: 'if_required'
		});
		// log results, for debugging
		console.log({ result });
		if (result.error) {
			// payment failed, notify user
			error = result.error;
			processing = false;
		} else {
			// payment succeeded, redirect to "thank you" page
			goto('/examples/payment-element/thanks');
		}
	}
</script>

<div class="h-screen bg-gradient-to-br from-[#06beb6] to-[#48b1bf]">
	<div class="container max-w-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto py-8">
		{#each basket_array as product}
			<div class="py-4 flex justify-evenly items-center border border-white rounded-xl">
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
					class="h-16 aspect-square overflow-hidden border border-white rounded-full flex justify-center items-center"
				>
					<img src={product.imgURL} />
				</div>
			</div>
		{/each}
	</div>
	<div class="container max-w-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto">
		<h1>Checkout!</h1>
		{#if stripe}
			<Elements {stripe} {clientSecret} bind:elements>
				<form on:submit|preventDefault={submit}>
					<LinkAuthenticationElement />
					<PaymentElement />
					<Address mode="billing" />

					<button disabled={processing}>
						{#if processing}
							Processing...
						{:else}
							Pay
						{/if}
					</button>
				</form>
			</Elements>
		{/if}
	</div>
</div>
