const fs = require('fs');

module.exports = function writeCache(path, data) {
  try {
    const dataCopy = Object.assign({}, data);
    delete dataCopy.password;
    fs.writeFileSync(path, JSON.stringify(dataCopy, null, 2));
  } catch (err) {}
};
