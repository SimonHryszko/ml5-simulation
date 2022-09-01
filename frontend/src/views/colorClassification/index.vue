<script setup>
    import { load, classify, result } from './model';
    import { getColor, CLASS } from '../../helper';
    import { ref, computed } from 'vue';
    import Chart from '../../components/Chart.vue';

    const trainingOptions = ref({ epochs: 64, batchSize: 6 });

    const loadModel = () => {
        load({
            epochs: parseInt(trainingOptions.value.epochs),
            batchSize: parseInt(trainingOptions.value.batchSize),
        });
    };
    loadModel();

    const colorChanged = (e) => {
        const input = {
            r: parseInt(e.target.value.substring(1, 3), 16),
            g: parseInt(e.target.value.substring(3, 5), 16),
            b: parseInt(e.target.value.substring(5, 7), 16),
        };

        classify(input);
    };
</script>
<template>
    <div>
        <div class="flex flex-col justify-between space-y-4 w-screen">
            <div :class="CLASS.CORE.LAYOUT.WRAPPER">
                <div :class="CLASS.CORE.LAYOUT.BOX" class="md:w-4/12">
                    <div class="flex justify-center items-center p-3 space-x-5">
                        <span>epochs:</span>
                        <input
                            type="range"
                            v-model="trainingOptions.epochs"
                            :min="1"
                            :max="256"
                            class="w-11/12 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                        <span>{{ trainingOptions.epochs }}</span>
                    </div>
                    <div class="flex justify-center items-center p-3 space-x-5">
                        <span>batchSize:</span>
                        <input
                            type="range"
                            v-model="trainingOptions.batchSize"
                            :min="1"
                            :max="48"
                            class="w-11/12 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                        <span>{{ trainingOptions.batchSize }}</span>
                    </div>
                    <div class="flex justify-center items-center">
                        <button
                            @click="loadModel"
                            class="text-center items-center text-teal-400 font-bold rounded py-2 hover:w-11/12 hover:rounded-xl ease-in-out duration-500 w-10/12 focus:outline-none bg-teal-900 border-2 border-teal-400">
                            Reload model
                        </button>
                    </div>
                </div>
                <div :class="CLASS.CORE.LAYOUT.BOX" class="md:w-6/12">
                    <div class="flex items-center justify-center p-2 text-lg space-x-3">
                        <p>Choose your favorite color</p>
                        <input type="color" name="color" @change="colorChanged" />
                    </div>
                </div>
            </div>

            <div :class="CLASS.CORE.LAYOUT.WRAPPER">
                <div :class="CLASS.CORE.LAYOUT.BOX">
                    <div v-if="result.length > 0">
                        <div class="text-center p-1">
                            <p class="text-lg">
                                Your color looks like
                                <span class="font-semibold underline">{{ result[0].label }}</span>
                            </p>
                        </div>
                        <Chart :data="result" />
                    </div>
                    <div v-else class="text-center text-xl font-mono leading-10">
                        <p class="text-2xl font-semibold">No data!</p>
                        <p>Here you will see beautiful chart!</p>
                        <p>But first you can choose color from picker or image (top right)</p>
                        <p>Also feel free to experiment with model setting on top left</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
