import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  inject: ['src/lib/theme-ui-import.ts'],
  format: ['esm', 'cjs'],
  external: ['react'],
  dts: true,
})
