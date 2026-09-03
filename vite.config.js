import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  cacheDir: 'node_modules/.vite-v3', // Fresh cache dir — new chunk names/hashes bust browser HTTP cache
  logLevel: 'error', // Suppress warnings, only show errors
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router-dom', 'react/jsx-runtime'],
  },
  plugins: [
    base44({
      // Support for legacy code that imports the base44 SDK with @/integrations, @/entities, etc.
      // can be removed if the code has been updated to use the new SDK imports from @base44/sdk
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: true,
      navigationNotifier: true,
      visualEditAgent: true
    }),
    react(),
  ],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react-router-dom',
      '@tanstack/react-query',
      'framer-motion',
      'xlsx',
      'recharts',
      'react-leaflet',
      'three',
      '@hello-pangea/dnd',
      'react-quill',
      'jspdf',
      'html2canvas',
      'qrcode',
      ...[
        '@radix-ui/react-accordion',
        '@radix-ui/react-alert-dialog',
        '@radix-ui/react-aspect-ratio',
        '@radix-ui/react-avatar',
        '@radix-ui/react-checkbox',
        '@radix-ui/react-collapsible',
        '@radix-ui/react-context-menu',
        '@radix-ui/react-dialog',
        '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-hover-card',
        '@radix-ui/react-label',
        '@radix-ui/react-menubar',
        '@radix-ui/react-navigation-menu',
        '@radix-ui/react-popover',
        '@radix-ui/react-progress',
        '@radix-ui/react-radio-group',
        '@radix-ui/react-scroll-area',
        '@radix-ui/react-select',
        '@radix-ui/react-separator',
        '@radix-ui/react-slot',
        '@radix-ui/react-switch',
        '@radix-ui/react-tabs',
        '@radix-ui/react-toast',
        '@radix-ui/react-toggle',
        '@radix-ui/react-toggle-group',
        '@radix-ui/react-tooltip',
      ],
    ],
  },
  server: {
    headers: {
      // no-store on the HTML document ensures Vite always serves fresh entry HTML;
      // chunks already carry ?v= hashes so they cache safely without stale issues.
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  },
  build: {
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-charts': ['recharts'],
          'vendor-xlsx': ['xlsx'],
          'vendor-pdf': ['jspdf', 'html2canvas'],
          'vendor-motion': ['framer-motion'],
          'vendor-leaflet': ['react-leaflet'],
          'vendor-three': ['three'],
          'vendor-dnd': ['@hello-pangea/dnd'],
          'vendor-quill': ['react-quill'],
        },
      },
    },
  },
});