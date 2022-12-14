<script setup>
    import ChangeValueModule from './ChangeValueModule.vue';
    import { ref, onMounted } from 'vue';
    import BaseButton from '@/components/BaseButton.vue';
    import data from '@/Models/color-classification/data.json';
    import ml5 from 'ml5';

    const busy = ref(true);
    const emit = defineEmits(['update:modelValue']);
    const props = defineProps({
        modelValue: {
            required: true,
            type: Object,
        },
    });
    const nnOptions = {
        task: 'classification',
        debug: false,
    };

    // ---- Callbacks ----
    function finishedTraining() {
        busy.value = false;
        console.log('finished training');
    }

    // ---- Methods ----
    const prepareModel = () => {
        busy.value = true;
        let nn = ml5.neuralNetwork(nnOptions);

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
        nn.train(props.modelValue, finishedTraining);
    };

    const reteachModel = () => {
        prepareModel();
    };

    // ---- Other ----
    onMounted(() => {
        prepareModel();
    });
</script>

<template>
    <section class="flex flex-col gap-4 bg-black rounded-md p-4 w-full h-full z-10">
        <p>Parameters</p>

        <ChangeValueModule titleName="Epochs" v-model="modelValue.epochs" />
        <ChangeValueModule titleName="Batch size" v-model="modelValue.batchSize" />

        <BaseButton
            @click="reteachModel"
            class="col-start-1 row-start-1 w-full disabled:cursor-progress"
            :disabled="busy">
            Reteach model {{ busy ? '(in progress)' : '' }}
        </BaseButton>
    </section>
</template>
