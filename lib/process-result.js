const moment = require('moment');

module.exports = function processResult(res) {
  let total = 0;

  const processed = res[0].reduce((accum, current) => {
    const {startDate, issueKey, duration} = current;

    total += duration;

    accum.push({
      issueKey,
      startDate: `${moment(startDate).format('MMM Do YYYY, h:mm a')}`,
      duration: (duration / 3600).toFixed(1)
    });

    return accum;
  }, []);

  return {
    processed,
    total: (total / 3600).toFixed(1)
  };
};
