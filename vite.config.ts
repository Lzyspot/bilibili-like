import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  publicPath: '/',
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
        additionalData: '@container-width: 90%;@bg1: #fff;@bg2: #f1f2f3;@bg3: #00a1d6;@bg4: #00AEEC;@bg5: #fb7299ff;'
      }
    }
  },
  // 添加构建配置
  build: {
    // 禁用缓存确保构建最新代码
    emptyOutDir: true,
    // 设置导出文件夹为 dist/html
    outDir: 'dist/html',
    // 配置代码分割
    chunkSizeWarningLimit: 1024,

    rollupOptions: { 
      inlineDynamicImports: false,
    }
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