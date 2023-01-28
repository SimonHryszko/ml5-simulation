<script setup>
    import { ref } from 'vue';
    import { orderBy, _ } from 'lodash';

    const props = defineProps({
        modelValue: {
            required: true,
            type: Number,
        },
        titleName: {
            required: true,
            type: String,
        },
        values: {
            required: false,
            type: Array,
        },
    });

    // computed with parameter
    const values = ref(_.orderBy(props.values ?? [1, 5, 10]));
    const emit = defineEmits(['update:modelValue']);
    const updateModelValue = (value) => {
        emit('update:modelValue', props.modelValue + value);
    };
</script>

<template>
    <section class="flex gap-4 justify-center items-center">

        <div
            v-for="value in orderBy(props.values ?? [1, 5, 10], Array, 'desc')"
            @click="updateModelValue(value * -1)"
            :key="value + 'negative' + props.titleName"
            class="cursor-pointer aspect-square w-10 text-center bg-primary-red text-black p-2 rounded-sm">
            -{{ value }}
        </div>

        <div class="flex flex-col items-center w-2/12">
            <p class="text-xs text-gray-400">{{ props.titleName }}</p>
            <p>
                {{ modelValue }}
            </p>
        </div>

        <div
            v-for="value in orderBy(props.values ?? [1, 5, 10], Array, 'asc')"
            @click="updateModelValue(value)"
            :key="value + 'positive' + props.titleName"
            class="cursor-pointer aspect-square w-10 text-center bg-primary-red text-black p-2 rounded-sm">
            +{{ value }}
        </div>
    </section>
</template>
