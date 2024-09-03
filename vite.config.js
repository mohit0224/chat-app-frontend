import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "prompt",
			injectRegister: false,

			pwaAssets: {
				disabled: false,
				config: true,
			},

			manifest: {
				name: "\u0015Chat app",
				short_name: "Chat App",
				description: "\u0015Chat app",
				theme_color: "#ffffff",
			},

			workbox: {
				globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
				cleanupOutdatedCaches: true,
				clientsClaim: true,
			},

			devOptions: {
				enabled: false,
				navigateFallback: "index.html",
				suppressWarnings: true,
				type: "module",
			},
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		port: 3000,
		proxy: {
			"/api": {
				target: "https://chat-app-backend-pi-navy.vercel.app",
				changeOrigin: true,
			},
		},
	},
	build: {
		outDir: "dist", // Make sure this matches Vercel's settings
		sourcemap: true,
	},
});
