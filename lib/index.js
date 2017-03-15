#!/usr/bin/env node

const Promise = require('bluebird');
const moment = require('moment');
const clear = require('./clear-stdout');
const getWorklog = Promise.promisify(require('./get-worklog'));
const rl = require('./readline-interface');
const hidden = require('./hidden-input');
const questions = require('./questions');
const processResult = require('./process-result');
const displayResult = require('./display-result');
const readCache = require('./read-cache');
const writeCache = require('./write-cache');
const cachePath = `${__dirname}/../.cache.json`;
const periodArgv = process.argv[2];

const rlQuestion = Promise.promisify((question, callback) => {
  question.hidden
    ? hidden(question.q, callback.bind(null, null))
    : rl.question(question.q, callback.bind(null, null));
});

Promise
  .each(Object.keys(questions), key => {
    clear();

    switch (true) {
      case periodArgv === 'weekly' && key === 'startDate':
        rl.write(moment().startOf('week').format('YYYY-MM-DD'));
        break;
      case periodArgv === 'weekly' && key === 'endDate':
        rl.write(moment().endOf('week').format('YYYY-MM-DD'));
        break;
      case periodArgv === 'monthly' && key === 'startDate':
        rl.write(moment().startOf('month').format('YYYY-MM-DD'));
        break;
      case periodArgv === 'monthly' && key === 'endDate':
        rl.write(moment().endOf('month').format('YYYY-MM-DD'));
        break;
      default:
        rl.write(readCache(cachePath)[key] || '');
    }

    return questions[key] = rlQuestion(questions[key]);
  })
  .return(questions)
  .props()
  .then(answers => {
    clear();
    process.stdout.write('Please wait...');
    rl.close();

    getWorklog(answers)
      .then(res => {
        clear();
        return res;
      })
      .then(processResult)
      .then(displayResult)
      .then(res => {
        writeCache(cachePath, answers);
        return res;
      })
      .catch(err => {
        clear();
        throw err;
      });
  });
