import { defaultLoggers, getCurrentLogLevel, setLogLevel, setLoggers } from './index.js';

const defaultLevels = ['none', 'error', 'info', 'debug', 'trace'];
const customLevels = ['none', 'error', 'warn', 'info', 'debug', 'trace'];

let hasFailures = false;

// Custom Loggers Mimicking Chrome Behavior
const customLoggers = [
  function none(...args) { console.log('[NONE]', ...args); },
  function error(...args) { console.error('[ERROR]', ...args); },
  function warn(...args) { console.warn('[WARN]', ...args); },
  function info(...args) { console.info('[INFO]', ...args); },
  function debug(...args) { console.debug('[DEBUG]', ...args); },
  function trace(...args) { console.debug('[TRACE-DEBUG-KICK-IT-CHROME]', ...args); },
];

runTests(customLoggers);

// Run Tests
function runTests(customLoggers) {
  printSectionHeader('RUNNING TEST SUITE');
  testDefaultLevels();
  testCustomLoggers(customLoggers);
  resetToDefaultLoggers();

  // Test Summary
  console.log('\n===================');
  console.log('TEST SUMMARY');
  console.log('===================');
  if (hasFailures) {
    console.error('❌ Some tests failed.');
    process.exit(1);
  } else {
    console.log('✅ All tests passed.');
  }
}

// Assertion Function
function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
  } else {
    console.error(`❌ FAIL: ${message}`);
    hasFailures = true;
  }
}

// Helper Functions
function printSectionHeader(title) {
  console.log(`\n=== ${title.toUpperCase()} ===`);
}

function testLogLevel(level, expected) {
  setLogLevel(level);
  const currentLevel = getCurrentLogLevel();
  assert(currentLevel === expected, `Log level should be set to "${expected}"`);
  console.log(`Current level: ${currentLevel}`);
}

function testLoggingMessages(level) {
  const msg = `should log at level "${level}"`;
  console.error(`[ERROR] ${msg}`);
  console.warn(`[WARN] ${msg}`);
  console.info(`[INFO] ${msg}`);
  console.debug(`[DEBUG] ${msg}`);
  console.trace(`[TRACE] ${msg}`);
}

// Test Default Log Levels
function testDefaultLevels() {
  printSectionHeader('Default Log Levels');
  
  testLogLevel(undefined, 'none');
  testLogLevel('foobar', 'none');
  testLogLevel('DEBUG', 'debug');

  printSectionHeader('Test each default level logging');
  defaultLevels.forEach((level) => {
    testLogLevel(level, level);
    testLoggingMessages(level);
  });
}

// Test Custom Loggers
function testCustomLoggers(customLoggers) {
  printSectionHeader('Custom Loggers Setup');
  setLoggers(customLoggers);

  testLogLevel('foobar', 'none');
  testLogLevel(undefined, 'none');

  printSectionHeader('Test each custom level logging');
  customLevels.forEach((level) => {
    testLogLevel(level, level);
    testLoggingMessages(level);
  });
}

// Reset to Default Loggers
function resetToDefaultLoggers() {
  setLoggers(defaultLoggers);
  printSectionHeader('Reset to Default Loggers');
  defaultLevels.forEach((level) => {
    testLogLevel(level, level);
    testLoggingMessages(level);
  });
}
