const ttyTable = require('tty-table');
const chalk = require('chalk');
const argv = require('./argv');

module.exports = function displayResult(res) {
  const {processed, total} = res;

  if (argv.silent) {
    process.stdout.write(`Total Duration (h): ${chalk.bold.blue(total)}`);
    return res;
  }

  const header = [
    {alias: 'Task ID', value: 'issueKey', width: 25},
    {alias: 'Date', value: 'startDate', width: 30},
    {alias: 'Duration (h)', value: 'duration', width: 15, padding: 10}
  ];

  const footer = [chalk.bold('TOTAL'), '', chalk.bold(total)];

  const table = ttyTable(header, processed, footer);

  process.stdout.write(table.render());

  return res;
};
