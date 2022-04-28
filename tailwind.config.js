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
                primary: 'rgba(255,114,0,0.81)',
                secondary: '#7f3300',
            },
        },
    },
    plugins: [],
}
