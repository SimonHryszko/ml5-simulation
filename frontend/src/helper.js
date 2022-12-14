import * as modal from 'sweetalert2';
import data from './views/colorClassification/data.json';

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

export const getColor = (params = {}) => {
    let color = data.filter((item) => item.color === params.name);

    if (color.length > 0) {
        color = color[0];
    } else {
        color = { r: 0, g: 0, b: 0 };
    }

    if (params.type == 'rgba' || !params.type) {
        return `rgba(${color.r}, ${color.g}, ${color.b}, ${params.transparency || 1})`;
    }
};
