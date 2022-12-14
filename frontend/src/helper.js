import * as modal from 'sweetalert2';

export const Toast = modal.mixin({
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
