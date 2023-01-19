<script setup>
  import { ref, watch } from 'vue';
  import CodeAndSchemaVue from '../components/CodeAndSchema.vue';
  import ml5 from 'ml5';
import GuideButton from '@/components/GuideButton.vue';
  import ImageSwitcher from '../components/image-classification/ImageSwitcher.vue';
import { randomHexColor, guideModal } from '@/helper.js';

  const color = ref(randomHexColor());
  const img_name = ref('/image-classification/img1.png');
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
  const messages = [
    {
      title: 'Image Classification',
      text: 'Image classification is a computer vision technique that allows us to classify an image into a set of predefined classes. In this example, we are using the MobileNet model to classify an image into 1000 classes.',
    },
    {
      title: "Classed",
      html: "The model can classify images into 1000 classes. Some of the classes are: 'cock', 'dining table, board', 'barber chair', 'padlocks', or 'tick'. <a href='https://deeplearning.cms.waikato.ac.nz/user-guide/class-maps/IMAGENET/' class='underline' target='_blank'>See all classes!</a>"
    },
    {
      title: 'MobileNet',
      text: 'MobileNet is a convolutional neural network that is 14x smaller and 125x faster than the original model, yet still produces higher accuracy. It is designed to work on mobile and embedded devices.',
    },
    {
      title: 'Try it yourself!',
      text: 'You can try it yourself by uploading your own image or by using one of the images provide'
    },
    {
      title: 'Rememeber',
      html: "Remember to use classes from the <a href='https://deeplearning.cms.waikato.ac.nz/user-guide/class-maps/IMAGENET/' class='underline' target='_blank'>list!</a>",
      icon: 'info'
    },
    {
      title: 'Results',
      text: 'On the left will be shown 3 most relevant classes!'
    },
    {
      title: 'Code',
      text: 'And on top left corner you can see the code and schema of the model as you need!'
    },
    {
      title: 'Enjoy!',
      text: 'Enjoy the power of AI!',
      color: '#716add',
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
    }
  ]
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
    <GuideButton @click="guideModal(messages, 0)" />
  </section>
</template>
