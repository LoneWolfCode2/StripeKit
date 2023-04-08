// @ts-nocheck
/** @type {import('./$types').RequestHandler} */
import Stripe from 'stripe';
import { PRIVATE_STRIPE_SECRET_KEY } from '$env/static/private';
const stripe = new Stripe(PRIVATE_STRIPE_SECRET_KEY);

export async function POST({ request }) {
	const body = await request.json();
	let { basket_array } = body;
	let purifyItem = async (item) => {
		let verifyProduct = await stripe.products.retrieve(item.id, { expand: ['default_price'] });
		item.price = await verifyProduct.default_price.unit_amount;
		return item;
	};
	function calculateTotal(basket_array) {
		let total = basket_array.reduce((n, { price, qty }) => n + price * qty, 0);
		return total;
	}
	// simulate maliscous code price change ==> basket_array[0].price = 20021455;
	//   console.log('bad array',basket_array);
	for (const item of basket_array) {
		let ip = await purifyItem(item);
	}

	const paymentIntent = await stripe.paymentIntents.create({
		amount: calculateTotal(basket_array),
		currency: 'usd',
		automatic_payment_methods: {
			enabled: true
		},
		metadata: { order: JSON.stringify(basket_array) }
	});

	return new Response(JSON.stringify({ data: paymentIntent }), { status: 200 });
}
