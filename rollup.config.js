import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-import-css';
import terser from '@rollup/plugin-terser';

const plugins = [nodeResolve(), commonjs(), css(), terser()];
export default [
  {
    input: './bin/annotative-code.js',
    output: {
      file: './bin/annotative-code.bundled.js',
      format: 'esm',
    },
    plugins,
  },
  {
    input: './bin/annotative-code-full.js',
    output: {
      file: './bin/annotative-code-full.bundled.js',
      format: 'esm',
    },
    plugins,
  },
  {
    input: './bin/annotative-code-common.js',
    output: {
      file: './bin/annotative-code-common.bundled.js',
      format: 'esm',
    },
    plugins,
  },
];
