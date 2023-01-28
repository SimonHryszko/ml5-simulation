<script setup>
  import { ref, onMounted, watch } from 'vue';
  import Board from '@/components/DigitClassfication/Board.vue';
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
  });
  const modelOptions = {
    task: 'classification',
    debug: true,
  };
  var model;
  const modelInit = () => {
    // 1. Create the model
    model = ml5.neuralNetwork(modelOptions);

    // 2. Add the data
    modelData.forEach((item) => {
      model.addData(item.in.flat(), digitToBinaryMatrice(item.out.toString()));
      console.log(
        'added',
        item.out.toString(),
        digitToBinaryMatrice(item.out),
        binaryMatriceToDigit(digitToBinaryMatrice(item.out)),
      );
    });

    // 3. Normalize the data
    model.normalizeData();

    // 4. Train the model
    model.train(modelParams.value, () => {
      ready.value = true;

      Toast.fire({
        title: 'Model is ready!',
        icon: 'success',
      });
    });
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
    });
  };

  watch(
    () => [...data.value.flat()],
    () => {
      classify(data.value.flat());
    },
  );
</script>

<template>
  <section class="grid grid-cols-3 m-10 gap-5">
    <Board class="col-start-2" v-model="data" />

    <div class="row-start-1 col-start-1 gap-y-4 flex flex-col">
      <ChangeValueModule :values="[10, 50, 75]" v-model="modelParams.epochs" titleName="epochs" />
      <BaseButton @click="modelInit" :disabled="!ready">Teach model!</BaseButton>
    </div>

    data {{ data }}
    <ol class="col-start-1" v-for="r in _.orderBy(result, 'value', 'desc')" :key="r.label">
      {{
        r.label
      }} - {{ r.value }}
    </ol>
  </section>
</template>
