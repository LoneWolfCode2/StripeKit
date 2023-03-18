/**@type {import('./$types').PageLoad} */
export async function load({fetch, params}){
    const res = await fetch(`/api/list-all-products`);
    const products = await res.json();
    const productArray=await products.data;
    return {productArray}
}