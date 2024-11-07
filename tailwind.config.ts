import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'sans-serif']
      }
    }
  },

  plugins: []
} satisfies Config;
