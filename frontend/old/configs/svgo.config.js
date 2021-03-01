const cleanupIDs = require('svgo/plugins/cleanupIDs');
const removeAttrs = require('svgo/plugins/removeAttrs');
const removeDimensions = require('svgo/plugins/removeDimensions');
const removeViewBox = require('svgo/plugins/removeViewBox');
const inlineStyles = require('svgo/plugins/inlineStyles');
const inlineDefs = require('@nuxtjs/svg-sprite/lib/plugins/inlineDefs.js');

function svgoPlugins() {
  removeAttrs.active = true;
  removeAttrs.params.attrs = 'svg:id';

  removeViewBox.active = false;
  removeDimensions.active = true;

  inlineStyles.active = true;
  inlineStyles.params.onlyMatchedOnce = false;

  return [
    removeDimensions,
    cleanupIDs,
    removeAttrs,
    removeViewBox,
    inlineStyles,
    { inlineDefs }, 
  ];
}

export { svgoPlugins };
