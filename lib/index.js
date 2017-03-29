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
const dateFormat = require('./date-format');
const cachePath = `${__dirname}/../.cache.json`;
const argv = require('yargs')
  .alias('s', 'silent').boolean('s')
  .alias('m', 'month').boolean('m')
  .alias('w', 'week').boolean('w')
  .alias('d', 'day').boolean('d')
  .argv;

const rlQuestion = Promise.promisify((question, callback) => {
  question.hidden
    ? hidden(question.q, callback.bind(null, null))
    : rl.question(question.q, callback.bind(null, null));
});

if (argv.month || argv.week || argv.day) {
  delete questions.startDate;
  delete questions.endDate;
}

Promise
  .each(Object.keys(questions), key => {
    clear();
    rl.write(readCache(cachePath)[key] || '');
    return questions[key] = rlQuestion(questions[key]);
  })
  .return(questions)
  .props()
  .then(answers => {
    switch (true) {
      case argv.month:
        answers.startDate = moment().startOf('month').format(dateFormat);
        answers.endDate = moment().endOf('month').format(dateFormat);
        break;
      case argv.week:
        answers.startDate = moment().startOf('week').format(dateFormat);
        answers.endDate = moment().endOf('week').format(dateFormat);
        break;
      case argv.day:
        answers.startDate = answers.endDate = moment().format(dateFormat);
        break;
      default: break;
    }

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
