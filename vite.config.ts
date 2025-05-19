import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'node_modules')
    }
  },
  server: {
    host: '0.0.0.0', // 服务器地址
    port: 5173 as unknown as number, // 服务器端口号
    hmr: true, // 启用热更新
  },

})
