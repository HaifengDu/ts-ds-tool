import fs from 'fs';
import path from 'path';
import { minify } from 'uglify-js';
import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import saveLicense from 'uglify-save-license';
import stripBanner from 'rollup-plugin-strip-banner';

// const copyright = fs.readFileSync(path.join('resources', 'COPYRIGHT'), 'utf-8');

const SRC_DIR = path.resolve('resource');
const DIST_DIR = path.resolve('dist');

export default {
  input: path.join(SRC_DIR, 'index.js'),
  output: {
    // banner: copyright,
    name: 'DataStructure',
    exports: 'named',
    file: path.join(DIST_DIR, 'data-structure.js'),
    format: 'umd',
    sourcemap: false,
  },
  transforms: { forOf: false },
  plugins: [
    commonjs(),
    json(),
    stripBanner(),
    buble({
      transforms: {
        dangerousForOf: true
      }
    }),
    {
      name: 'uglify',
      transformBundle(code) {
        const result = minify(code, {
          fromString: true,
          mangle: { toplevel: true },
          output: { max_line_len: 2048, comments: saveLicense },
          compress: { comparisons: true, pure_getters: true, unsafe: true },
        });

        if (!fs.existsSync(DIST_DIR)) {
          fs.mkdirSync(DIST_DIR);
        }

        fs.writeFileSync(
          path.join(DIST_DIR, 'data-structure.min.js'),
          result.code,
          'utf8'
        );
      },
    },
  ],
};
