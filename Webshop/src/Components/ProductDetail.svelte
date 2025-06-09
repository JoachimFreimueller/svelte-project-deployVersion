	<script>
    import { goto } from "$app/navigation";


        let {product} = $props();
        let showDialog = $state(false);

        function addToCart() {


        let storedProducts = [];
        const stored = localStorage.getItem('storedProducts');
		if (stored) {
			storedProducts = JSON.parse(stored);
		}

        storedProducts.push(product);
        localStorage.setItem('storedProducts', JSON.stringify(storedProducts))

		showDialog = true;
    	}

    </script>
    
    
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

    {#if showDialog}
	<div class="fixed inset-0 flex items-center justify-center z-50">
		<div class="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-sm text-center">
			<h2 class="text-lg font-semibold text-gray-800 mb-2">✔️ Produkt hinzugefügt!</h2>
			<p class="text-gray-600 mb-4">„{product.title}“ wurde erfolgreich zum Warenkorb hinzugefügt.</p>
			<button
				onclick={() => goto("../")}
				class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
			>
				Zurück zum Shop
			</button>
		</div>
	</div>
{/if}
