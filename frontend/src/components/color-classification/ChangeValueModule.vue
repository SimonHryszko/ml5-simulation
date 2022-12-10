<script setup>
    import { ref } from 'vue';
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

    const values = ref(props.values ?? [1, 5, 10]);
    const emit = defineEmits(['update:modelValue']);
    const updateModelValue = (value) => {
        emit('update:modelValue', props.modelValue + value);
    };
</script>

<template>
    <section class="flex gap-4 justify-center items-center">
        <div
            v-for="value in values.sort((a, b) => b - a)"
            @click="updateModelValue(value * -1)"
            class="cursor-pointer aspect-square w-10 text-center bg-primary-red text-black p-2 rounded-sm">
            {{ value * -1 }}
        </div>

        <div class="flex flex-col items-center w-2/12">
            <p class="text-xs text-gray-400">{{ props.titleName }}</p>
            <p class="" @change="emit('update:modelValue', $event.target.value)">
                {{ modelValue }}
            </p>
        </div>

        <div
            v-for="value in values.sort((b, a) => b - a)"
            @click="updateModelValue(value)"
            class="cursor-pointer aspect-square w-10 text-center bg-primary-red text-black p-2 rounded-sm">
            +{{ value }}
        </div>
    </section>
</template>
