import data from '@/Models/color-classification/data.json';

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

export const rgbToHex = (r, g, b) => {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
