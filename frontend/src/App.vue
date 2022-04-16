<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
	<div v-for="route in $router.options.routes" :key="route.path">
		<router-link :to="route.path" active-class="text-green-500 underline-primary-color" 
		class="hover:text-primary-color py-4 px-2 text-gray-500 font-semibold transition duration-300" >
			{{ route.name }}
		</router-link >

		  <h1 class="text-3xl font-bold underline text-red-600">
    Hello world!
  </h1>
	</div>
  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
