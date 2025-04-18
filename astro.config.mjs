import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
  integrations: [tailwind()],
  vite: {
    plugins: [
      Icons({
        compiler: 'astro',
        autoInstall: true,
      }),
    ],
  },
});
