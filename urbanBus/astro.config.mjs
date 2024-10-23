import { defineConfig } from "astro/config";
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
			base: "/app",
			scope: "/app",
			includeAssets: ["favicon.svg"],
      		registerType: "autoUpdate",
			manifest: {
				name: "urbanBus",
				short_name: "urbanBus",
				description: "urbanBus is a public transportation app",
				theme_color: "#ffffff",
				display: "fullscreen",
				icons: [
					{
						src: 'appIcon192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'appIcon512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: 'appIcon512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable',
					},
					]
				},
			workbox: {
				navigateFallback: "/",
				globPatterns: ["**/*.{css,js,html,svg,png,ico,txt}"],
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
