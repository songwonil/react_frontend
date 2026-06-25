import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // React 개발 서버 포트 고정
    proxy: {
      // 프론트엔드에서 '/insa'로 시작하는 모든 API 요청을 톰캣 서버(8080) 주소로 우회시킵니다.
      '/insa': {
        target: 'http://localhost:8080', 
        changeOrigin: true,              
        secure: false ,
      }
    }
  }
})