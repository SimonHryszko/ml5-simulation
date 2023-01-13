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
    stars: {
      type: Number,
      required: false,
      default: 5,
      min: 0,
      max: 10,
      step: 1,
    },
    label: {
      type: Number,
      required: false,
      default: '0.6535733342170715',
    },
  });
</script>
<template>
  <section class="flex gap-4">
    <div
      :style="{
        'background-color': `${props.bgCol}`,
        'box-shadow': `0 0 0 2px ${props.bgCol}`,
      }"
      class="rounded-full flex-shrink-0 h-12 w-12 flex items-center justify-center text-black">
      <p class="text-xs">{{ props.val }} pkt</p>
    </div>

    <div class="flex items-center">
      <p class="pl-4 border-l-4 border-gray-500 italic">"{{ props.quote }}"</p>
      <div class="pl-16 flex flex-col text-xs text-gray-500 ml-2">
        <div class="flex flex-col items-center">
          <div class="text-2xl flex text-gray-500 ml-2">
            <span v-for="i in props.stars">&#9733;</span>
            <span v-for="i in 10 - props.stars">&#9734;</span>
          </div>
          <p class="align-self-end">{{ props.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
