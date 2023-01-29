<script setup>
    import { Bar } from 'vue-chartjs';
    import { computed } from 'vue';
    import { getColor } from '@/helper.js';
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

    const props = defineProps({
        data: Array,
    });
    const options = {
        responsive: true,
        aspectRatio: 1,
        indexAxis: 'y',
        scales: {
            y: {
                ticks: {
                    color: '#fff',
                    callback: function (value, index, ticks) {
                        return `${data.value.datasets[0].data[index]}%`;
                    },
                },
                position: 'right',
            },
            x: {
                ticks: {
                    display: false,
                },
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        if (context.parsed.x == 1) return '< 1%';
                        else return `${context.parsed.x}%`;
                    },
                },
            },
        },
    };
    const data = computed(() => {
        let labels = [];
        let datasets = [
            {
                axis: 'y',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1,
            },
        ];
        let backgroundColor = [];

        props.data.slice(0, 10).map((item) => {
            let val = ((item.confidence || item.value) * 100).toFixed(0);
            val = val < 1 ? 1 : val;

            labels.push(item.label);
            datasets[0].data.push(val);
            datasets[0].backgroundColor.push(
                getColor({
                    name: item.label,
                    transparency: 0.3,
                }) || 'rgba(255, 83, 83, 0.3)',
            );
            datasets[0].borderColor.push(
                getColor({
                    name: item.label,
                }) || 'rgba(255, 83, 83, 1)'
            );
        });

        return {
            labels,
            datasets,
        };
    });
</script>

<template>
    <div>
        <Bar :chart-data="data" :chart-options="options" />
    </div>
</template>
