import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: '/', // <-- obligatoire si projet dans localhost/real-estate
    plugins: [react(), imagetools()],

    server: {
      host: env.VITE_DEV_SERVER_HOST || 'localhost',
      port: parseInt(env.VITE_DEV_SERVER_PORT || '15108'),
      open: true,
    },

    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            router: ['react-router-dom'],
            icons: ['react-icons'],
          },
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        },
      },
      chunkSizeWarningLimit: 3500,
      target: 'esnext',
    },

    resolve: {
      alias: {
        '@': '/src',
      },
    },
  }
})
