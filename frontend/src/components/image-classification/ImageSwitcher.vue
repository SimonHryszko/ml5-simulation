<script setup>
  import { ref } from 'vue';
  const images = [
    'alex-guillaume-IWnuBhG_y34-unsplash.jpg',
    'erik-karits-r6PynlurQ2M-unsplash.jpg',
    'everyday-basics-jNGFbBSDUWY-unsplash.jpg',
    'img1.png',
    'jason-leung-ZkXQpZnzxOo-unsplash.jpg',
    'keagan-henman-iFBIdX54BOk-unsplash.jpg',
    'mailchimp-lAx4E6Gl06s-unsplash.jpg',
    'nicolas-hippert-J4eTN9GqhzI-unsplash.jpg',
    'ricardo-frantz-GvyyGV2uWns-unsplash.jpg',
    'stefan-widua-vdds_nsH-FE-unsplash.jpg',
    'verstappen-photography-mVGbQL11JvU-unsplash.jpg',
    'zhang-liven-Z67vUFm-VIE-unsplash.jpg',
  ];
  const props = defineProps({
    modelValue: {
      type: String,
      required: true,
    },
  });
  const emit = defineEmits(['update:modelValue']);

  // Uploader
  const fileInput = ref('fileInput');
  const onFilePick = () => {
    fileInput.value.click();
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const uploadFile = async (file) => {
    emit('update:modelValue', await toBase64(file[0]));
  };
</script>
<template>
  <section>
    <div
      @click="classify"
      class="bg-black w-full rounded-md p-4 xl:col-start-11 flex flex-row gap-4 items-center justify-center xl:col-span-2 h-16">
      image switcher xl
    </div>

    <hr />

    <div class="grid grid-cols-2 gap-1 mt-1">
      <img
        @click="emit('update:modelValue', `/image-classification/${image}`)"
        v-for="image in images"
        style="aspect-ratio: 4/4"
        class="rounded-md"
        :src="`/image-classification/${image}`"
        :alt="`Image (${image}) not loaded!`" />
    </div>

    <button
      @click="onFilePick()"
      class="w-full mt-4 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
      <div class="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
        Upload own image!
      </div>
    </button>
    <input type="file" class="hidden" ref="fileInput" @change="uploadFile($event.target.files)" />
  </section>
</template>
