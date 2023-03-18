// @ts-nocheck
/** @type {import('./$types').RequestHandler} */
import Stripe from 'stripe';
const stripe = new Stripe(
	'sk_test_51JnRvABq6A81Gm86E8pVhcJKrCa8ttRIav6immgWAJwp1Cvj0UegXSnh3g6UrKu4nmrNZewSJuLaww1FE26qUtd000TMp6Ijld'
);

export async function GET({request}) {
    const products = await stripe.products.list({
        expand: ["data.default_price"],
      });

    return new Response(JSON.stringify({ data:products.data}), { status: 200 });
}