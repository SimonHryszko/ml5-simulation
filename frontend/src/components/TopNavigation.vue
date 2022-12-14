<script setup>

// vue compisiont api get route path
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'

// get route path
const route = useRoute()

// get route path
const path = route.path

const isLandingPage = computed(() => path === '/')

</script>

<template>
    <nav class="w-full flex flex-row justify-between p-4 bg-black xl:px-16">
        <div class="flex flex-col gap-1">
            <h1 class="text-2xl font-semibold">ML -5</h1>
            <p class="opacity-70 text-xs">By Simon Hryszko</p>
        </div>

        <div v-if="!isLandingPage" class="flex flex-row gap-4">
            <BaseButton>Color</BaseButton>
            <BaseButton>Color</BaseButton>
            <BaseButton>Color</BaseButton>
        </div>
    </nav>
</template>
