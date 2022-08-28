<script setup>
    const isPreview = import.meta.env.VITE_PREVIEW;
</script>

<template>
    <main class="flex flex-col items-center mt-10">
        <div
            v-if="isPreview"
            class="corner w-0 h-0 right-0 top-0 absolute border-l-[150px] border-l-transparent border-solid border-t-[150px] border-t-cyan-700">
            <span
                class="absolute block -top-28 -left-24 text-center rotate-45 w-16 text-xl font-mono"
                title="This is pull request preview!">
                Preview</span
            >
        </div>

        <!-- MENU -->
        <ul class="flex border-b">
            <li v-for="route in $router.options.routes" :key="route.path" class="-mb-px mr-1">
                <router-link
                    :to="route.path"
                    active-class="text-blue-700 hover:text-blue-900 border-l border-t border-r rounded-t"
                    class="bg-white inline-block py-2 px-4 font-semibold text-blue-500 hover:text-blue-800">
                    {{ route.name }}
                </router-link>
            </li>
        </ul>

        <!-- content -->
        <router-view class="mt-5"></router-view>
    </main>
</template>
