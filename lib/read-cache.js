const fs = require('fs');

module.exports = function readCache(path) {
  try {
    return JSON.parse(fs.readFileSync(path).toString());
  } catch (err) {
    return {};
  }
};
