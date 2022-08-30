import { defineStore } from 'pinia';
import * as modal from 'sweetalert2';

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
            modal.fire({
                toast: true,
                title: 'Success',
                text: 'Data loaded successfully',
                icon: 'success',
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        },
    },
    persist: true,
});
