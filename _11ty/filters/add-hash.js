const fs = require('fs');
const hasha = require('hasha');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

module.exports = function (absolutePath, callback) {
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
};
