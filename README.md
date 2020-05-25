# Rappy Log

Wraps console log methods so you can set the current log level to only log what you want in the current environment. This is useful for debugging in something like React Native.

# Getting started

Add it to your app:
```
yarn add rappy-log
```

Usage:
```javascript
const levels = [
  'none',
  'error',
  'info',
  'debug',
  'trace',
];

for (let index = 0; index < levels.length; index++) {
  let logCount = index + 1;
  let msg = `should log ${logCount} time${logCount > 1 ? 's' : ''}`;
  log.setLevel(levels[index]);
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
ERROR - should log 2 times
current level: info
INFO - should log 3 times
INFO - should log 3 times
current level: debug
DEBUG - should log 4 times
DEBUG - should log 4 times
DEBUG - should log 4 times
current level: trace
TRACE - should log 5 times
TRACE - should log 5 times
TRACE - should log 5 times
TRACE - should log 5 times
```
