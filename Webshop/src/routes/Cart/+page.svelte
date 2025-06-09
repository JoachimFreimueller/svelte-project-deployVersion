<script>
    import { onMount } from "svelte";
    import ProductsList from "../../Components/ProductsList.svelte";
 
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

{#if productsWithButtons.length > 0}

 <ProductsList productsWithButtons = {productsWithButtons}/>

{:else}
    <p class="text-center text-gray-500 mt-20 text-lg">
        Dein Warenkorb ist leer.
    </p>
{/if}
