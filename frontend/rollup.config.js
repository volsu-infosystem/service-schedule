import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import url from '@rollup/plugin-url';
import svelte from 'rollup-plugin-svelte';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { string } from 'rollup-plugin-string';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';
import sveltePreprocess from 'svelte-preprocess';
import seqPreprocessor from 'svelte-sequential-preprocessor';
import svgicons from 'rollup-plugin-svg-icons';
import optimizeImages from './plugins/optimizeImages';

const preprocess = seqPreprocessor([
  sveltePreprocess({
    postcss: true,
    sass: true,
  }),
]);

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const optimize = process.env.OPTIMIZE == 'true';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) => {
  if (warning.message.includes('swiper')) return;

  return (
    (warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
    (warning.code === 'CIRCULAR_DEPENDENCY' &&
      /[/\\]@sapper[/\\]/.test(warning.message)) ||
    onwarn(warning)
  );
};

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),

      svelte({
        dev,
        hydratable: true,
        emitCss: true,
        preprocess,
        css: css => {
          css.write('static/bundle.css');
        },
      }),

      svgicons({
        inputFolder: 'src/icons',
        output: 'static/bundle.svg',
        cleanDefs: false,
        cleanSymbols: false,
        svgAttrs: true,
        symbolAttrs: false,
        copyAttrs: true,
        renameDefs: false,
      }),

      url({
        sourceDir: path.resolve(__dirname, 'src/node_modules/img'),
        publicPath: '/client/',
      }),

      resolve({
        browser: true,
        dedupe: ['svelte'],
      }),

      commonjs(),

      string({
        include: './src/node_modules/*.vrtx',
      }),

      legacy &&
        babel({
          extensions: ['.js', '.mjs', '.html', '.svelte'],
          babelHelpers: 'runtime',
          exclude: ['node_modules/@babel/**'],
          presets: [
            [
              '@babel/preset-env',
              {
                targets: '> 0.25%, not dead',
              },
            ],
          ],
          plugins: [
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-transform-arrow-functions',
            [
              '@babel/plugin-transform-runtime',
              {
                useESModules: true,
              },
            ],
          ],
        }),

      !dev &&
        terser({
          module: true,
        }),
    ],

    preserveEntrySignatures: false,
    onwarn,
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      replace({
        'process.browser': false,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),

      svelte({
        generate: 'ssr',
        hydratable: true,
        emitCss: true,
        dev,
        preprocess,
        css: css => {
          css.write('static/bundle.css');
        },
      }),

      url({
        sourceDir: path.resolve(__dirname, 'src/node_modules/img'),
        publicPath: '/client/',
        emitFiles: false, // already emitted by client build
      }),

      resolve({
        dedupe: ['svelte'],
      }),

      commonjs(),

      string({
        include: './src/node_modules/*.vrtx',
        include: './src/components/background/circles/*.svg',
      }),

      optimize && optimizeImages(),
    ],
    external: Object.keys(pkg.dependencies).concat(
      require('module').builtinModules,
    ),

    preserveEntrySignatures: 'strict',
    onwarn,
  },

  serviceworker: {
    input: config.serviceworker.input(),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      commonjs(),
      !dev && terser(),
    ],

    preserveEntrySignatures: false,
    onwarn,
  },
};
