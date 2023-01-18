<script setup>
  import BaseButton from '@/components/BaseButton.vue';
  import Chart from '@/components/color-classification/Chart.vue';
  import ModelParameters from '../components/color-classification/ModelParameters.vue';
  import ml5 from 'ml5';
  import { ref, onMounted, watch } from 'vue';
  import { hexToRgb, randomHexColor } from '@/helper.js';
  import data from '@/Models/color-classification/data.json';
  import InfoCard from '../components/infoCard.vue';
  import * as modal from 'sweetalert2';
  
  const Toast = modal.mixin({
    showConfirmButton: true,
  });

  const model = ref({
    epochs: 72,
    batchSize: 5,
  });

  const color = ref(randomHexColor());
  const colorPicker = ref('colorPicker');
  const selectColor = () => {
    colorPicker.value.click();
  };

  const modelReady = ref(false);
  const nnOptions = {
    task: 'classification',
    debug: false,
  };
  let nn;

  // ---- Callbacks ----
  function finishedTraining() {
    modelReady.value = true;
    console.log('finished training');
  }

  function gotResults(error, r) {
    if (error) {
      console.error(error);
      return;
    }
    results.value = r;
  }

  // ---- Methods ----
  const prepareModel = () => {
    modelReady.value = false;
    nn = ml5.neuralNetwork(nnOptions);

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
    nn.train(model.value, finishedTraining);
  };

  const predictColor = (hex) => {
    const rgb = hexToRgb(hex);
    nn.classify(
      {
        r: rgb.r,
        g: rgb.g, // may just be rgb
        b: rgb.b,
      },
      gotResults,
    );
  };

  // ---- Other ----
  const results = ref([]);

  const messages = [
    {
      title: "Color classificator",
      text: "This model will show how artificial intelligence can be used. Colour classification is only from many examples like for example classification of animals, plants, etc."  
    },
    {
      title: "Teaching",
      text: "The model is trained on a set of data. The data is a set of colors (RBG) and their names. The model is trained on this data and learns to classify colors."  
    },
    {
      title: "Parameters",
      text: "The parameters are the number of epochs and the batch size. The number of epochs is the number of times the model will be trained on the data. The batch size is the number of samples that the model uses to calculate the error and update the model weights during training."
    },
    {
      title: "Results",
      text: "The results are the probability of the color being classified. The higher the probability, the more likely the color is classified."
    },
    {
      title: "Try it",
      text: "Try it yourself. Select a color with button 'change color' and the model will classify it. You can also train the model with different parameters. Change the number of epochs and/or the batch size, retrain the model and try it again."
    },
  ];
  const messageId = ref(0);
  const howItWork = () => {
    const isItLast = messageId.value == messages.length - 1;
    Toast.fire({
      title: messages[messageId.value].title,
      text: messages[messageId.value].text,
      didOpen: () => {
        if (isItLast) {
          messageId.value = 0;
        } else {
          messageId.value++;
        }
      },
      willClose: () => {
        if (!isItLast) {
          howItWork();
        }
      },
      confirmButtonText: isItLast ? 'Close' : 'Next',
    })
  }

  onMounted(() => {
    prepareModel();
  });
  watch(
    () => color.value,
    (newColor) => {
      predictColor(newColor);
    },
  );
</script>

<template>
  <section
    class="grid grid-cols-1 xl:grid-cols-12 p-4 h-full min-w-full flex-grow content-start pt-96 xl:pt-4"
    :style="{ backgroundColor: color }">
    <div class="flex flex-col gap-8 xl:col-start-1 xl:col-span-3 py-8">
      <!-- Parameters -->
      <ModelParameters
        :readiness="modelReady"
        @confirmRetrain="prepareModel"
        v-model="model"
        :color="color"
        v-model:results="results" />

      <!-- Results -->
      <section
        :class="{ invisible: results.length == 0 }"
        class="bg-black rounded-md p-4 w-full h-full">
        <p>Results</p>
        <Chart :data="results" />
      </section>
    </div>

    <div class="flex flex-col xl:col-span-6">
      <InfoCard
        titleName="Info"
        description="A color classifier is a tool or system that uses algorithms to identify and classify colors. It may be a standalone program or part of a larger application, and it typically uses a combination of machine learning and image processing techniques to analyze and categorize colors. Color classifiers can be used in a variety of applications, such as in image editing software to automatically sort and organize images by color, or in manufacturing to ensure that products are being made with the correct colors." />
      <InfoCard
        titleName="Epoch"
        description="In machine learning, an epoch is a single pass through the entire training dataset. During each epoch, the model will make predictions on the training data, compare its predictions to the actual values, and then update its internal parameters to reduce the error between its predictions and the actual values." />
      <InfoCard
        titleName="Batch size"
        description="In machine learning, the batch size is the number of samples that the model uses to calculate the error and update the model weights during training. A batch is a subset of the training data, and the batch size is the number of samples in that subset." />
    </div>

    <section
      class="bg-black w-full rounded-md p-4 xl:col-start-11 flex flex-row gap-4 items-center justify-center xl:col-span-2 h-16">
      <div class="grid grid-cols-1 grid-rows-1 items-end place-items-stretch w-full">
        <BaseButton
          :disabled="!modelReady"
          @click="selectColor"
          class="col-start-1 row-start-1 w-full"
          >Change Color</BaseButton
        >
        <input
          v-model="color"
          class="z-[-20] col-start-1 row-start-1"
          type="color"
          ref="colorPicker" />
      </div>
      <BaseButton @click="howItWork" class="bottom-5 absolute left-5">Guide</BaseButton>
    </section>
  </section>
</template>
