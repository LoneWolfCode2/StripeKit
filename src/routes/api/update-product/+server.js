/** @type {import('../create-a-product/$types').RequestHandler} */
import Stripe from 'stripe';
import { PRIVATE_STRIPE_SECRET_KEY } from '$env/static/private';
// @ts-ignore
const stripe = new Stripe(PRIVATE_STRIPE_SECRET_KEY);

export async function POST({ request }) {
	const body = await request.json();

	let { id, productUpdate, priceChangeDetected } = body;

	let blob = {};
	if (priceChangeDetected) {
		const newPrice = await stripe.prices.create({
			product: id,
			unit_amount: parseFloat(productUpdate.default_price.unit_amount_decimal) * 100,
			currency: productUpdate.default_price.currency
		});
		const newPriceID = await newPrice;
		blob = {
			active: productUpdate.active,
			default_price: newPriceID.id,
			description: productUpdate.description,
			metadata: productUpdate.metadata,
			name: productUpdate.name,
			images: productUpdate.images,
			package_dimensions: productUpdate.package_dimensions,
			shippable: productUpdate.shippable,
			statement_descriptor: productUpdate.statement_descriptor
		};
	} else {
		blob = {
			active: productUpdate.active,
			description: productUpdate.description,
			metadata: productUpdate.metadata,
			name: productUpdate.name,
			images: productUpdate.images,
			package_dimensions: productUpdate.package_dimensions,
			shippable: productUpdate.shippable,
			statement_descriptor: productUpdate.statement_descriptor
		};
	}
	const product = await stripe.products.update(id, blob);

	//   res.send(product); update response to avoid harder debugging in future
	return new Response(null, { status: 200 });
}
