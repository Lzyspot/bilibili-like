import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@container-width: 90%;'
      }
    }
  },
  // 添加构建配置
  build: {
    // 禁用缓存确保构建最新代码
    emptyOutDir: true,
    // 设置导出文件夹为 dist/html
    outDir: 'dist/html'
  },
  server: {
    // 配置服务启动时是否运行
    // open: true,
    // // 配置启动时是否进行域名解析
    // host: true,
    // // 配置启动时是否进行https服务
    // https: false,
    port: 8686
  },
})