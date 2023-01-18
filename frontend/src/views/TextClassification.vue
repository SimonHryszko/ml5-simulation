<script setup>
  import { ref, computed, watch, onMounted } from 'vue';
  import ml5 from 'ml5';
  import OneReview from '../components/text-classification/OneReview.vue';
  import { hslToHex, guideModal } from '@/helper.js';
  import BaseButton from '@/components/BaseButton.vue';
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

  watch(text, () => {
    result.value = classify(text.value);
  });
  const reviews = [
    {
      quote: `Everything they had been building up for is lost! The went against everything the books and shows hinted, teased even outrightly proclaimed till now. Everything from season 1 has become pointless. Jon and Daenerys have become pointless. The prophecy, the dragons, the warging of the stark children, the three eyed raven, quaithe, warlocks, Jon'ss resurrection is all pointless. It's just another drama with people fighting for a kingdom. The most pathetic end to a beloved series. It could have been great.`,
    },
    {
      quote: `The first few seasons where amazing as they were based on the books, as the show started to advance and as the fewer material and content got the worse the show became, starting season 6 you can notice a clear decline in the quality of episodes, you can clearly notice the increase of time fillers up until season 8 which was the most horrible of them all. Don't invest too much time on the series of you haven't started but just skip through the episode as some of the scenes are worth watching.`,
    },
    {
      quote: `First 6 seasons were fantastic but after that everything went south and especially season 8 was the worst! It was rushed and i could not make any emotional connection with any of the characters. Simply put, it was bland! The ending was so bad that it feels like you wasted your precious 10 years for nothing!`,
    },
    {
      quote: `We have really enjoyed GoT since its first episode, have just watched the episode 3 from season 8, to be honest I was very disappointed, to say the episode cost over 11 million to make, the whole episode was so dark you couldn't make out what was happening. Absolutely shocking`,
    },
    {
      quote: `Pacing so rushed that almost each episode could be a season of its own, all the logic previously shown, all the character developments, foreshadowing of plots, tension buildups, absolutely everything that they built for 8 years has been thrown out of the window for the sake of some visually impressive but rushed mindless spectacle, culminating in the worst and most illogical ending I ever saw in any TV show, including infamous endings of Lost and Dexter.`,
    },
    {
      quote: `Season 8 episode 3, Long Night killed evil Dead King in dumb and rush manner, and the rest of show with him for me.`,
    },
    {
      quote: `Characters are propped up while others are torn down for what I can only speculate are the writers injecting hollywood politics into the show.`,
    },
    {
      quote: `Nothing against strong female characters, some of my favorite movies have female leads, but when it is so obvious that there's an agenda at play, like it is in GoT towards the end, it's just off-putting.`,
    },
    {
      quote: `What was once an entertaining show with solid writing and thrilling character arcs was reduced to nothing more than a Hallmark-type fantasy flick where logic or continuity had no room.`,
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
        review.bgCol = hslToHex(classify(review.quote).score * 10 * 13, 100, 50);
        review.val = (review.label * 100).toFixed(0);
      }
    });
  });
  const messages = [
    {
      title: 'Text Classification',
      text: `Text classification is a machine learning technique that assigns a category to a piece of text. It is a supervised learning technique, which means that you need to provide a training dataset that contains the text and the category it belongs to. The model will then learn from this dataset and will be able to classify new text.`,
    },
    {
      title: 'Model',
      text: `Here we have the model called 'Sentiment' which is trained on a dataset of movie reviews. The model will be able to classify a review as positive or negative.`,
    },
    {
      title: 'Training',
      text: `The model was trained on a dataset of movie reviews. The dataset contains 50,000 reviews, each labeled as positive or negative. The dataset is split into 25,000 reviews for training and 25,000 reviews for testing. The training reviews are further split into 15,000 reviews for training and 10,000 reviews for validation.`,
    },
    {
      title: 'Results',
      text: `The model was able to achieve an accuracy of 88.5% on the validation set. This means that the model was able to correctly classify 88.5% of the reviews in the validation set.`,
    },
    {
      title: 'Try it out',
      text: `You can try out the model by writing a review, you will see in real time the model's prediction.`,
    },
    {
      title: 'Examples',
      text: `Below you can see some examples reviews from IMDB of 'Game of Thrones'`
    },
    {
      title: 'Enjoy!',
      text: 'Enjoy the power of AI!',
      color: '#716add',
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
    }
  ];
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
        <h1 class="text-2xl font-medium text-center text-gray-200">Examples Reviews</h1>

        <OneReview
          v-for="review in _.sortBy(
            reviews.filter((item) => item.quote.length > 0),
            'val',
          )"
          :val="review.val"
          :bgCol="review.bgCol"
          :label="review.label"
          :quote="review.quote"
          v-model="text"
          :key="review.quote" />
      </div>
      <!-- flex-col -->
    </div>
    <!-- on results if-->
      <GuideButton @click="guideModal(messages, 0)" />
  </section>
</template>
