<script>
    import { onMount } from "svelte";
    import Product from "../Components/Product.svelte";
    import { goto } from "$app/navigation";

    let products =$state([]);
    let filteredProducts = $state([]);
    let searchText = $state("");
    let categories = $state([]);
    let selectedCategories = $state([]);

    let errorMessage = "Die Produkte konnten nicht geladen werden. Bitte versuche es später erneut.";
    let errorOccured = $state(false);

      	onMount(async () => {
		try {
			const response = await fetch("https://fakestoreapi.com/products");
			if (!response.ok) {
				throw new Error(`Fehler beim Laden der Produkte: ${response.status}`);
			}

			products = await response.json();

			for (let i = 0; i < products.length; i++) {
				if (!categories.includes(products[i].category)) {
					categories.push(products[i].category);
				}
			}
		} catch (error) {
			
            errorOccured = true;
			console.error(error);
		}
	});


    function filterProducts()
    {

        filteredProducts = products.filter((value) => {

            if(selectedCategories.length === 0)
            {
                 if(value.title.toLowerCase().includes(searchText.toLowerCase()))
                 {
                    return true;
                 }
            }
            else{

                if(searchText == false)
            {
                 if(selectedCategories.includes(value.category))
                {
                    return true;
                }
            }
            else
            {

                 if(value.title.toLowerCase().includes(searchText.toLowerCase()) && selectedCategories.includes(value.category))
                {
                    return true;
                }
            }

            }   
            return false;
         
        });
    }

    function goToCart() {
		goto("/Cart");
	}

    function categorySelected(selectedCategory)
    {
        if(selectedCategories.includes(selectedCategory))
        {
            let indexToRemove = selectedCategories.indexOf(selectedCategory);
            selectedCategories.splice(indexToRemove, 1);
        }
        else
        {
            selectedCategories.push(selectedCategory);
        }

        filterProducts();
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

  {#each categories as category}
     	<button
			onclick={() => categorySelected(category)}
			class={`px-4 py-2 rounded-full text-sm font-medium shadow-sm transition 
                ${
					selectedCategories.includes(category)
						? "bg-blue-600 text-white"
						: "bg-gray-200 text-gray-800 hover:bg-blue-100"
				}`}
		>
			{category}
		</button>
  {/each}
  
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {#if searchText == false}

        {#if selectedCategories.length > 0}
             
           {#each filteredProducts as product}
        <Product id = {product.id} title = {product.title} price = {product.price} description = {product.description} imageSource = {product.image} rating = {product.rating} category = {product.category} product = {product}></Product>
        {/each}  

        {:else}
         {#each products as product}
            <Product id = {product.id} title = {product.title} price = {product.price} description = {product.description} imageSource = {product.image} rating = {product.rating} category = {product.category} product = {product}></Product>
            {/each} 

        {/if}

        {:else}
        {#each filteredProducts as product}
        <Product id = {product.id} title = {product.title} price = {product.price} description = {product.description} imageSource = {product.image} rating = {product.rating} category = {product.category} product = {product}></Product>
        {/each}         
        {/if}
    
    </div>

    <br>

    {#if errorOccured}
    <div class="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl mb-6 text-sm sm:text-base shadow-sm">
        <strong class="font-semibold">Fehler:</strong> {errorMessage}
    </div>
{/if}

</div>


