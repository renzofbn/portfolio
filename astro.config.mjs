// @ts-check
import { defineConfig } from 'astro/config';
import { remarkAlert } from "remark-github-blockquote-alert";
import tailwindcss from '@tailwindcss/vite';
import lit from '@astrojs/lit';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  markdown: {
    remarkPlugins: [remarkAlert],
    shikiConfig: {
      theme: 'vitesse-dark',
    },
  },

  integrations: [lit()],
});