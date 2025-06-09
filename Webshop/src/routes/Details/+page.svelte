
<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import ProductDetail from "../../Components/ProductDetail.svelte";

    let product = $state("");

onMount(() => {
		const stored = localStorage.getItem('selectedProduct');
		if (stored) {
			product = JSON.parse(stored);
		}
	});


 
    function goHome()
    {
        goto("../");
    }

</script>

<button
	onclick={() => goHome()}
	class="mt-8 ml-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl shadow-md transition duration-300"
>
	← Zurück zur Startseite
</button>



{#if product}
	<ProductDetail product = {product}/>
{:else}
	<p class="text-center mt-20 text-gray-500 text-lg">Kein Produkt gefunden. Bitte über die Übersichtseite ein Produkt auswählen.</p>
{/if}