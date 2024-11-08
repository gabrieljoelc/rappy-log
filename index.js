import { freestyle, defaultBars } from './rap.js';

let currentLevel = 0;
const originalConsole = { ...console };
const defaultLoggers = [
  function none(...args) { originalConsole.log(...args); },
  function error(...args) { if (currentLevel >= levels.error) originalConsole.error(`ERROR -`, ...args); },
  function warn(...args) { if (currentLevel >= levels.warn) originalConsole.warn(`WARN -`, ...args); },
  function info(...args) { if (currentLevel >= levels.info) originalConsole.info(`INFO -`, ...args); },
  function debug(...args) { if (currentLevel >= levels.debug) originalConsole.debug(`DEBUG -`, ...args); },
  function trace(...args) { if (currentLevel >= levels.trace) originalConsole.trace(`TRACE -`, ...args); },
];
let logMethods = [];
let levels = {};
setLoggers(defaultLoggers);

// Export for ESM environments
export { defaultLoggers, levels };

// CommonJS compatibility check
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    defaultLoggers,
    getCurrentLogLevel,
    levels,
    setLogLevel,
    setLoggers,
  };
}


/**
 * Sets the log level.
 * @param {string} level - The desired log level.
 */
/**
 * Sets the log level.
 * @param {string} level - The desired log level.
 */
export function setLogLevel(level) {
  const availableLevels = Object.keys(levels);

  // Check if the provided level is valid
  if (typeof level === 'string' && levels[level.toLowerCase()] !== undefined) {
    currentLevel = levels[level.toLowerCase()];
  } else if (currentLevel === 0) {
    // If currentLevel is still at the default ("none"), fallback to the first available level
    console.warn(`Invalid log level "${level}", defaulting to the first available level "${availableLevels[0]}"`);
    currentLevel = levels[availableLevels[0]];
  } else {
    // If currentLevel is already set to a higher value, retain it
    console.warn(`Invalid log level "${level}", retaining current level "${getCurrentLogLevel()}"`);
  }
}

/**
 * Gets the current log level as a string.
 * @returns {string} The current log level.
 */
export function getCurrentLogLevel() {
  return Object.keys(levels).find((key) => levels[key] === currentLevel);
}

/**
 * Allows the user to set custom loggers.
 * @param {Array} loggerArray - An array of named logging functions.
 */
export function setLoggers(loggerArray) {
  if (!loggerArray) {
    throw new Error('Expected an array of logging functions');
  }
  if (!Array.isArray(loggerArray)) {
    throw new TypeError('Expected an array of logging functions');
  }
  if (!loggerArray.every((method) => typeof method === 'function')) {
    throw new TypeError('All elements in the logger array must be functions');
  }
  if (!loggerArray.every((method) => method.name)) {
    throw new Error('All functions in the logger array must be named');
  }
  logMethods = createLogMethods(loggerArray);
  levels = generateLevels(loggerArray);
  currentLevel = detectLogLevel();
}

/**
 * Detects the log level from the environment variable if running in Node.js.
 * Defaults to "none" if not set.
 */
function detectLogLevel() {
  const isNode = typeof process !== 'undefined' && process.env;
  const envLevel = isNode ? process.env.LOG_LEVEL?.toLowerCase() : 'none';
  return levels[envLevel] !== undefined ? levels[envLevel] : levels.none;
}

/**
 * Generate levels from the logger functions array.
 * @param {Array} loggerArray - An array of named logging functions.
 * @returns {Object} - An object mapping function names to levels.
 */
function generateLevels(loggerArray) {
  return loggerArray.reduce((acc, method, index) => {
    acc[method.name.toLowerCase()] = index;
    return acc;
  }, {});
}

/**
 * Creates custom log methods based on the provided functions.
 * @param {Array} loggerArray - An array of logging functions.
 * @returns {Object} Log methods respecting the current level.
 */
function createLogMethods(loggerArray) {
  return loggerArray.reduce((acc, method, index) => {
    acc[method.name.toLowerCase()] = (...args) => {
      if (index <= currentLevel) method(...args);
    };
    return acc;
  }, {});
}

/**
 * A default "none" log level function.
 */
function none(...args) {
  console.log(...args);
}

// Example usage of the freestyle rap function
console.rap = () => {
  const bars = freestyle(defaultBars);
  for (const bar of bars) {
    console.debug(bar);
  }
};
