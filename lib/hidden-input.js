const rl = require('./readline-interface');

module.exports = function hidden(query, callback) {
  const stdin = process.openStdin();
  let i = 0;
  const onDataHandler = function (char) {
    char = `${char}`;
    switch (char) {
      case '\n':
      case '\r':
      case '\u0004':
        stdin.removeListener('data', onDataHandler);
        break;
      default:
        process.stdout.write('\x1B[2K\x1B[200D' + `${query}[${(i % 2 === 1 ? '=-' : '-=')}]`);
        i++;
        break;
    }
  };

  process.stdin.on('data', onDataHandler);

  rl.question(query, function (value) {
    rl.history = rl.history.slice(1);
    callback(value);
  });
};
