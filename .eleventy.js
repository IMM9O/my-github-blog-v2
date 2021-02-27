/**
 * Copyright (c) 2020 Google Inc
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Copyright (c) 2018 Zach Leatherman
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// Libs
const { DateTime } = require('luxon');
const { promisify } = require('util');
const hasha = require('hasha');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

// Custom plugins
const blog = require('./_11ty/_blog');
const tagList = require('./_11ty/getTagList');
const GA_ID = require('./src/_data/metadata.json').googleAnalyticsId;

const fs = require('fs');
const execFile = promisify(require('child_process').execFile);

const readFile = promisify(fs.readFile);
const stat = promisify(fs.stat);

module.exports = function (eleventyConfig) {
  // ----------------------------------------------------------------------------
  // PLUGINS
  // ----------------------------------------------------------------------------
  const pluginConfig = {
    imageConfig: {
      distPath: '_site',
      assetPath: '/img/remote',
      selector:
        "img,amp-img,amp-video,meta[property='og:image'],meta[name='twitter:image'],amp-story",
      verbose: false,
    },
  };

  eleventyConfig.addPlugin(blog, pluginConfig);
  eleventyConfig.addPlugin(tagList);

  // ----------------------------------------------------------------------------
  // MARKDOWN
  // ----------------------------------------------------------------------------

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: 'direct-link',
    permalinkSymbol: '#',
  });

  eleventyConfig.setLibrary('md', markdownLibrary);

  // ----------------------------------------------------------------------------
  // FILTERS & SHORTCODES
  // ----------------------------------------------------------------------------
  eleventyConfig.addNunjucksAsyncFilter(
    'addHash',
    function (absolutePath, callback) {
      readFile(`_site${absolutePath}`, {
        encoding: 'utf-8',
      })
        .then((content) => {
          return hasha.async(content);
        })
        .then((hash) => {
          callback(null, `${absolutePath}?hash=${hash.substr(0, 10)}`);
        })
        .catch((error) => callback(error));
    }
  );

  async function lastModifiedDate(filename) {
    try {
      const { stdout } = await execFile('git', [
        'log',
        '-1',
        '--format=%cd',
        filename,
      ]);
      return new Date(stdout);
    } catch (e) {
      console.error(e.message);
      // Fallback to stat if git isn't working.
      const stats = await stat(filename);
      return stats.mtime; // Date
    }
  }
  // Cache the lastModifiedDate call because shelling out to git is expensive.
  // This means the lastModifiedDate will never change per single eleventy invocation.
  const lastModifiedDateCache = new Map();
  eleventyConfig.addNunjucksAsyncFilter(
    'lastModifiedDate',
    function (filename, callback) {
      const call = (result) => {
        result.then((date) => callback(null, date));
        result.catch((error) => callback(error));
      };
      const cached = lastModifiedDateCache.get(filename);
      if (cached) {
        return call(cached);
      }
      const promise = lastModifiedDate(filename);
      lastModifiedDateCache.set(filename, promise);
      call(promise);
    }
  );

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

  /*************** Manage assets ******************************************/
  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('css');
  // We need to copy cached.js only if GA is used
  eleventyConfig.addPassthroughCopy(GA_ID ? 'js' : 'js/*[!cached].*');
  eleventyConfig.addPassthroughCopy('fonts');
  eleventyConfig.addPassthroughCopy('_headers');

  // We need to rebuild upon JS change to update the CSP.
  eleventyConfig.addWatchTarget('./js/');
  // We need to rebuild on CSS change to inline it.
  eleventyConfig.addWatchTarget('./css/');

  // ----------------------------------------------------------------------------
  // ELEVENTY OPTIONS
  // ----------------------------------------------------------------------------
  // 👉 https://www.11ty.dev/docs/data-deep-merge/#data-deep-merge
  eleventyConfig.setDataDeepMerge(true);
  // Unfortunately this means .eleventyignore needs to be maintained redundantly.
  // But without this the JS build artefacts doesn't trigger a build.
  // 👉 https://www.11ty.dev/docs/ignores/#opt-out-of-using-.gitignore
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');
  // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync('_site/404.html');

        browserSync.addMiddleware('*', (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false,
  });

  return {
    templateFormats: ['md', 'njk', 'html', 'liquid'],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about those.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.io/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`
    // pathPrefix: "/",

    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',

    // These are all optional, defaults are shown:
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      // Warning hardcoded throughout repo. Find and replace is your friend :)
      output: '_site',
    },
  };
};
