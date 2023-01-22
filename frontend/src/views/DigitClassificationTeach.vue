<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import Board from '@/components/DigitClassfication/Board.vue';
  import BaseButton from '@/components/BaseButton.vue';
  import JsonViewer from 'vue-json-viewer';
  import 'vue-json-viewer/style.css';
  import { data as storeData } from '@/store.js';
  import * as modal from 'sweetalert2';

  const Toast = modal.mixin({
    showConfirmButton: true,
  });
  const store = ref(storeData());
  const data = ref([]);
  const reset = (x, y) => {
    return Array.from({ length: x }, () => Array.from({ length: y }, () => 0));
  };
  const clearData = () => {
    for (let i = 0; i < data.value.length; i++) {
      for (let j = 0; j < data.value[i].length; j++) {
        data.value[i][j] = 0;
      }
    }
  };

  onMounted(() => {
    data.value = reset(7, 5);
  });

  const add = (i) => {
    storeData().data.push({
      in: data.value,
      out: [i],
    });
    Toast.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
      icon: 'success',
      title: 'Data added as ' + i + '!',
    });
    clearData();
  };
  const clear = () => {
    Toast.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        storeData().data = [];
        Toast.fire('Deleted!', 'Your data has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Toast.fire('Cancelled', 'Your data is safe :)', 'error');
      }
    });
  };
</script>

<template>
  <section class="grid grid-cols-3 m-10 gap-5">
    <Board class="col-start-1 col-span-2" v-model="data" />

    <div class="flex col-start-1 col-span-2 gap-2 justify-center">
      <BaseButton @click="add(i - 1)" v-for="i in 10">{{ i - 1 }}</BaseButton>
    </div>
    <div class="col-start-1 col-span-2 text-center">
      There are already
      <span class="font-semibold underline underline-offset-4">{{ store.data.length }}</span>
      training data.
    </div>

    <div class="col-start-3 row-start-1">
      <json-viewer :value="store.data" copyable="true" boxed theme="jv-dark"></json-viewer>
      <div class="flex justify-center">
        <BaseButton class="mt-5" @click="clear">Clear data!</BaseButton>
      </div>
    </div>
  </section>
</template>
