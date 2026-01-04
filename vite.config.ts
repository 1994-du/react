import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
export default defineConfig({
  plugins: [react(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      svgoOptions: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server:{
    port: 3004,
    headers:{
      'Access-Control-Allow-Origin': '*',
    },
    proxy:{
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
