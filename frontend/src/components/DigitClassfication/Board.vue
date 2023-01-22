<script setup>
  import { ref, onMounted } from 'vue';
  import BaseButton from '@/components/BaseButton.vue';

  const props = defineProps({
    modelValue: {
      type: Array,
      required: true,
    },
  });
  const emit = defineEmits(['update:modelValue']);
  const click = (i, j, val) => {
    if (event.ctrlKey) val = 0;
    props.modelValue[i - 1][j - 1] = val ?? 1;
    emit('update:modelValue', props.modelValue);
  };
  const isMouseLeftKeyPressed = ref(false);

  onMounted(() => {
    document.addEventListener('mousedown', () => {
      isMouseLeftKeyPressed.value = true;
    });
    document.addEventListener('mouseup', () => {
      isMouseLeftKeyPressed.value = false;
    });
  });
  const reset = () => {
    for (let i = 0; i < props.modelValue.length; i++) {
      for (let j = 0; j < props.modelValue[i].length; j++) {
        props.modelValue[i][j] = 0;
      }
    }
    emit('update:modelValue', props.modelValue);
  };
</script>

<template>
  <section class="justify-center items-center flex flex-col">
    <div class="flex" v-for="i in props.modelValue.length">
      <div
        class="w-10 h-10 border-gray-300 border-[1px] hover:bg-gray-500 select-none"
        :class="{
          'bg-gray-500': props.modelValue[i - 1][j - 1] === 1,
        }"
        @click="click(i, j)"
        @mouseover="isMouseLeftKeyPressed && click(i, j)"
        @mousedown="click(i, j)"
        v-for="j in props.modelValue[i - 1].length"></div>
    </div>
    <BaseButton class="mt-5" @click="reset">Reset board</BaseButton>
  </section>
</template>
