const log = require('./index');

const levels = [
  'none',
  'error',
  'info',
  'debug',
  'trace',
];

const defaultMsg = 'Hello World!';

console.log('=================');
console.log('test default level');
console.log('=================');
console.log('PASS?', log.getCurrentLevel() === 'none');
console.log('current level:', log.getCurrentLevel());

console.log('\n=================');
console.log('test falseys for setLevel');
console.log('=================');
log.setLevel(undefined);
console.log('PASS?', log.getCurrentLevel() === 'none');
console.log('current level:', log.getCurrentLevel());

console.log('\n=================');
console.log('test invalid for setLevel');
console.log('=================');
log.setLevel('foobar');
console.log('PASS?', log.getCurrentLevel() === 'none');
console.log('current level:', log.getCurrentLevel());

console.log('\n=================');
console.log('test uppercase level for setLevel');
console.log('=================');
log.setLevel('DEBUG');
console.log('PASS?', log.getCurrentLevel() === 'debug');
console.log('current level:', log.getCurrentLevel());

console.log('\n=================');
console.log('test all levels');
console.log('=================');

for (let logCount = 0; logCount < levels.length; logCount++) {
  let msg = `should log ${logCount} time${logCount > 1 ? 's' : ''}`;
  log.setLevel(levels[logCount]);
  console.log('current level:', log.getCurrentLevel());
  log.error(msg);
  log.info(msg);
  log.debug(msg);
  log.trace(msg);
}
