<script setup>
  import { ref, onMounted } from 'vue';
  import BaseButton from '@/components/BaseButton.vue';

  const data = ref();
  const isLeftMouseDown = ref(false);

  const changePixel = (x, y, val) => {
    data.value[x - 1][y - 1] = val;
  };
  const verifyClick = (x, y, type) => {
    if (type === 'click' || (type === 'mouseOver' && isLeftMouseDown.value))
      changePixel(x, y, event.ctrlKey ? 0 : 1);
  };
  const reset = () => {
    data.value = Array(7)
      .fill()
      .map(() => Array(5));
  };
  onMounted(() => {
    window.addEventListener('mousedown', function () {
      isLeftMouseDown.value = true;
    });
    window.addEventListener('mouseup', function () {
      isLeftMouseDown.value = false;
    });

    reset();
  });
</script>
<template @click="click">
  <section class="flex flex-col justify-center items-center gap-1 mt-2">
    <div class="flex gap-1" v-for="rowID in 7" :key="rowID">
      <div
        @click="verifyClick(rowID, colID, 'click')"
        @mouseover="verifyClick(rowID, colID, 'mouseOver')"
        :class="{
          'bg-white': data && data[rowID - 1][colID - 1] === 1,
        }"
        class="hover:border-primary-red w-10 h-10 border select-none cursor-pointer"
        v-for="colID in 5"
        :key="colID"></div>
    </div>

    <BaseButton @click="reset">Reset</BaseButton>
  </section>
</template>
