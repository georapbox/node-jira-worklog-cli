const chalk = require('chalk');

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
    q: chalk.bold.blue('Start date (yyyy-mm-dd): ')
  },
  endDate: {
    q: chalk.bold.blue('End date (yyyy-mm-dd): ')
  }
};
