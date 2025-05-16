<script>

    let {id, title, price, description, imageSource, rating, category} = $props();

</script>


<div class="max-w-sm rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300 m-4 cursor-pointer">
    <img class="w-full h-48 object-contain p-4" src={imageSource} alt={title} />
    <div class="p-4 flex flex-col justify-between h-60">
        <div>
            <h2 class="text-xl font-semibold text-gray-800 truncate">{title}</h2>
            <p class="text-gray-600 text-sm mt-1 line-clamp-3">{description}</p>
        </div>
        <div class="mt-4 flex justify-between items-center">
            <span class="text-lg font-bold text-gray-800">${price}</span>
            <span class="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{category}</span>
        </div>
    </div>
</div>