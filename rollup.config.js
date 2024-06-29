import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';


export default {
  input: {
    main: 'src/script.ts',
    comic: 'src/script_comic.ts',
  },
  output: {
    dir: 'dist',
    format: 'es',
    entryFileNames: '[name].bundle.js',
    chunkFileNames: '[name]-[hash].js',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    terser(),
  ],
  external: ['moment'],
};