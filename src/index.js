const https = require('https');
const readline = require('readline');

function clear() {
  process.stdout.write('\u001B[2J\u001B[0;0f');
}

function getWorklog(options) {
  const {host, username, password, start, end} = options;

  const requestOptions = {
    method: 'GET',
    host: `${host}`,
    path: `/jira/rest/jira-worklog-query/1/find/worklogs?startDate=${start}&endDate=${end}&user=${username}`,
    auth: `${username}:${password}`
  };

  https.get(requestOptions, res => {
    const statusCode = res.statusCode;
    const contentType = res.headers['content-type'];

    let error;

    if (statusCode !== 200) {
      error = new Error(`Request Failed.\n` + `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error(`Invalid content-type.\n` + `Expected application/json but received ${contentType}`);
    }

    if (error) {
      console.log(error.message);
      // consume response data to free up memory
      res.resume();
      return;
    }

    res.setEncoding('utf8');
    let rawData = '';

    res.on('data', chunk => rawData += chunk);

    res.on('end', () => {
      try {
        let parsedData = JSON.parse(rawData);
        console.log(parsedData);
      } catch (err) {
        console.log(err.message);
      }
    });
  }).on('error', err => {
    console.log(`Got error: ${err.message}`);
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

clear();
rl.write('jira.customedialabs.com');
rl.question('Host: ', host => {
  clear(); rl.write('graptis');
  rl.question('Username: ', username => {
    clear();
    rl.question('Password: ', password => {
      clear(); rl.write('2017-03-09');
      rl.question('Start date: ', start => {
        clear(); rl.write('2017-03-10');
        rl.question('End date: ', end => {
          clear();
          getWorklog({host, username, password, start, end});
          console.log('Please wait...');
          rl.close();
        });
      });
    });
  });
});
