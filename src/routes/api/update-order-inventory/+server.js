/** @type {import('./$types').RequestHandler} */
import Stripe from 'stripe';
import { PRIVATE_STRIPE_SECRET_KEY } from '$env/static/private';
// @ts-ignore
const stripe = new Stripe(PRIVATE_STRIPE_SECRET_KEY);
//if client closes browser to exit the checkout => lead to items 'stuck' in basket state
export async function POST({ request }) {
	let { paymentIntentId } = await request.json();
	let paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
	let { metadata, status } = paymentIntent;

	if (metadata.order && status !== 'succeeded') {
		let order = JSON.parse(metadata.order);

		order.forEach(async (item) => {
			let { qty, id } = item;
			let currentItemData = await stripe.products.retrieve(id);
			let { sold: cuSold, total: cuTotal, in_a_basket: cuInABasket } = currentItemData.metadata;
			const updateProduct = await stripe.products.update(id, {
				metadata: {
					// sold: no change
					in_a_basket: parseInt(cuInABasket) - parseInt(qty),
					available: parseInt(cuTotal) - (parseInt(cuSold) + parseInt(cuInABasket) - parseInt(qty))
				}
			});
		});
	}
	if (status !== 'succeeded') {
		const cancelIntent = await stripe.paymentIntents.cancel(paymentIntentId, {
			cancellation_reason: 'abandoned'
		});
	}
	return new Response('ok', { status: 200 });
}
