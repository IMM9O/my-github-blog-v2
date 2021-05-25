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

// Nodejs
const fs = require('fs');
// Custom plugins
const blog = require('./_11ty/_blog');
const assets = require('./_11ty/_assets');
// Config
const GA_ID = require('./src/_data/metadata.json').googleAnalyticsId;

module.exports = function (eleventyConfig) {
  // ----------------------------------------------------------------------------
  // PLUGINS
  // ----------------------------------------------------------------------------
  const pluginConfig = {
    imageConfig: {
      distPath: '_site',
      assetPath: '/assets/img/remote',
      selector:
        "img,amp-img,amp-video,meta[property='og:image'],meta[name='twitter:image'],amp-story",
      verbose: false,
    },
  };

  eleventyConfig.addPlugin(assets, pluginConfig);
  eleventyConfig.addPlugin(blog);

  /*************** Manage assets ******************************************/
  /** Server root files */
  eleventyConfig.addPassthroughCopy('_headers');

  /** Images & Fonts */
  eleventyConfig.addPassthroughCopy('assets/img');
  eleventyConfig.addPassthroughCopy('assets/fonts');

  /** JavaScript */
  // We need to rebuild upon JS change to update the CSP.
  // We need to copy cached.js only if GA is used
  eleventyConfig.addPassthroughCopy(GA_ID ? 'assets/js' : 'assets/js/*[!cached].*');
  eleventyConfig.addWatchTarget('./assets/js/');
  /** CSS */
  // We need to rebuild on CSS change to inline it.
  eleventyConfig.addPassthroughCopy('assets/css');
  eleventyConfig.addWatchTarget('./assets/css/');

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
