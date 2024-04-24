import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind(),
		react(),
		AstroPWA({
			mode: "development",
			base: "/",
			scope: "/",
			includeAssets: ['favicon.svg'],
      		registerType: 'autoUpdate',
			manifest: {
				name: "UrbanBus",
				short_name: "UrbanBus",
				description: "UrbanBus is a public transportation app",
				theme_color: "#ffffff",
				display: "fullscreen",
				icons: [
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable',
					},
					]
				},
			workbox: {
				navigateFallback: '/',
				globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
				},
			devOptions: {
				enabled: true,
				navigateFallbackAllowlist: [/^\//],
				},
			experimental: {
				directoryAndTrailingSlashHandler: true,
				}

			})],
	devToolbar: { enabled: false }
});
