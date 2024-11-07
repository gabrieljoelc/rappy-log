import { getCurrentLogLevel, setLogLevel } from './index.js';

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
