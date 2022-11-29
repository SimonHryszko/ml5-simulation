<script setup>
    const props = defineProps({
        results: {
            type: Array,
            required: true,
        },
    });
</script>

<template>
    <section class="flex flex-col gap-4 w-full">
        <div
            v-for="result in results"
            :key="result"
            class="flex flex-row justify-end rounded-md px-4 py-1"
            :style="{ backgroundColor: result.value, width: result.percentage * 100 + '%' }">
            <p class="text-sm">{{ result.name }}</p>
        </div>
    </section>
</template>
