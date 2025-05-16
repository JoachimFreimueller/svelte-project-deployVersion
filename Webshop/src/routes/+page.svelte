<script>
    import { onMount } from "svelte";
    import Product from "../Components/Product.svelte";

    let products =$state([]);
    let filteredProducts = $state([]);
    let searchText = $state("");

        onMount(async () => {
        let response = await fetch("https://fakestoreapi.com/products");
        products = await response.json();
    });

    function filterProducts()
    {
        filteredProducts = products.filter((value) => value.title.toLowerCase().includes(searchText.toLowerCase()));
    }


</script>


<div class="p-8 bg-gray-50 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">🛒 Shopfner</h1>

    <input bind:value={searchText} on:input={() => filterProducts()}
    type="text"
    placeholder="Suche nach Produkten..."
    class="w-full sm:w-1/2 px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
  />
  
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {#if searchText == false}

        {#each products as product}
        <Product id = {product.id} title = {product.title} price = {product.price} description = {product.description} imageSource = {product.image} rating = {product.rating} category = {product.category}></Product>
        {/each} 

        {:else}
        {#each filteredProducts as product}
        <Product id = {product.id} title = {product.title} price = {product.price} description = {product.description} imageSource = {product.image} rating = {product.rating} category = {product.category}></Product>
        {/each}         
        {/if}
    
    </div>
</div>


