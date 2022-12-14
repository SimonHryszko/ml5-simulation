<template>
    <div class="border-2 border-dashed p-10 border-gray-700">
        <!-- color picker -->
        <label for="color" class="text-2xl">Color: </label>
        <input type="color" name="color" value="#e66465" @change="colorPicked" />
        <br />
        <div class="text-center text-xl">
            This looks like <strong>{{ colorLabel }}</strong> for me!
        </div>
    </div>
</template>

<script setup>
    import * as useMl5 from './model';
    import data from './data.json';
    import { computed } from 'vue';

    // init
    useMl5.initNN(data);

    const input = {
        r: 255,
        g: 0,
        b: 0,
    };

    setTimeout(() => {
        useMl5.classify(input);
    }, 2000);

    function colorPicked(e) {
        // const input = e.target.value;
        const input = {
            r: parseInt(e.target.value.substring(1, 3), 16),
            g: parseInt(e.target.value.substring(3, 5), 16),
            b: parseInt(e.target.value.substring(5, 7), 16),
        };

        let r = useMl5.classify(input);
    }

    const colorLabel = computed(() => {
        return useMl5.colorLabel.value;
    });

    // color picker from image
    // image detection from video
    // gesty gora, dol .. gra
</script>
