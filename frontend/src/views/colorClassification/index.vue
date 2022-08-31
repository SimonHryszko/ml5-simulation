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
    const data = computed(() => {
        let labels = [];
        let datasets = [
            {
                data: [],
                backgroundColor: [],
            },
        ];
        let backgroundColor = [];

        result.value.map((item) => {
            labels.push(item.label);
            datasets[0].data.push((item.confidence * 100).toFixed(2));
            datasets[0].backgroundColor.push(getColor(item.label));
        });

        return {
            labels,
            datasets,
        };
    });

    load();
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
    <div class="my-5">
        <div class="flex space-x-2 items-center justify-center mb-5">
            <p>Choose your color</p>
            <input type="color" name="color" value="#e66465" @change="colorChanged" />
        </div>
        <Bar v-if="result.length > 0" :chart-data="data" />
        <p v-else class="text-2xl font-mono font-semibold italic">Choose color to see chart!</p>
    </div>
</template>
