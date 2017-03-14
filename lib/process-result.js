const moment = require('moment');

module.exports = function processResult(res) {
  let sum = 0;

  const resultString = res[0].reduce((accum, current) => {
    const {startDate, issueKey, duration} = current;
    sum += duration;
    return accum += `${moment(startDate).format('MMM Do YYYY, h:mm a')} - ${issueKey}: ${duration / 3600}h\n`;
  }, '');

  return `${resultString}Summury: ${sum / 3600}h`;
};
