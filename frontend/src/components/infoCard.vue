<script setup>

    const props = defineProps({
        titleName: {
            required: true,
            type: String,
        },
        description: {
            required: true,
            type: String,
        },
    });

</script>

<template>
    <section class="xl:block hidden p-8 rounded-md">
        <div class="bg-black bg-opacity-25 p-5 text-xs">
            <h3 class="text-lg font-semibold mb-1">{{props.titleName}}</h3>
            <hr class="opacity-50 mb-2">
            <p class="text-sm">
                {{props.description}}
            </p>
        </div>
    </section>
</template>