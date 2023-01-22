import { defineStore } from 'pinia';

export const data = defineStore('data', {
  state: () => {
    return {
      data: [],
    };
  },
  actions: {
    add(data) {
      this.data.push(data);
    },
    clear() {
      this.data = [];
    },
  },
  persist: true,
});
