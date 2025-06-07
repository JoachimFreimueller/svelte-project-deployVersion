<script>
    import { onMount } from "svelte";

    let distinctProductsWithAmount = $state([]);

    onMount(() => {
        const storedProducts =
            JSON.parse(localStorage.getItem("storedProducts")) || [];

        if (storedProducts.length !== 0) {
            for (let i = 0; i < storedProducts.length; i++) {
                let existing = false;
                for (let j = 0; j < distinctProductsWithAmount.length; j++) {
                    if (
                        distinctProductsWithAmount[j].product.id ===
                        storedProducts[i].id
                    ) {
                        distinctProductsWithAmount[j].amount++;
                        existing = true;
                        break;
                    }
                }
                if (!existing) {
                    distinctProductsWithAmount.push({
                        product: storedProducts[i],
                        amount: 1,
                    });
                }
            }
        }
    });
</script>

{#if distinctProductsWithAmount.length > 0}
    <div class="p-8 bg-gray-50 min-h-screen">
        <h1 class="text-3xl font-bold mb-10 text-gray-800">
            🛒 Dein Warenkorb
        </h1>

        <ul class="space-y-6">
            {#each distinctProductsWithAmount as dpa}
                <li
                    class="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
                >
                    <div class="flex items-center gap-4 w-full sm:w-auto">
                        <img
                            src={dpa.product.image}
                            alt={dpa.product.title}
                            class="w-20 h-20 object-contain bg-gray-100 rounded-lg"
                        />
                        <div>
                            <h2 class="text-lg font-semibold text-gray-800">
                                {dpa.product.title}
                            </h2>
                            <p class="text-sm text-gray-500">
                                {dpa.amount} × ${dpa.product.price.toFixed(2)}
                            </p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-xl text-blue-600 font-bold">
                            ${(dpa.product.price * dpa.amount).toFixed(2)}
                        </p>
                    </div>
                </li>
            {/each}
        </ul>
    </div>
{:else}
    <p class="text-center text-gray-500 mt-20 text-lg">
        Dein Warenkorb ist leer.
    </p>
{/if}
