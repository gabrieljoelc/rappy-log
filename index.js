import { freestyle, defaultBars } from './rap.js';

const levels = {
  none: 0,
  error: 1,
  info: 2,
  debug: 3,
  trace: 4,
};

let currentLevel = levels[process?.env?.LOG_LEVEL?.toLowerCase()] || levels.none;

export function setLogLevel(level) {
  if (typeof level === 'string' && levels[level.toLowerCase()] !== undefined) {
    currentLevel = levels[level.toLowerCase()];
  } else {
    console.warn(`Invalid log level "${level}", defaulting to "${Object.keys(levels)[currentLevel]}"`);
  }
}

export function getCurrentLogLevel() {
  return Object.keys(levels).find(key => levels[key] === currentLevel);
}

const originalConsole = { ...console };

console.info = (message, ...args) => {
  if (currentLevel >= levels.info) originalConsole.log(`INFO - ${message}`, ...args);
};
console.error = (message, ...args) => {
  if (currentLevel >= levels.error) originalConsole.error(`ERROR - ${message}`, ...args);
};
console.debug = (message, ...args) => {
  if (currentLevel >= levels.debug) originalConsole.debug(`DEBUG - ${message}`, ...args);
};
console.trace = (message, ...args) => {
  if (currentLevel >= levels.trace) originalConsole.trace(`TRACE - ${message}`, ...args);
};

console.rap = () => {
  const bars = freestyle(defaultBars);
  for (const bar of bars) {
    console.debug(bar);
  }
};

// Export for ESM environments
export { levels };

// CommonJS compatibility check
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    setLogLevel,
    getCurrentLogLevel,
    levels,
  };
}
