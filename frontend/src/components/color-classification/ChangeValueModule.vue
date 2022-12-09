<script setup>
    const props = defineProps({
        modelValue: {
            required: true,
            type: Number,
        },
        titleName: {
            required: true,
            type: String,
        },
    });
    const emit = defineEmits(['update:modelValue']);
    const updateModelValue = (value) => {
        emit('update:modelValue', props.modelValue + value);
    };
</script>

<template>
    <section class="flex gap-4 justify-center items-center">
        <div
            @click="updateModelValue(-5)"
            class="cursor-pointer aspect-square w-10 text-center bg-primary-red text-black p-2 rounded-sm">
            -5
        </div>
        <div
            @click="updateModelValue(-1)"
            class="cursor-pointer aspect-square w-10 text-center bg-primary-red text-black p-2 rounded-sm">
            -1
        </div>
        <div class="flex flex-col items-center w-2/12">
            <p class="text-xs text-gray-400">{{ props.titleName }}</p>
            <p class="" @change="emit('update:modelValue', $event.target.value)">
                {{ modelValue }}
            </p>
        </div>
        <div
            @click="updateModelValue(1)"
            class="cursor-pointer aspect-square w-10 text-center bg-primary-red text-black p-2 rounded-sm">
            +1
        </div>
        <div
            @click="updateModelValue(5)"
            class="cursor-pointer aspect-square w-10 text-center bg-primary-red text-black p-2 rounded-sm">
            +5
        </div>
    </section>
</template>
