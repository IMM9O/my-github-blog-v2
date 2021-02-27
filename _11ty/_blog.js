// Remote plugins
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginNavigation = require('@11ty/eleventy-navigation');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

const remoteImages = require('./remote-images');
const imgDim = require('./img-dim.js');
const jsonLD = require('./json-ld.js');
const optimizeHtml = require('./optimize-html.js');
const applyCSP = require('./apply-csp.js');

module.exports = function (eleventyConfig, pluginConfig) {
  const { imageConfig, markdownConfig } = pluginConfig;
  /****** Plugins */
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(imgDim);
  eleventyConfig.addPlugin(jsonLD);
  eleventyConfig.addPlugin(optimizeHtml);
  eleventyConfig.addPlugin(applyCSP);

  // Image config will pass from outside plugin
  eleventyConfig.addPlugin(remoteImages, imageConfig);

  /* Markdown Overrides */
  let markdownLibrary = markdownIt(markdownConfig.html).use(
    markdownItAnchor,
    markdownConfig.link
  );

  eleventyConfig.setLibrary('md', markdownLibrary);
};
