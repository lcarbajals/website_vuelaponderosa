<template>
    <div class="section p-0">
		<div class="container text-center">
			<div class="w-100 max-w-500 d-inline-block mt-2 bg-white p-3 p-lg-5 rounded-xl shadow-xs">
                <h1 class="fw-bold">
                    <span class="d-block mb-4">Lo siento, esta página no existe!</span>
                </h1>
                <img class="opacity-6 max-w-450 img-fluid" src="/img/page_not_found_su7k.svg" alt="...">
            </div>    
		</div>
	</div>
</template>

<script>
    export default {
        name: 'Error404',
        mounted(){
            document.title = "Pagina no encontrada..!";
        },
    }
</script>