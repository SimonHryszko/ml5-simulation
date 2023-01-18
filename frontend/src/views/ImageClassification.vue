<script setup>
  import { ref, watch } from 'vue';
  import CodeAndSchemaVue from '../components/CodeAndSchema.vue';
  import ml5 from 'ml5';
  import ImageSwitcher from '../components/image-classification/ImageSwitcher.vue';
  import { randomHexColor } from '@/helper.js';

  const color = ref(randomHexColor());
const img_name = ref('/image-classification/2445.jpg');
  const results = ref([]);

  // Initialize the Image Classifier method with MobileNet
  const classifier = ml5.imageClassifier('MobileNet', () => {
    classify();
  });

  const classify = () => {
    classifier.classify(document.getElementById('image'), (err, r) => {
      results.value = r;
    });
  };
  watch(img_name, () => {
    classify();
  });
  const model = [{ label: 'String', confidence: 'Number' }];
</script>
<template>
  <section
    class="grid grid-cols-1 gap-5 xl:grid-cols-12 p-4 h-full min-w-full flex-grow content-start pt-96 xl:pt-4"
    :style="{ backgroundColor: color }">
    <div class="flex flex-col gap-8 xl:col-start-1 xl:col-span-3 py-8">
      <CodeAndSchemaVue :code="results" :schema="model" />

      <div class="flex flex-col gap-4 bg-black rounded-md p-4 w-full h-full z-10">
        <p v-if="results.length == 0">Looks like model is still loading, be patient.</p>
        <p v-for="item in results">
          -
          <a :href="`https://www.google.com/search?tbm=isch&q=${item.label}`" target="_blank">🔗</a>
           {{ item.label }} ~{{ (item.confidence * 100).toFixed(2) }}%
        </p>
      </div>
    </div>

    <!-- <MainImage :img_name="img_name" /> -->
    <div class="gap-5 flex flex-col xl:col-span-7">
      <div class="flex items-center flex-col gap-4 bg-black rounded-md p-4 w-full h-full z-10">
        <img
          id="image"
          width="800"
          :src="`${img_name}`"
          alt="Could not load image." />
      </div>
    </div>

    <ImageSwitcher v-model="img_name" />
  </section>
</template>
