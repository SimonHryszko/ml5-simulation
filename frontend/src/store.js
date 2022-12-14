import { defineStore } from 'pinia';
import * as modal from 'sweetalert2';

const Toast = modal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', modal.stopTimer);
        toast.addEventListener('mouseleave', modal.resumeTimer);
    },
});

export const data = defineStore('data', {
    state: () => {
        return {};
    },
    actions: {
        load() {
            // Show info about loading
            modal.fire({
                title: 'Loading',
                text: 'App is loading please wait!',
                icon: 'info',
                allowOutsideClick: false,
                showConfirmButton: false,
            });

            // loading data

            modal.close();
            Toast.fire({
                icon: 'success',
                title: 'App loaded!',
            });
        },
    },
    persist: true,
});
