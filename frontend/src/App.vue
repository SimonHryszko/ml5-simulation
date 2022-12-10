<script setup>
    import Preview from './components/Preview.vue';
    import TopNavigation from '@/components/TopNavigation.vue';

    const isPreview = import.meta.env.VITE_PREVIEW;
</script>

<template>
    <main class="bg-black-dark w-screen min-h-screen flex flex-col">
        <Preview v-if="isPreview" />

        <TopNavigation />
        <router-view></router-view>
    </main>
</template>
