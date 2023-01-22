<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import Board from '@/components/DigitClassfication/Board.vue';

  const data = ref([]);
  const reset = (x, y) => {
    return Array.from({ length: x }, () => Array.from({ length: y }, () => 0));
  };

  onMounted(() => {
    data.value = reset(7, 5);
  });
</script>

<template>
  <section class="grid grid-cols-3 m-10 gap-5">
    <Board class="col-start-2" v-model="data" />
  </section>
</template>
