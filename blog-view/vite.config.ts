import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import viteCompression from 'vite-plugin-compression'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command } :ConfigEnv): UserConfig => {
  return {
    base: '/',
    plugins: [
      vue(),
      // 按需引入element-plus样式
      AutoImport({ resolvers: [ElementPlusResolver()] }),
      Components({ resolvers: [ElementPlusResolver()] }),
      viteCompression({
        verbose: true, // 是在控制台输出压缩结果
        disable: false, // 是否禁用
        filter: /\.(js|css|svg)$/, // 压缩文件类型
        threshold: 10240, // 体积大于 threshold 才会被压缩,单位 b
        algorithm: 'gzip', // 压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
        ext: '.gz', // 生成的压缩包后缀
      }),
    ],
    server: {
      host: '0.0.0.0',
      port: 5001,
      open: false,
      proxy: {
        '/api': {
          target: '自己的api接口',
          changeOrigin: false, // 开启代理
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@c': path.resolve(__dirname, 'src/components'),
        '@a': path.resolve(__dirname, 'src/assets'),
      },
    },
    // 生产环境打包配置
    build: {
      minify: 'terser',
      target: "modules",
      outDir: 'dist',
      // 取消计算文件大小，加快打包速度
      brotliSize: false,
      sourcemap: false, // 不生成sourcemap文件
      commonjsOptions: {
        requireReturnsDefault: 'namespace', // 要求ES模块返回其名称空间
      },
      terserOptions: {
        compress: {
          //生产环境时移除console
          // drop_console: command === 'build' && loadEnv(mode, __dirname).VITE_API_ENV === 'prod',
          // drop_debugger: command === 'build' && loadEnv(mode, __dirname).VITE_API_ENV === 'prod'
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
        },
      },
    }
  }
})
