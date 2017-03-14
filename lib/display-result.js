const ttyTable = require('tty-table');
const chalk = require('chalk');

module.exports = function displayResult(res) {
  const {processed, total} = res;

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
