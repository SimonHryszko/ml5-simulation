<script setup>
  import { ref } from 'vue';
  import MainImage from '../components/image-classification/MainImage.vue';
  import CodeAndSchemaVue from '../components/CodeAndSchema.vue';
  import ml5 from 'ml5';

  const color = ref('#' + Math.floor(Math.random() * 16777215).toString(16));
  const img_name = ref('img1.png');
  const results = ref([]);

  // Initialize the Image Classifier method with MobileNet
  const classifier = ml5.imageClassifier('MobileNet', () => {});

  const classify = () => {
    classifier.classify(document.getElementById('image'), (err, r) => {
      results.value = r;
      console.log(results);
    });
  };
</script>
<template>
  <section
    class="grid grid-cols-1 gap-5 xl:grid-cols-12 p-4 h-full min-w-full flex-grow content-start pt-96 xl:pt-4"
    :style="{ backgroundColor: color }">
    <div class="flex flex-col gap-8 xl:col-start-1 xl:col-span-3 py-8">
      <CodeAndSchemaVue :code="results" />

      <div class="flex flex-col gap-4 bg-black rounded-md p-4 w-full h-full z-10">
        List of links to google image with the results
      </div>
    </div>

    <MainImage :img_name="img_name" />
    <img
      id="image"
      class="hidden"
      :src="`/color-classification/${img_name}`"
      alt="Could not load image." />

    <div
      @click="classify"
      class="bg-black w-full rounded-md p-4 xl:col-start-11 flex flex-row gap-4 items-center justify-center xl:col-span-2 h-16">
      image switcher
    </div>
  </section>
</template>
