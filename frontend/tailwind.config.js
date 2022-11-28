module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    red: '#FF5353',
                    blue: '#5364FF',
                    yellow: '#FFA653',
                },

                black: {
                    dark: '#161616',
                    DEFAULT: '#1A1A1A',
                },
            },
        },
    },
    plugins: [],
};
