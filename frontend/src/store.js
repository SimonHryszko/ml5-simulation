import { defineStore } from 'pinia';

export const dataStore = defineStore('data', {
    state: () => {
        return {
        };
    },

    persist: true,
});
