const rap = require('./rap');

const none = 0;
const error = 1;
const info = 2;
const debug = 3;
const trace = 4;
const levels = {
  none,
  error,
  info,
  debug,
  trace,
};
const defaultLevel = Object.getOwnPropertyNames(levels)[0];
let currentLevel = defaultLevel;
function getCurrentLevelInt() {
  return levels[currentLevel];
}

const log = { };
log.getCurrentLevel = () => {
  return Object.keys(levels)[getCurrentLevelInt()];
};
log.setLevel = newLevel => {
  let level = newLevel || process?.env?.LOG_LEVEL;
  const possibleDefault = currentLevel || defaultLevel;
  if (level) level = level.toLowerCase();
  if (!level || Object.keys(levels).includes(level) == false) {
    console.warn(`The specified level ${level} is not valid. Defaulting to ${possibleDefault}.`);
    level = possibleDefault;
  }
  currentLevel = level;
};
log.log = (message, args) => {
  console.log(`${currentLevel.toUpperCase()} - ${message}`, ...args);
}
log.error = (message, ...args) => {
  if (getCurrentLevelInt() >= error) {
    console.error(`${currentLevel.toUpperCase()} - ${message}`, ...args);
  }
}
log.info = (message, ...args) => {
  if (getCurrentLevelInt() >= info) {
    log.log(message, args);
  }
}
log.debug = (message, ...args) => {
  if (getCurrentLevelInt() >= debug) {
    log.log(message, args);
  }
}
log.trace = (message, ...args) => {
  if (getCurrentLevelInt() >= trace) {
    log.log(message, args);
  }
}
log.rap = () => {
  const bars = rap.freestyle(rap.defaultBars);
  for (const bar of bars) {
    log.debug(bar);
  }
};
module.exports = {
  ...log
};
