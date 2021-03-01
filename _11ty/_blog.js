/**
 * This plugins will collect all every programmer blog need to manage content for managing assets (img,fonts,css and js)
 * See _assets plugin
 */

// Libs
const { DateTime } = require('luxon');

// Remote plugins
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginNavigation = require('@11ty/eleventy-navigation');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

// Local plugins
const markdownIt = require('./plugins/markdown-it');
const tagList = require('./collections/getTagList');

// Filters
const addHash = require('./filters/add-hash');
const lastModifiedDate = require('./filters/last-modified-date');
const readTime = require('./filters/read-time');

module.exports = function (eleventyConfig) {
  // ----------------------------------------------------------------------------
  // Plugins
  // ----------------------------------------------------------------------------

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  eleventyConfig.addPlugin(tagList);
  eleventyConfig.addPlugin(markdownIt);

  // ----------------------------------------------------------------------------
  // FILTERS & SHORTCODES
  // ----------------------------------------------------------------------------

  eleventyConfig.addNunjucksAsyncFilter('addHash', addHash);
  eleventyConfig.addNunjucksAsyncFilter('lastModifiedDate', lastModifiedDate);

  eleventyConfig.addFilter('readTime', readTime);
  /** Filters: Various template engines can be extended with custom filters to modify content */
  eleventyConfig.addFilter('encodeURIComponent', function (str) {
    return encodeURIComponent(str);
  });
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
      'dd LLL yyyy'
    );
  });
  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });
  eleventyConfig.addFilter('sitemapDateTimeString', (dateObj) => {
    const dt = DateTime.fromJSDate(dateObj, { zone: 'utc' });
    if (!dt.isValid) {
      return '';
    }
    return dt.toISO();
  });
};
