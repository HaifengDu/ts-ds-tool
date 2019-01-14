// import fs from 'fs';
import path from 'path';
import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import stripBanner from 'rollup-plugin-strip-banner';

// const copyright = fs.readFileSync(path.join('resources', 'COPYRIGHT'), 'utf-8');

const SRC_DIR = path.resolve('resource');
const DIST_DIR = path.resolve('dist');

export default {
  input: path.join(SRC_DIR, 'index.js'),
  output: {
    // banner: copyright,
    name: 'DataStructure',
    file: path.join(DIST_DIR, 'data-structure.es.js'),
    format: 'es',
    sourcemap: false,
  },
  transforms: { forOf: false },
  plugins: [commonjs(), json(), stripBanner(),  buble({
    transforms: {
      dangerousForOf: true
    }
  })],
};
