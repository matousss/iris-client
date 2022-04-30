function withOpacity(variable) {
    return ({ opacityValue }) => {
        console.log({opacityValue})
        return opacityValue===undefined ? `rgb(var(${variable}))` : `rgba(var(${variable}), ${opacityValue})`;
    }
}


module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            maxWidth: {
                '1/2': '50%',
                '3/5': '60%',
            },
            colors: {
                primary: withOpacity('--color-primary'),
                secondary: withOpacity('--color-secondary'),
                'text-1': withOpacity('--color-text-1'),

            },
        },

    },
    plugins: [],
}
