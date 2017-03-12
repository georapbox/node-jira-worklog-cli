#!/usr/bin/env node

const readline = require('readline');
const Promise = require('bluebird');
const clear = require('./clear-stdout');
const getWorklog = Promise.promisify(require('./get-worklog'));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const rlQuestion = Promise.promisify(function (question, callback) {
  rl.question(question, callback.bind(null, null));
});

clear();
rl.write('jira.customedialabs.com');

const hostQuestion = rlQuestion('Host: ');
const usernameQuestion = hostQuestion.then(() => {
  rl.write('graptis');
  return rlQuestion('Username: ');
});
const passwordQuestion = usernameQuestion.then(() => {
  return rlQuestion('Psasword: ');
});
const startDateQuestion = passwordQuestion.then(() => {
  rl.write('2017-03-09');
  return rlQuestion('Start date: ');
});
const endDateQuestion = startDateQuestion.then(() => {
  rl.write('2017-03-10');
  return rlQuestion('End date: ');
});

Promise.join(hostQuestion, usernameQuestion, passwordQuestion, startDateQuestion, endDateQuestion, (host, username, password, start, end) => {
  getWorklog({host, username, password, start, end})
    .then(console.log)
    .catch(err => {
      throw err;
    });

  console.log('Please wait...');
  rl.close();
});
