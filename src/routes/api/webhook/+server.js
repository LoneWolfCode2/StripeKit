// @ts-nocheck
/** @type {import('./$types').RequestHandler} */
import Stripe from 'stripe';
import { supabaseClient } from '$lib/supabase';
import { PRIVATE_STRIPE_SECRET_KEY, PRIVATE_STRIPE_SIGNING_SECRET } from '$env/static/private';
// @ts-ignore
const stripe = new Stripe(PRIVATE_STRIPE_SECRET_KEY);

const endpointSecret = PRIVATE_STRIPE_SIGNING_SECRET;
export async function POST({ request }) {
	let body = await request.text();
	const sig = request.headers.get('stripe-signature');
	let event;
	try {
		event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
	} catch (err) {
		console.log(err.message);
		return new Response({ error: `Webhook Error: ${err.message}` }, { status: 400 });
	}
	switch (event.type) {
		case 'payment_intent.succeeded':
			const paymentIntentSucceeded = event.data.object;
			let { metadata, id } = paymentIntentSucceeded;
			console.log('Payment Intent succ ', paymentIntentSucceeded);
			if (metadata.order) {
				let order = JSON.parse(metadata.order);
				//update database with order information
				const { data, error } = await supabaseClient.from('orders').insert([
					{
						metadata: JSON.stringify(order),
						shipping: JSON.stringify(paymentIntentSucceeded.shipping)
					}
				]);
				//update stripe inventory metadata
				order.forEach(async (item) => {
					let { qty, id } = item;
					let currentItemData = await stripe.products.retrieve(id);
					let cuSold = currentItemData.metadata.sold;
					let cuTotal = currentItemData.metadata.total;
					let cuInABasket = currentItemData.metadata.in_a_basket;
					const updateProduct = await stripe.products.update(id, {
						metadata: {
							sold: parseInt(cuSold) + parseInt(qty),
							in_a_basket: parseInt(cuInABasket) - parseInt(qty),
							available: parseInt(cuTotal) - (parseInt(cuSold) + parseInt(qty))
						}
					});
				});
			}
			return new Response({ message: 'event successful' }, { status: 200 });
			break;
		// ... handle other event types
		case 'charge.succeeded':
			console.log('charge.succeeded event triggered');
			return new Response({ message: 'event success' }, { status: 200 });
			break;
		default:
			console.log(`Unhandled event type ${event.type}`);
			return new Response({ message: 'event success' }, { status: 200 });
	}
}
