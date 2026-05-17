import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		target: 'esnext',
		sourcemap: false,
		reportCompressedSize: true,
		minify: 'esbuild',
		// This app intentionally ships a few large precomputed data bundles for puzzle solvers.
		chunkSizeWarningLimit: 2000,
	},
	esbuild: {
		drop: ['console', 'debugger'],
	},
	optimizeDeps: {
		include: ['svelte', 'date-fns']
	}
});
