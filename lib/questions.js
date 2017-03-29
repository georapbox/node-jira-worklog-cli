const chalk = require('chalk');
const dateFormat = require('./date-format');

module.exports = {
  host: {
    q: chalk.bold.blue('Host: ')
  },
  username: {
    q: chalk.bold.blue('Username: ')
  },
  password: {
    q: chalk.bold.blue('Password: '),
    hidden: true
  },
  startDate: {
    q: chalk.bold.blue(`Start date (${dateFormat}): `)
  },
  endDate: {
    q: chalk.bold.blue(`End date (${dateFormat}): `)
  }
};
