import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { join } from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@myHooks': join(__dirname, 'src/hooks'),
      '@myComponents': join(__dirname, 'src/components'),
      '@myUtils': join(__dirname, 'src/utils'),
      '@myStore': join(__dirname, 'src/store'),
      '@myTypes': join(__dirname, 'src/types'),
      '@myPages': join(__dirname, 'src/pages'),
      '@myAssets': join(__dirname, 'src/assets'),
      '@myConstants': join(__dirname, 'src/constants'),
    }
  },
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: "accounting",
      short_name: "accounting",
      description: "Record every bill",
      theme_color: "#242424",
      background_color: "#242424",
      icons: [
        {
          src: "/pwa-64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    devOptions: {
      enabled: true
    },
  })],
  css: {
    preprocessorOptions: {
      less: {
        math: "always",
      },
    },
  }
})
