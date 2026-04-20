import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      // Standard-Output Ordner ist 'build'
      pages: 'build',
      assets: 'build',
      fallback: '404.html', // Wichtig für Single Page Apps (SPA)
      precompress: false,
      strict: true
    }),
    paths: {
      // ERSETZE 'shopfner' mit deinem exakten Repository-Namen
      base: process.env.NODE_ENV === 'production' ? '/shopfner' : '',
	  relative: false
    }
  }
};

export default config;