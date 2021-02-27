// Remote plugins
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginNavigation = require('@11ty/eleventy-navigation');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

// Local Plugins
const remoteImages = require('./remote-images');
const imgDim = require('./img-dim.js');
const jsonLD = require('./json-ld.js');
const optimizeHtml = require('./optimize-html.js');
const applyCSP = require('./apply-csp.js');

module.exports = function (eleventyConfig, pluginConfig) {
  const { imageConfig } = pluginConfig;

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(imgDim);
  eleventyConfig.addPlugin(jsonLD);
  eleventyConfig.addPlugin(optimizeHtml);
  eleventyConfig.addPlugin(applyCSP);

  // Image config will pass from outside plugin
  eleventyConfig.addPlugin(remoteImages, imageConfig);
};
