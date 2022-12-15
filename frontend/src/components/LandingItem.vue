<script setup>
import BaseButton from '@/components/BaseButton.vue';

    
    const props = defineProps({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },

        // This is a color of component branding (background, button, etc.)
        colorClass: {
            type: String,
            required: false,
        },


    });
</script>

<template>
    <section class="p-6 rounded-md w-full xl:max-w-xs flex flex-col gap-4 bg-black">
        <div class="flex flex-row items-center gap-4">
            <div
                class="h-14 w-14 rounded-md bg-primary-red flex flex-col items-center justify-center" :class="props.colorClass">
                <slot></slot>
            </div>

            <h2 class="font-medium text-xl">{{props.title}}</h2>
        </div>

        <div class="w-full h-px bg-black-dark rounded-full"></div>

        <p class="text-white opacity-70 text-xs">
            {{props.description}}
        </p>

        <div class="w-full h-px bg-black-dark rounded-full"></div>

        <BaseButton :class="props.colorClass"> Get Started</BaseButton>
    </section>
</template>
