<script setup>
  const props = defineProps({
    img_name: {
      type: String,
      required: true,
    },
  });
</script>

<template>
  <div class="gap-5 flex flex-col xl:col-span-7">
    <div class="flex items-center flex-col gap-4 bg-black rounded-md p-4 w-full h-full z-10">
      <img width="800" :src="`/color-classification/${props.img_name}`" alt="Could not load image." />
    </div>
  </div>
</template>
