import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    coverage: {
      provider: "v8"
    }
  },
  build: {
    lib: {
      entry: "src/index.ts",
      name: "VueNestedMultiselect",
      fileName: "vue-nested-multiselect"
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  },
})
