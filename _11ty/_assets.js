// Local Plugins
const remoteImages = require('./transformers/remote-images');
const imgDim = require('./transformers/img-dim.js');
const jsonLD = require('./transformers/json-ld.js');
const optimizeHtml = require('./transformers/optimize-html.js');
const applyCSP = require('./transformers/apply-csp.js');

module.exports = function (eleventyConfig, pluginConfig) {
  const { imageConfig } = pluginConfig;

  eleventyConfig.addPlugin(imgDim);
  eleventyConfig.addPlugin(jsonLD);
  eleventyConfig.addPlugin(optimizeHtml);
  eleventyConfig.addPlugin(applyCSP);

  // Image config will pass from outside plugin
  eleventyConfig.addPlugin(remoteImages, imageConfig);
};
