import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	alias: {
		$components: path.resolve('./src/components'),
		$assets: path.resolve('./src/assets'),
	}
};

export default config;
