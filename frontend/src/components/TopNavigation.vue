<script setup>
    import { useRoute } from 'vue-router';
    import BaseButton from '@/components/BaseButton.vue';
    import { computed } from 'vue';
    import anime from 'animejs';
    import { onMounted, nextTick } from 'vue';

    onMounted(() => {
        anime({
            targets: '.anime-letter',
            translateY: [-10, 0],
            delay: anime.stagger(50),
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 5000,
            color: [...colors,...colors,...colors.reverse()],
            changeComplete: () => {
                nextTick(() => {
                    anime({
                    targets: '.anime-letter',
                    color: ['#fff'],
                    delay: anime.stagger(50),
                        easing: 'easeOutExpo',
                        duration: 500,
                });
                });
            },
        });
    });

  const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF' ];

  // get route path
  const route = useRoute();

  // get route path
const path = computed(() => route.path);
  
  const isLandingPage = computed(() => path.value == '/');
</script>

<template>
    <nav
        class="w-full items-center flex hover:cursor-pointer flex-row justify-between p-4 bg-black xl:px-16">
        <div @click="$router.push('/')" class="flex flex-col gap-1">
            <h1 class="text-2xl font-semibold">ML - 5</h1>
            <p class="opacity-70 text-xs flex">
                <p class="anime-letter whitespace-pre" v-for="i in 'By Simon Hryszko'" :key="i">
                    {{ i }}
                </p>
            </p>
        </div>

        <div v-if="!isLandingPage" class="flex flex-row gap-4">
            <span
                :class="route.path=='/color-classification' ? 'underline underline-offset-8 decoration-primary-blue' : ''"
                @click="$router.push('/color-classification')"
                class="hover:underline hover:decoration-primary-blue hover:underline-offset-8">
                Color classification
            </span>
            <span
                :class="route.path=='/image-classification' ? 'underline underline-offset-8 decoration-primary-blue' : ''"
                @click="$router.push('/image-classification')"
                class="hover:underline hover:decoration-primary-blue hover:underline-offset-8">
                Image classification
            </span>
            <span
                :class="route.path=='/Text-detection' ? 'underline underline-offset-8 decoration-primary-blue' : ''"
                @click="$router.push('/Text-detection')"
                class="hover:underline hover:decoration-primary-blue hover:underline-offset-8">
                Text detection
            </span>
            <span
                :class="route.path=='/Digit-classification' ? 'underline underline-offset-8 decoration-primary-blue' : ''"
                @click="$router.push('/Digit-classification')"
                class="hover:underline hover:decoration-primary-blue hover:underline-offset-8">
                Digit classification
            </span>
        </div>
    </nav>
</template>
