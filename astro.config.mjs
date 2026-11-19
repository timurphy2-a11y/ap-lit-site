// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath, URL } from 'node:url';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import rehypeThreadIds from './plugins/rehype-thread-ids.mjs';
import smartPunctBuild from './plugins/smart-punct-build.mjs';
import rehypeSmartPunct from './src/lib/smart-punct.mjs';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [react(), mdx({ rehypePlugins: [rehypeThreadIds, rehypeSmartPunct] }), smartPunctBuild()],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      },
    },
  },

  adapter: cloudflare(),
});