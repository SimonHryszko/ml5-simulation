<script setup>
import LandingItem from '../components/LandingItem.vue';
</script>

<template>
    <section class="w-full min-h-full flex flex-grow xl:flex-row flex-col items-center justify-center gap-8 xl:gap-16">
        <p class="bg-primary-green"> </p>
        <LandingItem
            @click="$router.push('/color-classification')"
            title="Color Classifier"
            colorClass="bg-primary-blue"
            description="A color classifier is a machine learning model that recognizes and classifies different colors in images. The ml5 library provides access to pre-trained color classifiers and makes it easy to use them in applications. Simply load the model and pass an image to get labels for identified colors. This is a convenient way to add color recognition without building a model from scratch. It can be used for tasks such as image segmentation.">
            <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M5.464 26.536C5.92831 27.0004 6.47956 27.3688 7.08628 27.6202C7.69299 27.8716 8.34328 28.0009 9 28.0009C9.65672 28.0009 10.307 27.8716 10.9137 27.6202C11.5204 27.3688 12.0717 27.0004 12.536 26.536L21.0707 18M9 28C7.67392 28 6.40215 27.4732 5.46447 26.5355C4.52678 25.5979 4 24.3261 4 23V5.5C4 4.672 4.672 4 5.5 4H12.5C13.328 4 14 4.672 14 5.5V10.9293M9 28C10.3261 28 11.5979 27.4732 12.5355 26.5355C13.4732 25.5979 14 24.3261 14 23V10.9293M9 28H26.5C27.328 28 28 27.328 28 26.5V19.5C28 18.672 27.328 18 26.5 18H21.0707M14 10.9293L17.84 7.08933C18.424 6.504 19.3733 6.504 19.96 7.08933L24.9093 12.04C25.496 12.6267 25.496 13.576 24.9093 14.16L21.0707 18M9 23H9.01067V23.0107H9V23Z"
                    stroke="#161616"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </LandingItem>

        <LandingItem
            @click="$router.push('/color')"
            title="Color Classifier"
            colorClass="bg-primary-green"
            description="In data science, a classifier is a type of machine learning algorithm used to assign a class label to a data input.">
            <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M5.464 26.536C5.92831 27.0004 6.47956 27.3688 7.08628 27.6202C7.69299 27.8716 8.34328 28.0009 9 28.0009C9.65672 28.0009 10.307 27.8716 10.9137 27.6202C11.5204 27.3688 12.0717 27.0004 12.536 26.536L21.0707 18M9 28C7.67392 28 6.40215 27.4732 5.46447 26.5355C4.52678 25.5979 4 24.3261 4 23V5.5C4 4.672 4.672 4 5.5 4H12.5C13.328 4 14 4.672 14 5.5V10.9293M9 28C10.3261 28 11.5979 27.4732 12.5355 26.5355C13.4732 25.5979 14 24.3261 14 23V10.9293M9 28H26.5C27.328 28 28 27.328 28 26.5V19.5C28 18.672 27.328 18 26.5 18H21.0707M14 10.9293L17.84 7.08933C18.424 6.504 19.3733 6.504 19.96 7.08933L24.9093 12.04C25.496 12.6267 25.496 13.576 24.9093 14.16L21.0707 18M9 23H9.01067V23.0107H9V23Z"
                    stroke="#161616"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </LandingItem>

        <LandingItem
            @click="$router.push('/color')"
            title="Color Classifier"
            colorClass="bg-primary-yellow"
            description="In data science, a classifier is a type of machine learning algorithm used to assign a class label to a data input.">
            <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M5.464 26.536C5.92831 27.0004 6.47956 27.3688 7.08628 27.6202C7.69299 27.8716 8.34328 28.0009 9 28.0009C9.65672 28.0009 10.307 27.8716 10.9137 27.6202C11.5204 27.3688 12.0717 27.0004 12.536 26.536L21.0707 18M9 28C7.67392 28 6.40215 27.4732 5.46447 26.5355C4.52678 25.5979 4 24.3261 4 23V5.5C4 4.672 4.672 4 5.5 4H12.5C13.328 4 14 4.672 14 5.5V10.9293M9 28C10.3261 28 11.5979 27.4732 12.5355 26.5355C13.4732 25.5979 14 24.3261 14 23V10.9293M9 28H26.5C27.328 28 28 27.328 28 26.5V19.5C28 18.672 27.328 18 26.5 18H21.0707M14 10.9293L17.84 7.08933C18.424 6.504 19.3733 6.504 19.96 7.08933L24.9093 12.04C25.496 12.6267 25.496 13.576 24.9093 14.16L21.0707 18M9 23H9.01067V23.0107H9V23Z"
                    stroke="#161616"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </LandingItem>

</section>
</template>
