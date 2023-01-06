<script setup>
  import JsonViewer from 'vue-json-viewer';
  import 'vue-json-viewer/style.css';
  import { ref, computed } from 'vue';
  import Tabs from '../components/Tabs.vue';

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
  const selectedTab = ref('Code');
  const tabOptions = ['Code', 'Schema'];
  const jvCode = computed(() => {
    return props[selectedTab.value.toLowerCase()];
  });
</script>

<template>
  <section class="flex flex-col gap-4 bg-black rounded-md p-4 w-full h-full z-10">
    <Tabs v-model="selectedTab" :options="tabOptions" />
    <code>
      <json-viewer :value="jvCode" theme="jv-dark"></json-viewer>
    </code>
  </section>
</template>
