<script setup>
  import { ref, computed, watch, onMounted } from 'vue';
  import ml5 from 'ml5';
  import OneReview from '../components/text-classification/OneReview.vue';
  import _ from 'lodash';

  const text = ref('');
  const readiness = ref(false);
  const result = ref({});
  let sentiment = null;

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

  const classify = (t) => {
    return sentiment.predict(t);
  };

  function hslToHex(h, s, l) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0'); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  watch(text, () => {
    result.value = classify(text.value);
  });
  const reviews = [
    {
      quote:
        "Everything they had been building up for is lost! The went against everything the books and shows hinted, teased even outrightly proclaimed till now. Everything from season 1 has become pointless. Jon and Daenerys have become pointless. The prophecy, the dragons, the warging of the stark children, the three eyed raven, quaithe, warlocks, Jon'ss resurrection is all pointless. It's just another drama with people fighting for a kingdom. The most pathetic end to a beloved series. It could have been great.",
      stars: 1,
    },
    {
      quote:
        "The first few seasons where amazing as they were based on the books, as the show started to advance and as the fewer material and content got the worse the show became, starting season 6 you can notice a clear decline in the quality of episodes, you can clearly notice the increase of time fillers up until season 8 which was the most horrible of them all. Don't invest too much time on the series of you haven't started but just skip through the episode as some of the scenes are worth watching.",
      stars: 3,
    },
    {
      quote:
        'First 6 seasons were fantastic but after that everything went south and especially season 8 was the worst! It was rushed and i could not make any emotional connection with any of the characters. Simply put, it was bland! The ending was so bad that it feels like you wasted your precious 10 years for nothing!',
      stars: 3,
    },
    {
      quote: `We have really enjoyed GoT since its first episode, have just watched the episode 3 from season 8, to be honest I was very disappointed, to say the episode cost over 11 million to make, the whole episode was so dark you couldn't make out what was happening. Absolutely shocking`,
      stars: 6,
    },
  ];
  const copyToClipboard = (text) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  onMounted(() => {
    // init model
    sentiment = ml5.sentiment('movieReviews', () => {
      readiness.value = true;
      for (let review of reviews) {
        review.label = classify(review.quote).score;
      }
    });
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

      <div class="flex-col gap-4 flex justify-center items-center">
        <div class="flex" v-show="result?.score && text.length > 0">
          <span
            :style="{
              color: `hsl(${resultObject.hslHue}, 100%, 10%)`,
              'background-color': `hsl(${resultObject.hslHue}, 100%, 50%)`,
            }"
            @click="copyToClipboard(resultObject.original?.score)"
            class="text-xs text-center font-semibold inline-block py-1 px-2 rounded uppercase last:mr-0 mr-1">
            {{ resultObject.label }} | {{ (resultObject.original?.score * 100).toFixed(2) }} pkt
          </span>
        </div>
        <!-- flex -->
        <OneReview
          v-for="review in _.sortBy(reviews, 'val')"
          val="(classifyParam(review.quote) * 100).toFixed(0)"
          bgCol="hslToHex(classifyParam(review.quote) * 10 * 13, 100, 50)"
          stars="review.stars"
          :label="review.label"
          :quote="review.quote"
          :key="review.quote" />
      </div>
      <!-- flex-col -->
    </div>
    <!-- on results if-->
  </section>
</template>
