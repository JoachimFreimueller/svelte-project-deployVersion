
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

<button onclick={() => goHome()}
	class="mt-8 ml-4 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-xl shadow-sm transition duration-300">
	<span>Zurück zur Startseite</span>
</button>


{#if product}
	<ProductDetail product = {product}/>
{:else}
	<p class="text-center mt-20 text-gray-500 text-lg">Kein Produkt gefunden. Bitte über die Übersichtseite ein Produkt auswählen.</p>
{/if}