<script setup>
  import { ref } from 'vue';
  const images = [
    "1200px-Black_and_Yellow_Argiope_-_Argiope_aurantia_-_Merritt_Island_National_Wildlife_Refuge,_Florida.jpg", "2445.jpg", "262px-Argiope_aurantia_-_ventral_view.jpg", "Araneus_cavaticus_02.jpg", "download.jpeg", "original.png", "pexels-photo-1103879.jpeg", "pexels-photo-155347.jpeg", "shutterstock_64005883.jpg", "spider-web-with-dew.jpg", "Wolf_spider_-__Allocosa_obscuroides.width-1200.3915b07.jpg", "Wolf_Spider_rpp.jpg"
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
