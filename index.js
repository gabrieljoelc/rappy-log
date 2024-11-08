import { freestyle, defaultBars } from './rap.js';

/**
 * Default levels and logging methods.
 */
const defaultLevels = {
  none: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const originalConsole = { ...console };
let logMethods = createDefaultLogMethods(defaultLevels);
let levels = { ...defaultLevels };

let currentLevel = detectLogLevel();

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
 * @param {Array} customLoggers - An array of custom logging functions.
 */
export function setLoggers(customLoggers) {
  const customLevels = customLoggers.reduce((acc, method, index) => {
    if (typeof method === 'function' && method.name) {
      acc[method.name.toLowerCase()] = index;
    } else {
      throw new Error('All logging methods must be named functions');
    }
    return acc;
  }, {});

  // Update levels and log methods based on custom loggers
  levels = { ...customLevels };
  logMethods = createLogMethods(customLoggers);
  currentLevel = detectLogLevel(); // Reset log level after updating methods
}

/**
 * Creates the default log methods based on predefined levels.
 * @param {Object} levels - An object defining log levels.
 * @returns {Object} Log methods respecting the current level.
 */
function createDefaultLogMethods(levels) {
  return {
    none: (message, ...args) => originalConsole.log(message, ...args),
    error: (message, ...args) => {
      if (currentLevel >= levels.error) originalConsole.error(`ERROR - ${message}`, ...args);
    },
    warn: (message, ...args) => {
      if (currentLevel >= levels.warn) originalConsole.warn(`WARN - ${message}`, ...args);
    },
    info: (message, ...args) => {
      if (currentLevel >= levels.info) originalConsole.info(`INFO - ${message}`, ...args);
    },
    debug: (message, ...args) => {
      if (currentLevel >= levels.debug) originalConsole.debug(`DEBUG - ${message}`, ...args);
    },
    trace: (message, ...args) => {
      if (currentLevel >= levels.trace) originalConsole.trace(`TRACE - ${message}`, ...args);
    },
  };
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

// Initialize default loggers on load
logMethods = createDefaultLogMethods(defaultLevels);

// Export for ESM environments
export { levels };

// CommonJS compatibility check
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    setLogLevel,
    getCurrentLogLevel,
    setLoggers,
    levels,
  };
}
