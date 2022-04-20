<script setup>
</script>

<template>
	<main class="flex flex-col items-center mt-10">
		<!-- MENU -->
		<ul class="flex border-b">
			<li v-for="route in $router.options.routes" :key="route.path" class="-mb-px mr-1">
					<router-link 
						:to="route.path" 
						active-class="text-blue-700 hover:text-blue-900 border-l border-t border-r rounded-t" 
						class="bg-white inline-block py-2 px-4 font-semibold text-blue-500 hover:text-blue-800" >
						{{ route.name }}
					</router-link >
			</li>
		</ul>

		<!-- content -->
		<router-view class="mt-5"></router-view>
	</main>
</template>