import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// const path = require('path')
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "primary-color": "#1ecf9e"
        },
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  },
  plugins: [vue()],
  server: {
    proxy: {
      // 字符串简写方式
      // '/api': 'http://localhost:9000'
      // 选项写法
      '/api': {
        target: 'http://localhost:3300', // 所要代理的目标地址
        rewrite: path => path.replace(/^\/api/, ''), // 重写传过来的path路径，比如 `/api/index/1?id=10&name=zs`（注意:path路径最前面有斜杠（/），因此，正则匹配的时候不要忘了是斜杠（/）开头的；选项的 key 也是斜杠（/）开头的）
        changeOrigin: true,  // true/false, Default: false - changes the origin of the host header to the target URL
      }
    },
    open:true,
  },


})
