<script setup>
    import { load, classify, result } from './model';
    import { getColor } from '../../helper';
    import { ref, computed } from 'vue';
    import { Bar } from 'vue-chartjs';
    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        BarElement,
        CategoryScale,
        LinearScale,
    } from 'chart.js';

    ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale);
    const trainingOptions = ref({ epochs: 1, batchSize: 12 });
    const data = computed(() => {
        let labels = [];
        let datasets = [
            {
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1,
            },
        ];
        let backgroundColor = [];

        result.value.slice(0, 15).map((item) => {
            let val = (item.confidence * 100).toFixed(0);
            val = val < 1 ? 1 : val;

            labels.push(item.label);
            datasets[0].data.push(val);
            datasets[0].backgroundColor.push(
                getColor({
                    name: item.label,
                    transparency: 0.3,
                }),
            );
            datasets[0].borderColor.push(
                getColor({
                    name: item.label,
                }),
            );
        });

        return {
            labels,
            datasets,
        };
    });

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
    const options = {
        responsive: true,
        aspectRatio: 3 / 1,
        scales: {
            y: {
                ticks: {
                    color: '#fff',
                    callback: function (value, index, ticks) {
                        return `${value}%`;
                    },
                },
            },
            x: {
                ticks: {
                    color: '#fff',
                },
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        if (context.parsed.y == 1) return '<n1%';
                        else return `${context.parsed.y}%`;
                    },
                },
            },
        },
    };
</script>
<template>
    <div class="my-5">
        <div class="flex space-x-2 items-center justify-center mb-5">
            <p>Choose your color</p>
            <input type="color" name="color" @change="colorChanged" />
        </div>
        <Bar v-if="result.length > 0" :chart-data="data" :chart-options="options" />
        <p v-else class="text-2xl font-mono font-semibold italic">Choose color to see chart!</p>
    </div>
</template>
