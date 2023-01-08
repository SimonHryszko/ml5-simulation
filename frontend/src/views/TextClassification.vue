<script setup>
  import { ref, computed } from 'vue';
  import ml5 from 'ml5';

  const text = ref('');
  const readiness = ref(false);
  const result = ref({});

  // init model
  const sentiment = ml5.sentiment('movieReviews', () => {
    readiness.value = true;
  });
  const resultObject = computed(() => {
    if (!result.value.score) return {};

    let label = '';
    if (result.value.score > 0.9) label = 'Super positive';
    else if (result.value.score > 0.7) label = 'Positive';
    else if (result.value.score > 0.5) label = 'Neutral';
    else if (result.value.score > 0.3) label = 'Negative';
    else label = 'Super negative';

    return {
      original: result.value,
      hslHue: parseFloat(result.value.score * 10 * 13),
      label,
    };
  });
</script>
<template>
  <section class="w-2/3 self-center">
    <div v-if="!readiness">
      <p class="text-center pt-4 mb-3">Sorry model is not ready yet... Just wait a second...</p>
    </div>
    <div v-else class="p-6 flex flex-col gap-4">
      <p class="text-center pt-4">
        You recently watched a movie/TV show, and you either really enjoyed it or was disappointed
        by it. I don't know if you liked it but let's make a deal. you will write below a review,
        and I'll tell you if it's positive or negative!
      </p>
      <textarea
        id="message"
        rows="4"
        v-model="text"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your thoughts here..."></textarea>

      <button
        @click="result = sentiment.predict(text)"
        class="w-10/12 bg-transparent self-center hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        Check review!
      </button>

      <span
        v-show="result?.score"
        :style="{
          color: `hsl(${resultObject.hslHue}, 100%, 10%)`,
          'background-color': `hsl(${resultObject.hslHue}, 100%, 50%)`,
        }"
        class="text-xs text-center font-semibold inline-block py-1 px-2 rounded uppercase last:mr-0 mr-1">
        {{ resultObject.label }}
      </span>
    </div>
  </section>
</template>
