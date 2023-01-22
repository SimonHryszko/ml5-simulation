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
    console.log('🚀 ~ file: Board.vue:11 ~ click ~ i, j, val', i, j, val);
    props.modelValue[i - 1][j - 1] = !val ? 1 : 0;
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
        v-for="j in props.modelValue[i - 1].length">
        <!-- {{ i - 1 }}{{ j - 1 }} -->
      </div>
    </div>
    <BaseButton class="mt-5">Reset board</BaseButton>
  </section>
</template>
