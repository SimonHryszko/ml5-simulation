<script setup>
    import { load, classify, result } from './model';
    import { getColor, CLASS, hexToRgb } from '../../helper';
    import { ref, computed, watch } from 'vue';
    import Chart from '../../components/Chart.vue';
import TopNavigation from '../../components/TopNavigation.vue';

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

  <TopNavigation/>

</template>
