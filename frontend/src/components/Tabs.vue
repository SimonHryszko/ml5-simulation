<script setup>
  import { ref, onMounted } from 'vue';

  const props = defineProps({
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  });
  const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
    <ul class="flex flex-wrap -mb-px">
      <li v-for="item in props.options" class="mr-2">
        <a
          @click="emit('update:modelValue', item)"
          href="#"
          :class="
            item == props.modelValue
              ? 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active'
              : 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-white hover:border-white'
          "
          >{{ item }}</a
        >
      </li>
    </ul>
  </div>
</template>
