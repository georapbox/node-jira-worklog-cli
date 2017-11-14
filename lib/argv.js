const pkg = require('../package.json');

module.exports = require('yargs')
  .usage(`${pkg.description}\n\nUsage: $0 [options...]`)
  .version(() => `v${pkg.version}`)
  .option('s', {
    alias: 'silent',
    describe: 'Print only the worklogs sum',
    default: false
  })
  .option('m', {
    alias: 'month',
    describe: 'Print worklogs for current month',
    default: false
  })
  .option('w', {
    alias: 'week',
    describe: 'Print worklogs for current week',
    default: false
  })
  .option('d', {
    alias: 'day',
    describe: 'Print worklogs for current day',
    default: false
  })
  .option('v', {
    alias: 'version',
    describe: 'Show version number'
  })
  .option('h', {
    alias: 'help'
  })
  .option('i', {
    alias: 'insecure'
  })
  .help('h')
  .epilogue('More info at https://github.com/georapbox/node-jira-worklog-cli')
  .argv;
