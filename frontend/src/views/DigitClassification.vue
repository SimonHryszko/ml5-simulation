<script setup>
  import { ref, onMounted, watch, computed } from 'vue';
  import Board from '@/components/DigitClassfication/Board.vue';
  import Char from '@/components/color-classification/Chart.vue';
  import ml5 from 'ml5';
  import _ from 'lodash';
  import { digitToBinaryMatrice, binaryMatriceToDigit, Toast } from '@/helper.js';
  import modelData from '@/Models/digit-classification/modelData.json';
  import ChangeValueModule from '@/components/color-classification/ChangeValueModule.vue';
  import BaseButton from '@/components/BaseButton.vue';

  const data = ref([]);
  const result = ref(null);
  const ready = ref(false);
  const modelParams = ref({
    epochs: 50,
    batchSize: 10,
  });
  const modelOptions = ref({
    task: 'classification',
    debug: true,
    learningRate: 0.2,
  });

const callTraining = () => {
  ready.value = true;

  Toast.fire({
    title: 'Model is ready!',
    icon: 'success',
  });
  console.info('Finished training');
}

  var model;
  const modelInit = () => {
    ready.value = false;

    // 1. Create the model
    model = ml5.neuralNetwork(modelOptions.value);

    // 2. Add the data
    modelData.forEach((item) => {
      model.addData(item.in.flat(), digitToBinaryMatrice(item.out.toString()));
    });

    // 3. Normalize the data
    model.normalizeData();

    // 4. Train the model
    model.train(modelParams.value, callTraining);
  };
  const reset = (x, y) => {
    return Array.from({ length: x }, () => Array.from({ length: y }, () => 0));
  };
  onMounted(() => {
    data.value = reset(7, 5);

    modelInit();
  });

  const classify = (val) => {
    if (!ready.value) return;
    model.predict(val, (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      result.value = res;
      console.log(res);
    });
  };

  watch(
    () => [...data.value.flat()],
    () => {
      classify(data.value.flat());
    },
  );

  const results = computed(() => {
    if (!result.value) return [];

    const arr = [];
    const sorted = _.sortBy(result.value, 'value').reverse();

    // for in result.value
    for (let i = 0; i < result.value.length; i++) {
      arr.push({
        label: sorted[i].label,
        value: sorted[i].value,
      });
    }
    
    return arr;
  });
</script>

<template>
  <section class="grid grid-cols-3 m-10 gap-5">
    <!-- COL 1 -->
    <div class="row-start-1 col-start-1 gap-y-4 flex flex-col">
      <ChangeValueModule :values="[10, 50, 75]" v-model="modelParams.epochs" titleName="Epochs" />
      <ChangeValueModule
        :values="[1, 5, 10]"
        v-model="modelParams.batchSize"
        titleName="Batch size" />
      <ChangeValueModule
        :values="[1, 2, 5]"
        v-model="modelOptions.learningRate"
        titleName="Learning rate" />

      <BaseButton @click="modelInit" :disabled="!ready">Teach model!</BaseButton>
    </div>

    <!-- COL 2 -->
    <Board class="col-start-2" v-model="data" />

    <!-- COL 3 -->
    <Char class="col-start-3" :data="results" />
    <!-- r: {{ results }} -->
  </section>
</template>
