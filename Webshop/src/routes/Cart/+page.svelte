<script>
    import { onMount } from "svelte";
    import ProductsList from "../../Components/ProductsList.svelte";
    import { goto } from "$app/navigation";
    import { base } from "$app/paths";

    let productsWithButtons = $state([]);
    let isProcessing = $state(false);
    let paymentMethod = $state("paypal");

    // Berechnet die Gesamtsumme aller Produkte im Warenkorb
    const totalAmount = $derived(
        productsWithButtons
            .filter(p => !p.isDeleted)
            .reduce((sum, item) => sum + (item.product.price || 0), 0)
            .toFixed(2)
    );

    onMount(() => {
        const storedProducts = JSON.parse(localStorage.getItem("storedProducts")) || [];
        productsWithButtons = storedProducts.map(p => ({
            product: p,
            isDeleted: false,
        }));
    });

    async function handlePayment() {
        if (productsWithButtons.length === 0) return;
        isProcessing = true;

        if (paymentMethod === "paypal") {
            // ECHTE WEITERLEITUNG
            // Ersetze 'DEIN_PAYPAL_NAME' durch deinen echten PayPal.me Namen
            const paypalMeName = "JoachimFreimueller"; 
            const paypalUrl = `https://www.paypal.com/paypalme/${paypalMeName}/${totalAmount}EUR`;
            
            alert(`Du wirst nun zu PayPal weitergeleitet, um ${totalAmount}€ zu zahlen.`);
            
            // Warenkorb leeren
            localStorage.removeItem("storedProducts");
            
            // Weiterleitung
            window.location.href = paypalUrl;
        } else {
            // ÜBERWEISUNG
            alert(`Bestellung erfolgreich!\n\nBitte überweise ${totalAmount}€ auf folgendes Konto:\nIBAN: DE12 3456 7890 ...\nVerwendungszweck: Bestellung_${Date.now()}`);
            
            localStorage.removeItem("storedProducts");
            productsWithButtons = [];
            isProcessing = false;
            goto(base);
        }
    }
</script>

<div class="p-6 bg-gray-50 min-h-screen">
    <button
        onclick={() => goto(`${base}/`)}
        class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-md transition duration-300"
    >
        ← Zurück zur Startseite
    </button>

    <br />

    {#if productsWithButtons.length > 0}
        <ProductsList {productsWithButtons} />

        <div class="mt-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-bold">Gesamtsumme:</h2>
                <span class="text-2xl font-black text-blue-600">{totalAmount} €</span>
            </div>

            <h3 class="text-gray-600 font-medium mb-3">Bezahlmethode wählen</h3>
            
            <div class="flex flex-col gap-3">
                <label class="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-gray-50 {paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : ''}">
                    <input type="radio" name="payment" value="paypal" bind:group={paymentMethod} class="w-4 h-4" />
                    <div class="flex flex-col">
                        <span class="font-bold text-blue-800">PayPal</span>
                        <span class="text-xs text-gray-500">Sofortige Zahlung via PayPal.me</span>
                    </div>
                </label>
<!--  <label class="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-gray-50 {paymentMethod === 'bank' ? 'border-blue-500 bg-blue-50' : ''}">
                    <input type="radio" name="payment" value="bank" bind:group={paymentMethod} class="w-4 h-4" />
                    <div class="flex flex-col">
                        <span class="font-bold">Banküberweisung</span>
                        <span class="text-xs text-gray-500">Manuelle Überweisung (Vorkasse)</span>
                    </div>
                </label>-->
              
            </div>

            <button
                onclick={handlePayment}
                disabled={isProcessing}
                class="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition duration-300 disabled:opacity-50"
            >
                {#if isProcessing}
                    Verarbeitung...
                {:else}
                    {paymentMethod === 'paypal' ? 'Mit PayPal bezahlen' : 'Bestellung abschließen'}
                {/if}
            </button>
        </div>
    {:else}
        <div class="text-center mt-20">
            <p class="text-gray-500 text-lg">Dein Warenkorb ist leer.</p>
            <button onclick={() => goto(base)} class="mt-4 text-blue-600 underline">Jetzt shoppen</button>
        </div>
    {/if}
</div>