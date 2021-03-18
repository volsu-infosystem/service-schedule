export default options => {
  const plugins = [require('postcss-preset-env')()];

  if (options.isProd) {
    plugins.push(require('cssnano')({ autoprefixer: false }));
  }

  return plugins;
};
