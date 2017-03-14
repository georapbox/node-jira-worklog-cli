#!/usr/bin/env node

const readline = require('readline');
const Promise = require('bluebird');
const clear = require('./clear-stdout');
const getWorklog = Promise.promisify(require('./get-worklog'));
const questions = require('./questions');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function hidden(query, callback) {
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
}

const rlQuestion = Promise.promisify(function (question, callback) {
  if (question.hidden) {
    hidden(question.q, callback.bind(null, null));
  } else {
    rl.question(question.q, callback.bind(null, null));
  }
});

Promise.each(Object.keys(questions), function (key) {
  clear();
  rl.write(questions[key].a);
  return questions[key] = rlQuestion(questions[key]);
}).return(questions).props().then(function (result) {
  getWorklog(result)
    .then(res => {
      let sum = 0;
      const str = res[0].reduce((accum, current) => {
        sum += current.duration;
        return accum += `${current.startDate}: ${current.duration / 3600}h\n`;
      }, '');
      return `${str}Summury: ${sum / 3600}h\n`;
    })
    .then(console.log)
    .catch(err => {
      throw err;
    });

  console.log('Please wait...');
  rl.close();
});
