<script setup>
    import { useRoute } from 'vue-router';
    import BaseButton from '@/components/BaseButton.vue';
    import { computed } from 'vue';

    // get route path
    const route = useRoute();

    // get route path
    const path = computed(() => route.path);

    const isLandingPage = computed(() => path.value == '/');
</script>

<template>
    <nav class="w-full items-center flex hover:cursor-pointer flex-row justify-between p-4 bg-black xl:px-16">
        <div @click="$router.push('/')" class="flex flex-col gap-1">
            <h1 class="text-2xl font-semibold">ML -5</h1>
            <p class="opacity-70 text-xs">By Simon Hryszko</p>
        </div>

        <div v-if="!isLandingPage" class="flex flex-row gap-4">
            <span
                @click="$router.push('/color-classification')"
                class="hover:underline hover:decoration-primary-blue hover:underline-offset-8">
                Color classification
            </span>
        </div>
    </nav>
</template>
