<script>
    import { onMount } from "svelte";
    import ProductsList from "../../Components/ProductsList.svelte";
    import { goto } from "$app/navigation";
 
    let productsWithButtons = $state([]);

    onMount(() => {
       const storedProducts =
            JSON.parse(localStorage.getItem("storedProducts")) || [];

        for(let i = 0; i < storedProducts.length; i++)
    {
        productsWithButtons.push({product: storedProducts[i], isDeleted: false});
    }

    });

</script>

<div class="p-6 bg-gray-50 min-h-screen">

	<button
		onclick={() => goto("../")}
		class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-md transition duration-300"
	>
		← Zurück zur Startseite
	</button>

    <br>

{#if productsWithButtons.length > 0}

 <ProductsList productsWithButtons = {productsWithButtons}/>

{:else}
    <p class="text-center text-gray-500 mt-20 text-lg">
        Dein Warenkorb ist leer.
    </p>
{/if}

</div>
