<script setup>
    import ChangeValueModule from './ChangeValueModule.vue';
    import { ref } from 'vue';
    
    const emit = defineEmits(['update:modelValue']);

    const props = defineProps({
        modelValue: {
            required: true,
            type: Object,
        },
    });

    const test = ref(3);
</script>

<template>
    <section class="flex flex-col gap-4 bg-black rounded-md p-4 w-full h-full z-10">
        <p>Parameters</p>

        <ChangeValueModule titleName="Epochs" v-model="modelValue.epochs"/>
        <ChangeValueModule titleName="Batch size" v-model="modelValue.batchSize"/>

    </section>
</template>
