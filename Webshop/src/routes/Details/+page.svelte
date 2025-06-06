
<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let product = "";

onMount(() => {
		const stored = localStorage.getItem('selectedProduct');
		if (stored) {
			product = JSON.parse(stored);
		}
	});


    function addToCart() {


        let storedProducts = [];
        const stored = localStorage.getItem('storedProducts');
		if (stored) {
			storedProducts = JSON.parse(stored);
		}

        storedProducts.push(product);
        localStorage.setItem('storedProducts', JSON.stringify(storedProducts))

		alert(`${product.title} wurde zum Warenkorb hinzugefügt.`);

        goto("../");
	}

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
	<div class="max-w-5xl mx-auto mt-10 bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row transition-all duration-300">
		<!-- Bild -->
		<div class="md:w-1/2 bg-gray-100 flex items-center justify-center p-6">
			<img src={product.image} alt={product.title} class="object-contain h-80 w-full" />
		</div>

		<!-- Details -->
		<div class="md:w-1/2 p-8 flex flex-col justify-between">
			<div>
				<h1 class="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
				<p class="text-gray-600 text-base mb-6">{product.description}</p>

				<div class="flex flex-wrap items-center gap-4 mb-6">
					<span class="text-2xl font-semibold text-blue-600">${product.price}</span>
					<span class="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{product.category}</span>
					<span class="text-yellow-500">⭐ {product.rating?.rate ?? '–'} ({product.rating?.count ?? 0})</span>
				</div>
			</div>

			<!-- Button -->
			<button
				onclick={() => addToCart()}
				class="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-300"
			>
				In den Warenkorb
			</button>
		</div>
	</div>
{:else}
	<p class="text-center mt-20 text-gray-500 text-lg">Kein Produkt gefunden. Bitte über die Übersichtseite ein Produkt auswählen.</p>
{/if}