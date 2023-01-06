<script setup>
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
        @click="emit('update:modelValue', image)"
        v-for="image in images"
        style="aspect-ratio: 4/4"
        class="rounded-md"
        :src="`/image-classification/${image}`"
        :alt="`Image (${image}) not loaded  `" />
    </div>
  </section>
</template>
