import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    resolve: {
      alias: {
        src: "/src",
      },
    },
    define: {
      VITE_API_PORT: JSON.stringify(env.VITE_API_PORT)
    }
  }
})
