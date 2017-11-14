const argv = require('./argv');
const https = require('https');
const http = require('http');

module.exports = function getWorklog(options, callback) {
  const {host, username, password, startDate, endDate} = options;

  const requestOptions = {
    method: 'GET',
    host: `${host}`,
    path: `/jira/rest/jira-worklog-query/1/find/worklogs?startDate=${startDate}&endDate=${endDate}&user=${username}`,
    auth: `${username}:${password}`
  };

  const httpModule = argv.insecure ? http : https;

  const request = httpModule.get(requestOptions, response => {
    const statusCode = response.statusCode;
    const contentType = response.headers['content-type'];

    let error;

    if (statusCode !== 200) {
      error = new Error(`Request Failed.\n` + `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error(`Invalid content-type.\n` + `Expected application/json but received ${contentType}`);
    }

    if (error) {
      callback(error);
      response.resume(); // consume response data to free up memory
      return;
    }

    response.setEncoding('utf8');
    let rawData = '';

    response
      .on('data', chunk => rawData += chunk)
      .on('end', () => {
        try {
          let parsedData = JSON.parse(rawData);
          callback(null, parsedData);
        } catch (err) {
          callback(err);
        }
      });
  });

  request.on('error', err => {
    callback(err);
  });

  return request;
};
