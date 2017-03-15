# :clock9: node-jira-worklog-cli

A Node.js interactive terminal tool to calculate and report Jira work logs for a given time period.

*`node-jira-worklog-cli` was created for personal usage mostly, therefore is not published on [npm](https://www.npmjs.com/), but I thought I should share in case someone finds it handy.*

## Install

Download and install dependencies:

```sh
$ git clone https://github.com/georapbox/node-jira-worklog-cli.git
$ cd node-jira-worklog-cli/
$ npm install
```

Run:
```sh
$ npm start
```

You can install the package globally, by navigating to the project's root folder and running:
```sh
$ npm install -g
```

Then you can run the tool from anywhere by executing:
```sh
$ node-jira-worklog-cli
```

Print worklogs for running week:

`$ npm start -- --weekly` or `$ node-jira-worklog-cli --weekly` depending on the type of installation.

Print worklogs for running month:

`$ npm start -- --monthly` or `$ node-jira-worklog-cli --monthly` depending on the type of installation.

Print only the work logs sum, omitting the rest information:

`$ npm start -- --silent` or `$ node-jira-worklog-cli --silent` depending on the type of installation.

## Notes

- `node-jira-worklog-cli` by default saves the latest user's inputs for convenience and pre populates them so that you don't need all this info every time you run it.

## Screenshot

![Terminal Application Example](screenshots/screenshot.png)
