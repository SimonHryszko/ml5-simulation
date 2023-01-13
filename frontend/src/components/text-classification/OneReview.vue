<script setup>
  const props = defineProps({
    val: {
      // value on circle
      type: [String, Number],
      required: false,
      default: '0',
    },
    bgCol: {
      // background color of circle
      type: String,
      required: false,
      default: '00b4d8',
    },
    quote: {
      type: String,
      required: false,
      default:
        'The only way to do great work is to love what you do. Btw. I am a fucking quote, where someone forgot put content in me.',
    },
    label: {
      type: Number,
      required: false,
      default: '0.6535733342170715',
    },
    modelValue: {
      type: String,
      required: false,
    }
  });

  const emit = defineEmits(['update:modelValue']);
</script>
<template>
  <section class="flex w-full gap-4 items-center">
    <div
      :style="{
        'background-color': `${props.bgCol}`,
        'box-shadow': `0 0 0 2px ${props.bgCol}`,
      }"
      class="rounded-full flex-shrink-0 h-12 w-12 flex items-center justify-center text-black">
      <p class="text-xs">{{ props.val }} pkt</p>
    </div>

      <p @click="emit('update:modelValue', props.quote)" class="pl-4 border-l-4 border-gray-500 italic">"{{ props.quote }}"</p>
  </section>
</template>
