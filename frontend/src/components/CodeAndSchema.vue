<script setup>
  const props = defineProps({
    code: {
      type: String,
      required: true,
    },
    schema: {
      type: String,
      required: true,
    },
  });

</script>

<template>
  <section class="flex flex-col gap-4 bg-black rounded-md p-4 w-full h-full z-10">
    <code>
      JSON: {{ props.code }}
    </code>
  </section>
</template>