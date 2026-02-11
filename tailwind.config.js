/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{html,js}",
    ],
    theme: {
        extend: {
            colors: {
                'herb-green': '#A4D65E',
                'herb-dark': '#000000',
                'herb-gray': '#000000',
                'herb-gold': '#FFD700',
            },
            fontFamily: {
                'bebas': ['Bebas Neue', 'sans-serif'],
                'inter': ['Inter', 'sans-serif'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 1s ease-out',
                'fade-in': 'fadeIn 0.5s ease-out',
                'fade-out': 'fadeOut 0.3s ease-out',
                'pulse-glow': 'pulseGlow 1s ease-in-out',
                'bounce-slow': 'bounce 2s infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(60px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeOut: {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(164, 214, 94, 0.5)' },
                    '50%': { boxShadow: '0 0 40px rgba(164, 214, 94, 0.9)' },
                },
            },
        },
    },
    plugins: [],
}
