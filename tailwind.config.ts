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
            }
        }
    },

    plugins: []
} satisfies Config;
