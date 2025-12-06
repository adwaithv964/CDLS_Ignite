/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#00A99D', // Teal color from image
                secondary: '#F15A29', // Orange color from image
                dark: '#1B2A41', // Dark blue/navy from image
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // Assuming Inter for now
            }
        },
    },
    plugins: [],
}
