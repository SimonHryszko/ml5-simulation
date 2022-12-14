<script setup>
    import BaseButton from '@/components/BaseButton.vue';
    import ColorGraph from '@/components/color-classification/ColorGraph.vue';
    import ModelParameters from '../components/color-classification/ModelParameters.vue';
    import { ref } from 'vue';

    const model = ref({
        epochs: 32,
        batchSize: 12,
    });
    const color = ref('#546384');
    const results = [
        { name: 'red', value: '#ff0000', percentage: 0.5 },
        { name: 'green', value: '#00ff00', percentage: 0.3 },
        { name: 'blue', value: '#0000ff', percentage: 0.2 },
    ];
    const colorPicker = ref('colorPicker');
    
    const selectColor = () => {
        colorPicker.value.click();
    };
</script>

<template>
    <section
        class="grid grid-cols-1 xl:grid-cols-12 p-4 h-full min-w-full flex-grow content-start pt-96 xl:pt-4"
        :style="{ backgroundColor: color }">
        <div class="flex flex-col gap-8 xl:col-start-1 xl:col-span-3 py-8">
            <!-- Parameters -->
            <ModelParameters v-model="model" :color="color" v-model:results="results" />

            <!-- Results -->
            <section class="bg-black rounded-md p-4 w-full h-full">
                <p>Results</p>

                <ColorGraph :results="results" />
            </section>
        </div>

        <section class="xl:block hidden p-8 xl:col-span-2 rounded-md">
            <div class="bg-black bg-opacity-25 p-2 text-xs">
                <p>
                    A color classifier is a tool or system that uses algorithms to identify and
                    classify colors. It may be a standalone program or part of a larger application,
                    and it typically uses a combination of machine learning and image processing
                    techniques to analyze and categorize colors. Color classifiers can be used in a
                    variety of applications, such as in image editing software to automatically sort
                    and organize images by color, or in manufacturing to ensure that products are
                    being made with the correct colors.
                </p>
            </div>
        </section>

        <section
            class="bg-black w-full rounded-md p-4 xl:col-start-11 flex flex-row gap-4 items-center justify-center xl:col-span-2 h-16">

            <div class="grid grid-cols-1 grid-rows-1 items-end">
                <BaseButton @click="selectColor" class="col-start-1 row-start-1 w-full">Change Color</BaseButton>
                <input v-model="color" class="z-[-20] col-start-1 row-start-1" type="color" ref="colorPicker">
            </div>
        </section>
    </section>
</template>
