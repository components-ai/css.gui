import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  inject: ['src/lib/theme-ui-import.ts'],
  format: ['esm'],
  external: ['react'],
  jsxFactory: 'jsx',
  dts: true,
})
