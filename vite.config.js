import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
    //   {
    //   template: {
    //     compilerOptions: {
    //       // isCustomElement: (tag) => tag === 'swiper-container' || tag === 'swiper-slide',
    //       ignoreElements: [/^swiper-/]
    //     }
    //   }
    // }
  ],
  base: '/RECA-Bookstore/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
