# Rappy Log

Wraps console log methods so you can set the current log level to only log what you want in the current environment. This is useful for debugging in something like React Native.

# Getting started

Add it to your app:
```
yarn add rappy-log
```

Usage:
```javascript
const log = require('rappy-log');

const levels = [
  'none',
  'error',
  'info',
  'debug',
  'trace',
];

for (let logCount = 0; logCount < levels.length; logCount++) {
  let msg = `should log ${logCount} time${logCount > 1 ? 's' : ''}`;
  log.setLevel(levels[logCount]);
  console.log('current level:', log.getCurrentLevel());
  log.error(msg);
  log.info(msg);
  log.debug(msg);
  log.trace(msg);
}
```
Outputs:
```
current level: none
current level: error
ERROR - should log 1 time
current level: info
INFO - should log 2 times
INFO - should log 2 times
current level: debug
DEBUG - should log 3 times
DEBUG - should log 3 times
DEBUG - should log 3 times
current level: trace
TRACE - should log 4 times
TRACE - should log 4 times
TRACE - should log 4 times
TRACE - should log 4 times
```

## Environment variable

You can also set the log level with an environment variable (see (12-factor)[https://12factor.net/config] for more information).

If you had this app:
```js
# app.js
const log = require('rappy-log');

log.setLevel(); // if no level parameter is passed, tries to get level from environment

// dope freestyling starts to drop
log.error('And money on the wood');
log.debug('We made a promise and it\'s understood');
```

Now start the app:
```zsh
LOG_LEVEL=error node app.js
> And money on the wood
```
