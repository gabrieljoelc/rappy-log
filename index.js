const error = 0;
const info = 1;
const debug = 2;
const trace = 3;
const levels = {
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
  currentLevel = (newLevel || currentLevel || defaultLevel);
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
module.exports = {
  ...log
};
