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

const rlQuestion = Promise.promisify(function (question, callback) {
  rl.question(question, callback.bind(null, null));
});

Promise.each(Object.keys(questions), function (key) {
  clear();
  rl.write(questions[key].a);
  return questions[key] = rlQuestion(questions[key].q);
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
