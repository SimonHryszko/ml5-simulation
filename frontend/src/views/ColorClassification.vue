<script setup>
    import BaseButton from '@/components/BaseButton.vue';
    import Chart from '@/components/color-classification/Chart.vue';
    import ModelParameters from '../components/color-classification/ModelParameters.vue';
    import ml5 from 'ml5';
    import { ref, onMounted, watch } from 'vue';
    import { hexToRgb } from '@/helper.js';
    import data from '@/Models/color-classification/data.json';

    const model = ref({
        epochs: 32,
        batchSize: 12,
    });

    const color = ref('#' + Math.floor(Math.random() * 16777215).toString(16));
    const colorPicker = ref('colorPicker');
    const selectColor = () => {
        colorPicker.value.click();
    };

    const modelReady = ref(false);
    const nnOptions = {
        task: 'classification',
        debug: false,
    };
    let nn;

    // ---- Callbacks ----
    function finishedTraining() {
        modelReady.value = true;
        console.log('finished training');
    }

    function gotResults(error, r) {
        if (error) {
            console.error(error);
            return;
        }
        results.value = r;
    }

    // ---- Methods ----
    const prepareModel = () => {
        modelReady.value = false;
        nn = ml5.neuralNetwork(nnOptions);

        data.forEach((item) => {
            nn.addData(
                {
                    r: item.r,
                    g: item.g,
                    b: item.b,
                },
                {
                    color: item.color,
                },
            );
        });

        nn.normalizeData();
        nn.train(model.value, finishedTraining);
    };

    const predictColor = (hex) => {
        const rgb = hexToRgb(hex);
        nn.classify(
            {
                r: rgb.r,
                g: rgb.g, // may just be rgb
                b: rgb.b,
            },
            gotResults,
        );
    };

    // ---- Other ----
    const results = ref([]);

    onMounted(() => {
        prepareModel();
    });
    watch(
        () => color.value,
        (newColor) => {
            predictColor(newColor);
        },
    );
</script>

<template>
    <section
        class="grid grid-cols-1 xl:grid-cols-12 p-4 h-full min-w-full flex-grow content-start pt-96 xl:pt-4"
        :style="{ backgroundColor: color }">
        <div class="flex flex-col gap-8 xl:col-start-1 xl:col-span-3 py-8">
            <!-- Parameters -->
            <ModelParameters :readiness="modelReady" @confirmRetrain="prepareModel" v-model="model" :color="color" v-model:results="results" />

            <!-- Results -->
            <section :class="{'invisible': (results.length == 0)}" class="bg-black rounded-md p-4 w-full h-full">
                <p>Results</p>
                <Chart :data="results" />
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
                <BaseButton
                    :disabled="!modelReady"
                    @click="selectColor"
                    class="col-start-1 row-start-1 w-full"
                    >Change Color</BaseButton
                >
                <input
                    v-model="color"
                    class="z-[-20] col-start-1 row-start-1"
                    type="color"
                    ref="colorPicker" />
            </div>
        </section>
    </section>
</template>
