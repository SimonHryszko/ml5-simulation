<script setup>
    import { load, classify, result } from './model';
    import { getColor, CLASS, hexToRgb } from '../../helper';
    import { ref, computed, watch } from 'vue';
    import Chart from '../../components/Chart.vue';

    const trainingOptions = ref({ epochs: 32, batchSize: 6 });
    const color = ref('#ffffff');

    const loadModel = () => {
        load({
            epochs: parseInt(trainingOptions.value.epochs),
            batchSize: parseInt(trainingOptions.value.batchSize),
        }, hexToRgb(color.value));
    };
    loadModel(color.value);

    const res = computed(() => {
        if (result.value.length > 0) return result.value[0].label;
        else return 'No data!';
    });
    watch(color, () => {
        classify(hexToRgb(color.value));
    })
</script>
<template>
    <div class="h-screen fixed top-0 inset-x-0">
        <div class="h-1/6 w-screen bg-zinc-900 relative">
            <!-- TOP -->
            <div class="bg-zinc-900 rounded-md p-2 absolute z-10 -bottom-3 right-3 mr-10 w-3/12">
                <!-- RIGHT BOTTOMS -->
                <div class="flex space-x-3 p-2">
                    <button class="w-1/2 text-center text-black rounded-lg p-3 bg-rose-500">
                        Pick from file
                    </button>
                    <button class="w-1/2 text-center text-black rounded-lg p-3 bg-rose-500">
                        Change color
                    </button>
                </div>
                <!-- END RIGHT BOTTOMS -->
            </div>
            <!-- END TOP -->
        </div>
        <div class="h-5/6 w-screen bg-green-900 relative">
            <!-- BOTTOM -->
            <input
                class="right-5 absolute top-4"
                type="color"
                v-model="color"
                name="color" />
            <div class="right-[10rem] absolute top-4">
                {{ color }}
            </div>

            <div class="absolute -top-7 space-y-3 left-7 mr-10 w-2/12">
                <!-- LEFT WHOLE PANEL -->
                <div class="flex flex-col bg-zinc-900 rounded-lg pl-4 p-4">
                    <!-- TOP BOX FROM LEFT PANEL -->
                    <span class="text-lg text-zinc-300 font-semibold">Parameters</span>
                    <div class="flex flex-col space-y-1 text-neutral-300 mb-2">
                        <!-- SLIDER -->
                        <span>Epochs:</span>
                        <div class="flex space-x-3 justify-center">
                            <input
                                type="range"
                                :min="1"
                                v-model="trainingOptions.epochs"
                                :max="256"
                                class="w-10/12 bg-gray-200 rounded-lg cursor-pointer" />
                            <span>{{ trainingOptions.epochs }}</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6 text-rose-500">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                        </div>
                        <!-- END SLIDER -->
                        <!-- SLIDER -->
                        <span>Batch size:</span>
                        <div class="flex space-x-3 justify-center">
                            <input
                                type="range"
                                v-model="trainingOptions.batchSize"
                                :min="1"
                                :max="256"
                                class="w-10/12 bg-gray-200 rounded-lg cursor-pointer" />
                            <span>{{ trainingOptions.batchSize }}</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6 text-rose-500">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                        </div>
                        <!-- END SLIDER -->
                        <button
                            @click="loadModel"
                            class="text-center text-black rounded-lg p-3 bg-rose-500">
                            Reteach model!
                        </button>
                    </div>
                    <!-- END TOP BOX FROM LEFT PANEL -->
                </div>
                <div class="flex flex-col space-y-3 bg-zinc-900 rounded-lg pl-4 p-4">
                    <!-- BOTTOM BOX FROM LEFT PANEL -->
                    <div class="flex flex-col">
                        <!-- COLOR RESULT -->
                        <span class="text-lg text-zinc-300 font-semibold">Result</span>
                        <div class="flex items-center space-x-3">
                            <div
                                :style="`background-color: ${color};`"
                                class="w-20 h-20 rounded-lg"></div>
                            <span class="font-semibold">{{ res }}</span>
                        </div>
                        <!-- END COLOR RESULT -->
                    </div>
                    <div class="flex flex-col">
                        <!-- CHART -->
                        <span class="text-lg text-zinc-300 font-semibold">Graph</span>
                        <Chart :data="result" />
                        <!-- END CHART -->
                    </div>
                    <!-- END BOTTOM BOX FROM LEFT PANEL -->
                </div>

                <!-- END LEFT WHOLE PANEL -->
            </div>
            <!-- END BOTTOM -->
        </div>
    </div>
</template>
