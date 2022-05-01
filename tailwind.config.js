function withOpacity(variable) {
    return ({opacityValue}) => {
        return opacityValue === undefined ? `rgb(var(${variable}))` : `rgba(var(${variable}), ${opacityValue})`;
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
            animation: {
                'spin-slow': 'spin 4s linear infinite',
                'pulse-fast': 'pulse 1500ms linear infinite',
                'flip': 'flip 300ms linear 1',
                'shake': 'shake 300ms linear 1',
            },
            keyframes: {
                flip: {
                    '0%': {transform: 'rotateY(180deg)'},
                    '100%': {transform: 'rotateY(360deg)'},
                },
                shake: {
                    '0%': {
                        transform: 'translateX(-5%)',

                    },

                    '50%': {
                        transform: 'translateX(5%)',
                    }
                }
            }
        },

    },
    plugins: [],
}
