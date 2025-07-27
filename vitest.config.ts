import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'build/',
        '**/*.d.ts',
        '**/*.test.ts',
        '**/*.spec.ts',
        'test/',
        '**/test/**'
      ]
    }
  },
  resolve: {
    alias: {
      '@alissa/core': resolve(__dirname, './packages/core/src'),
      '@alissa/shared': resolve(__dirname, './packages/shared/src'),
      '@alissa/database': resolve(__dirname, './packages/database/src'),
      '@alissa/kafka': resolve(__dirname, './packages/kafka/src'),
      '@alissa/monitoring': resolve(__dirname, './packages/monitoring/src'),
      '@alissa/providers': resolve(__dirname, './packages/providers/src'),
      '@alissa/services': resolve(__dirname, './packages/services/src'),
      '@alissa/tools': resolve(__dirname, './packages/tools/src')
    }
  }
})
