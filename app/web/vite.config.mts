import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

const here = import.meta.dirname;
const root = path.resolve(here, '..');

// Resolve platform files first: Foo.web.tsx beats Foo.tsx.
const extensions = [
  '.web.tsx',
  '.web.ts',
  '.web.js',
  '.tsx',
  '.ts',
  '.js',
  '.json',
];

export default defineConfig(({mode}) => ({
  root: here,
  plugins: [react()],
  resolve: {
    extensions,
    alias: [
      // Bare `react-native` -> react-native-web (+ one stub, see the shim).
      {
        find: /^react-native$/,
        replacement: path.resolve(here, 'shims/react-native.ts'),
      },
      // react-native-svg imports RN's asset registry; RNW ships an equivalent.
      {
        find: '@react-native/assets-registry/registry',
        replacement: 'react-native-web/dist/modules/AssetRegistry/index.js',
      },
    ],
  },
  define: {
    __DEV__: JSON.stringify(mode !== 'production'),
    // react-native-screens reads `global.*`, which only exists in Metro/Node.
    global: 'globalThis',
  },
  optimizeDeps: {
    rolldownOptions: {resolve: {extensions}},
  },
  server: {fs: {allow: [root]}},
  build: {outDir: path.resolve(root, 'dist/web'), emptyOutDir: true},
}));
