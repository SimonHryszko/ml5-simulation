import * as modal from 'sweetalert2';
import data from './views/colorClassification/data.json';

export const Toast = modal.mixin({
    toast: true,
    position: 'bottom',
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

export const CLASS = {
    CORE: {
        LAYOUT: {
            WRAPPER: 'flex flex-col md:flex-row justify-around items-center',
            BOX: 'bg-teal-700 shadow-teal-700 shadow-lg border-teal-700 border-2 border-dashed rounded-lg w-11/12 p-2 my-1',
        },
    },
};
