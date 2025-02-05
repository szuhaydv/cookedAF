import type { Config } from 'tailwindcss';

export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],

    theme: {
        extend: {
            fontFamily: {
                lobster: "Lobster",
                inter: "Inter"
            },
            boxShadow: {
                'default': '6px 6px 4px'
            },
            colors: {
                'default-red': '#FF1B1C'
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
