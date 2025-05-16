<script>
    import { onMount } from "svelte";
    import Product from "../Components/Product.svelte";

    let products =$state([]);

        onMount(async () => {
        let response = await fetch("https://fakestoreapi.com/products");
        products = await response.json();
        let i = 0;

    });


  

</script>


<div class="p-8 bg-gray-50 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">🛒 Unser Shop</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {#each products as product}
        <Product id = {product.id} title = {product.title} price = {product.price} description = {product.description} imageSource = {product.image} rating = {product.rating} category = {product.category}></Product>
    {/each} 
    
    </div>
</div>


