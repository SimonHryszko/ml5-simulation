<script setup>
    import Preview from './components/Preview.vue';
    import TopNavigation from '@/components/TopNavigation.vue';

    const isPreview = import.meta.env.VITE_PREVIEW;
</script>

<template>
    <main class="bg-black-dark w-screen min-h-screen flex flex-col">
        <Preview v-if="isPreview" />

        <!-- MENU -->
        <!-- <ul class="flex border-b"> -->
            <!-- <li v-for="route in $router.options.routes" :key="route.path" class="-mb-px mr-1"> -->
                <!-- <router-link
                    :to="route.path"
                    active-class="text-blue-700 hover:text-blue-900 border-l border-t border-r rounded-t"
                    class="bg-white inline-block py-2 px-4 font-semibold text-blue-500 hover:text-blue-800">
                    {{ route.name }}
                </router-link> -->
            <!-- </li>
        </ul> -->

        <!-- content -->
        <TopNavigation />
        <router-view></router-view>
    </main>
</template>
