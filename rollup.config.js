import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';


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
    css({ output: 'style.css' }),
    css({ output: 'style_comic.css' }),
  ],
  external: ['moment'],
};