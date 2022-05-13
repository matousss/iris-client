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
                '1/5': '20%',
                '1/2': '50%',
                '3/5': '60%',
            },
            maxHeight: {
                '4/5': '80%',
            },
            width: {
                '70-screen': '70vw',
                '80-screen': '80vw',
                '90-screen': '90vw',
            },
            height: {
                '70-screen': '70vh',
                '80-screen': '80vh',
                '90-screen': '90vh',
            },
            colors: {
                primary: withOpacity('--color-primary'),
                secondary: withOpacity('--color-secondary'),
                'ptext': withOpacity('--color-ptext'),
                warning: withOpacity('--color-warning'),
                middle: withOpacity('--color-middle'),

            },
            animation: {
                'spin-slow': 'spin 4s linear infinite',
                'pulse-fast': 'pulse 1500ms linear infinite',
                'flip': 'flip 300ms linear 1',
                'shake': 'shake 300ms linear 1',
                'rotate-logo': 'rotate-center 1200ms ease-in-out infinite both',
                'appear': 'appear 500ms linear 1'
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
                },
                appear: {
                    '0%': {
                        opacity: '0%',
                    },
                    '100%': {
                      opacity: '100%',
                    },
                }
            }
        },

    },
    plugins: [
        require('@tailwindcss/line-clamp'),
    ],
}
