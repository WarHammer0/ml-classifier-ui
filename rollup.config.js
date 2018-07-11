/* globals Promise */
import path from 'path';
import sass from 'node-sass';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss-modules';
import autoprefixer from 'autoprefixer';

export default {
  entry: './src/index.ts',
  output: {
    name: 'MLClassifierUI',
    file: './dist/index.js',
    format: 'umd',
  },
  plugins: [
    postcss({
      preprocessor: (content, id) => new Promise(resolve => {
        const result = sass.renderSync({ file: id });
        resolve({ code: result.css.toString() });
      }),
      extract: true,
      plugins: [autoprefixer()],
      writeDefinitions: true,
      modules: true,
      extensions: [
        '.css',
        '.scss',
      ],
      use: [
        [
          'sass',
          {
            includePaths: [
              path.resolve('node_modules'),
            ],
          },
        ],
      ],
    }),
    typescript({
    }),
  ],
};
