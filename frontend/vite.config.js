import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/api': 'http://localhost:3001',
			'/uploads': 'http://localhost:3001',
			'/save-data': 'http://localhost:3001',
			'/addpostwithpicture': 'http://localhost:3001',
			'/addreviewpostwithpicture': 'http://localhost:3001',
			'/upload': 'http://localhost:3001'
		}
	}
});
