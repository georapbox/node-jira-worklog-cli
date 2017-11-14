# node-jira-worklog-cli

A Node.js interactive command line tool to calculate and report Jira work logs for a given time period.

*`node-jira-worklog-cli` was created for personal usage mostly, therefore is not published on [npm](https://www.npmjs.com/), but I thought I should share in case someone finds it handy.*

## Install

Download and install dependencies:

```sh
$ git clone https://github.com/georapbox/node-jira-worklog-cli.git
$ cd node-jira-worklog-cli/
$ npm install
```

## Run

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

## Options

|Option|Description|
|--|--|
|-i, --insecure|By default `https` protocol is used for requests. Use this option to override it and use the `http` protocol.|
|-s, --silent|Print only the worklogs sum, omitting the rest information|
|-m, --month|Print worklogs for current **month**|
|-w, --week|Print worklogs for current **week**|
|-d, --day|Print worklogs for current **day**|
|-v, --version|Show version number|
|-h, --help|Show help|

## Notes

- `node-jira-worklog-cli` by default saves the latest user's inputs for convenience and pre populates them so that you don't need to provide all this info every time you run it.

## Screenshot

![Application Example](screenshots/screenshot.png)
