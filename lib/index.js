#!/usr/bin/env node

const moment = require('moment');
const Promise = require('bluebird');
const clear = require('./clear-stdout');
const getWorklog = Promise.promisify(require('./get-worklog'));
const rl = require('./readline-interface');
const hidden = require('./hidden-input');
const questions = require('./questions');

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
      .then(res => {
        let sum = 0;

        const resultString = res[0].reduce((accum, current) => {
          sum += current.duration;
          return accum += `${moment(current.startDate).format('MMM Do YYYY, h:mm a')} - ${current.issueKey}: ${current.duration / 3600}h\n`;
        }, '');

        clear();

        return `${resultString}Summury: ${sum / 3600}h`;
      })
      .then(console.log)
      .catch(err => {
        throw err;
      });

    console.log('Please wait...');
    rl.close();
  });
