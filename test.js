import { getCurrentLogLevel, setLogLevel, setLoggers } from './index.js';

const levels = [
  'none',
  'error',
  'info',
  'debug',
  'trace',
];

let hasFailures = false;

// Basic assertion function to display clear pass/fail messages
function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
  } else {
    console.error(`❌ FAIL: ${message}`);
    hasFailures = true; // Mark that there was a failure
  }
}

// Helper to print a section header
function printSectionHeader(title) {
  console.log(`\n=== ${title.toUpperCase()} ===`);
}

printSectionHeader('Test default level');
assert(getCurrentLogLevel() === 'none', 'Default log level should be "none"');
console.log(`Current level: ${getCurrentLogLevel()}`);

printSectionHeader('Test falsey values for setLogLevel');
setLogLevel(undefined);
assert(getCurrentLogLevel() === 'none', 'Setting log level to undefined should retain "none" level');
console.log(`Current level: ${getCurrentLogLevel()}`);

printSectionHeader('Test invalid value for setLogLevel');
setLogLevel('foobar');
assert(getCurrentLogLevel() === 'none', 'Setting log level to invalid value should retain "none" level');
console.log(`Current level: ${getCurrentLogLevel()}`);

printSectionHeader('Test uppercase input for setLogLevel');
setLogLevel('DEBUG');
assert(getCurrentLogLevel() === 'debug', 'Setting log level to "DEBUG" (uppercase) should set to "debug"');
console.log(`Current level: ${getCurrentLogLevel()}`);

printSectionHeader('Test each level logging');
for (let i = 0; i < levels.length; i++) {
  const level = levels[i];
  const msg = `should log ${i} time${i === 1 ? '' : 's'}`;
  setLogLevel(level);
  console.log(`\nCurrent level: "${getCurrentLogLevel()}"`);

  // Log messages based on level
  console.error(`ERROR: ${msg}`); // Should log at "error" and above
  console.info(`INFO: ${msg}`);   // Should log at "info" and above
  console.debug(`DEBUG: ${msg}`);  // Should log at "debug" and above
  console.trace(`TRACE: ${msg}`);  // Should log at "trace" level only

  // Assert that getCurrentLogLevel matches the set level
  assert(getCurrentLogLevel() === level, `Current level should be "${level}"`);
}

// Define custom loggers mimicking Chrome behavior
const customLoggers = [
  function none(...args) { console.log('[NONE]', ...args); },
  function error(...args) { console.error('[ERROR]', ...args); },
  function warn(...args) { console.warn('[WARN]', ...args); },
  function info(...args) { console.info('[INFO]', ...args); },
  function debug(...args) { console.debug('[DEBUG]', ...args); },
  function trace(...args) { console.debug('[TRACE-DEBUG-KICK-IT-CHROME]', ...args); },
];

// Set custom loggers and run tests
printSectionHeader('Test custom loggers setup');
setLoggers(customLoggers);

assert(getCurrentLogLevel() === 'none', 'Default log level should be "none" after setting custom loggers');
console.log(`Current level: ${getCurrentLogLevel()}`);

// Test invalid and falsy values
printSectionHeader('Test invalid log level');
setLogLevel('foobar');
assert(getCurrentLogLevel() === 'none', 'Invalid log level should retain "none" level');
console.log(`Current level after invalid input: ${getCurrentLogLevel()}`);

printSectionHeader('Test falsey value for setLogLevel');
setLogLevel(undefined);
assert(getCurrentLogLevel() === 'none', 'Setting log level to undefined should retain "none" level');
console.log(`Current level after falsey input: ${getCurrentLogLevel()}`);

// Test setting each level with custom loggers
const customLevels = ['none', 'error', 'warn', 'info', 'debug', 'trace'];

for (let i = 0; i < customLevels.length; i++) {
  const level = customLevels[i];
  const msg = `should log at level "${level}"`;

  printSectionHeader(`Set log level to "${level}"`);
  setLogLevel(level);
  assert(getCurrentLogLevel() === level, `Log level should be set to "${level}"`);

  // Log messages based on level
  console.error(`[ERROR] ${msg}`); // Should log at "error" and above
  console.warn(`[WARN] ${msg}`);   // Should log at "warn" and above
  console.info(`[INFO] ${msg}`);   // Should log at "info" and above
  console.trace(`[TRACE] ${msg}`); // Should log at "trace" level and above
  console.debug(`[DEBUG] ${msg}`); // Should log at "debug" level only

  console.log(`\nCurrent level: "${getCurrentLogLevel()}"`);
}

// Summary of test results
console.log('\n===================');
console.log('TEST SUMMARY');
console.log('===================');

if (hasFailures) {
  console.error('❌ Some tests failed.');
  process.exit(1);
} else {
  console.log('✅ All tests passed.');
}
