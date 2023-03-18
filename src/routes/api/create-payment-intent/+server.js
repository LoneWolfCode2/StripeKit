// @ts-nocheck
/** @type {import('./$types').RequestHandler} */
import Stripe from 'stripe';
const stripe = new Stripe(
	'sk_test_51JnRvABq6A81Gm86E8pVhcJKrCa8ttRIav6immgWAJwp1Cvj0UegXSnh3g6UrKu4nmrNZewSJuLaww1FE26qUtd000TMp6Ijld'
);


export async function POST({ request }) {
	const body = await request.json();
	let { basket_array } = body;
    let purifyItem = async(item) => {
        let verifyProduct = await stripe.products.retrieve(item.id, {expand: ["default_price"]});
        item.price =  await verifyProduct.default_price.unit_amount;
        return item
    }
    function calculateTotal(basket_array) {
        let total = basket_array.reduce((n, { price, qty }) => n + price * qty, 0);
        return total;
    }
	// simulate maliscous code price change ==> basket_array[0].price = 20021455;
	//   console.log('bad array',basket_array);
	    for( const item of basket_array){
	        let ip = await purifyItem(item);
	    }

	const paymentIntent = await stripe.paymentIntents.create({
		amount: calculateTotal(basket_array),
		currency: 'usd',
		automatic_payment_methods: {
			enabled: true
		}
	});
	return new Response(JSON.stringify({ data: paymentIntent.client_secret}), { status: 200 });
}
