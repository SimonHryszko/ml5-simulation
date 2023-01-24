<script setup>
  import { ref, onMounted, watch } from 'vue';
  import Board from '@/components/DigitClassfication/Board.vue';
  import ml5 from 'ml5';
  import modelData from '@/Models/digit-classification/modelData.json';

  const data = ref([]);
  const result = ref(null);
  const ready = ref(false);
  const modelParams = {
    epochs: 50,
  };
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
      model.addData(item.in.flat(), {
        label: item.out.toString(),
      });
      console.log("added")
    });

    // 3. Normalize the data
    model.normalizeData();

    // 4. Train the model
    model.train(modelParams, () => {
      ready.value = true;
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
    model.classify(val, (err, res) => {
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

    data {{ data }}
    <div v-for="r in result">{{ r.label }} --> {{ r.confidence }}</div>
  </section>
</template>
