<script>
    import { onMount } from "svelte";
    import Product from "../Components/Product.svelte";
    import { goto } from "$app/navigation";

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

    function goToCart() {
		goto("/Cart");
	}


</script>

<!-- Header mit Button oben rechts -->


<div class="p-8 bg-gray-50 min-h-screen">

<div class="flex justify-between items-center mb-6 w-full">
	<h1 class="text-3xl font-bold text-gray-800">🛒 Shopfner</h1>
	<button
		onclick={() => (goToCart())}
		class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-md transition"
	>
		<span>Warenkorb</span>
	</button>
</div>



    <input bind:value={searchText} oninput={() => filterProducts()}
    type="text"
    placeholder="Suche nach Produkten..."
    class="w-full sm:w-1/2 px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
  />
  
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {#if searchText == false}

        {#each products as product}
        <Product id = {product.id} title = {product.title} price = {product.price} description = {product.description} imageSource = {product.image} rating = {product.rating} category = {product.category} product = {product}></Product>
        {/each} 

        {:else}
        {#each filteredProducts as product}
        <Product id = {product.id} title = {product.title} price = {product.price} description = {product.description} imageSource = {product.image} rating = {product.rating} category = {product.category} product = {product}></Product>
        {/each}         
        {/if}
    
    </div>
</div>


