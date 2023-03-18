<script>
	import { goto } from "$app/navigation";
	import { fade } from "svelte/transition";
    export let open = false;
    import { basket } from '../stores'
    let basket_array; 

    basket.subscribe((value) => {
        basket_array = value
    })
</script>
<div in:fade out:fade class={`fixed right-0 bottom-0 top-0 px-8 z-50 bg-white  ${open ? '' : 'translate-x-[330px]'} transition-all duration-300 bg-gradient-to-br from-indigo-500 to-sky-500`}>
    <div class="w-64 flex justify-end">
        <div on:click={()=> open=!open} class="font-bold text-3xl cursor-pointer">X</div>
    </div>
    <div class="flex flex-col gap-8">
        {#each basket_array as product}
        <div class="py-4 flex justify-evenly items-center border border-white rounded-xl">
            <div class="flex">
                {product.name}
            </div>
            <div class="flex flex-col justify-center items-center">
                <div class="">
                    {product.qty} QTY
                </div>
                ${product.price/100}
            </div>
            <div class="h-16 aspect-square overflow-hidden border border-white rounded-full flex justify-center items-center">
                <img src={product.imgURL}/>
            </div>
        </div>
    {/each}
    </div>
    <div class="">
        <button on:click={()=>{open=false; goto('./checkout')}} class='border absolute bottom-4 left-4 right-4 border-white px-4 py-3 rounded-xl hover:bg-[#ffffff4b] text-white hover:text-black transition-all duration-300'>Checkout</button>
    </div>
</div>