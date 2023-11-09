import { defineConfig } from 'vitest/config';
import { resolve } from "path";
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "happy-dom"
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
