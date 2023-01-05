<script setup>
  import JsonViewer from 'vue-json-viewer'
  import 'vue-json-viewer/style.css'

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
      <json-viewer :value="props.code"
      theme="jv-dark"
      ></json-viewer>
    </code>
  </section>
</template>
