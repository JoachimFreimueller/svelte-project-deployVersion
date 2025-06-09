    <script>

    let {productsWithButtons} = $props();

    let sum = $derived(productsWithButtons.reduce((prev, curr) =>prev + parseFloat(curr.product.price),0));

  function deleteProduct(item)
    {
        let index = productsWithButtons.indexOf(item);
        productsWithButtons.splice(index, 1);
        localStorage.setItem("storedProducts", JSON.stringify(productsWithButtons.map((x) => x.product)));
    }

    </script>
    
    <div class="p-8 bg-gray-50 min-h-screen">
        <h1 class="text-3xl font-bold mb-10 text-gray-800">
            🛒 Dein Warenkorb
        </h1>

        <ul class="space-y-6">
            {#each productsWithButtons as item}

                <li
                    class="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
                >
                    <div class="flex items-center gap-4 w-full sm:w-auto">
                        <img
                            src={item.product.image}
                            alt={item.product.title}
                            class="w-20 h-20 object-contain bg-gray-100 rounded-lg"
                        />
                        <div>
                            <h2 class="text-lg font-semibold text-gray-800">
                                {item.product.title}
                            </h2>
                           
                        </div>
                    </div>
                    	<div class="flex items-center gap-4">
						<p class="text-xl text-blue-600 font-bold">${item.product.price.toFixed(2)}</p>
						
						<!-- ✨ Stylischer Button -->
						<button
							onclick={() => deleteProduct(item)}
							class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow transition"
						>
							Entfernen
						</button>
					</div>

                </li>

            {/each}
        </ul>

           <!-- Summe -->
<div class="mt-10 flex justify-end">
	<div class="bg-white px-6 py-4 rounded-2xl shadow-md w-full sm:w-auto">
		<h2 class="text-xl font-semibold text-gray-800 mb-2">Gesamtsumme</h2>
		<p class="text-2xl font-bold text-green-600">${sum.toFixed(2)}</p>
	</div>
</div>

    </div>
