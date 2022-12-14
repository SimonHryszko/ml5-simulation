<script setup>
    import { load, classify, result } from './model';
    import { ref, computed } from 'vue';

    load();
    const colorChanged = (e) => {
        const input = {
            r: parseInt(e.target.value.substring(1, 3), 16),
            g: parseInt(e.target.value.substring(3, 5), 16),
            b: parseInt(e.target.value.substring(5, 7), 16),
        };

        classify(input);
    };
</script>
<template>
    <div class="my-5">
        <input type="color" name="color" value="#e66465" @change="colorChanged" />
        <p v-for="r in result" :key="r.label">{{r.label}}: {{r.confidence}}</p>
    </div>
</template>
