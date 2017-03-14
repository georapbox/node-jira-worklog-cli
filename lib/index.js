#!/usr/bin/env node

const Promise = require('bluebird');
const clear = require('./clear-stdout');
const getWorklog = Promise.promisify(require('./get-worklog'));
const rl = require('./readline-interface');
const hidden = require('./hidden-input');
const questions = require('./questions');
const processResult = require('./process-result');
const displayResult = require('./display-result');

const rlQuestion = Promise.promisify(function (question, callback) {
  question.hidden
    ? hidden(question.q, callback.bind(null, null))
    : rl.question(question.q, callback.bind(null, null));
});

Promise
  .each(Object.keys(questions), function (key) {
    clear();
    rl.write(questions[key].a);
    return questions[key] = rlQuestion(questions[key]);
  })
  .return(questions)
  .props()
  .then(function (result) {
    clear();
    getWorklog(result)
      .then(processResult)
      .then(res => {
        clear();
        return displayResult(res);
      })
      .catch(err => {
        throw err;
      });

    process.stdout.write('Please wait...');
    rl.close();
  });
