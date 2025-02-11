import type { Config } from 'tailwindcss';

export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],

    theme: {
        extend: {
            fontFamily: {
                lobster: "Lobster",
                inter: "Inter",
                cheeseBread: "Cheese Bread",

            },
            boxShadow: {
                'default': '6px 6px 4px',
                'input': '16px 16px rgba(0,0,0,0.25)'
            },
            colors: {
                'red': '#FF1B1C',
                'yellow': '#FFCC00',
                'purple': '#DFBAF2',
                'green': '#9ED23B',
                'gray': '#A4A4A4',
                'light-yellow': '#FFEEA8',
                'light-gray': '#E7E7E7',
            },
            keyframes: {
                bouncing: {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                    '100%': { transform: 'scale(1)' },
                }
            },
            animation: {
                bouncing: 'bouncing 0.3s ease-out 1',
            }
        }
    },

    plugins: []
} satisfies Config;
