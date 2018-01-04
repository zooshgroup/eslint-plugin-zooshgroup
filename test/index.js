const RuleTester = require('eslint').RuleTester;
const maxFunctionLines = require('../rules/max-function-lines.js');

const ruleTester = new RuleTester();

function generateLines(len) {
  let chars = [];
  for (let i = 0; i < len; i++) {
    chars[i] = '\n';
  }

  return chars.join('');
}

ruleTester.run('max-function-lines with default value', maxFunctionLines, {
  valid: [
    `function foo() {
    }`,
    'function foo() {}'
  ],
  invalid: [{
    code: `function foo() { ${generateLines(30)} }`,
    errors: [{
      message: 'Function exceeds the limit by 6 lines',
    }],
  }],
});

const OPTIONS = [{ maxLines: 15 }];
ruleTester.run('max-function-lines with custom value', maxFunctionLines, {
  valid: [
    {
      code: `function foo() {
        }`,
      options: OPTIONS,
    },
    {
      code: 'function foo() {}',
      options: OPTIONS,
    }
  ],
  invalid: [{
    code: `function foo() { ${generateLines(20)} }`,
    options: OPTIONS,
    errors: [{
      message: 'Function exceeds the limit by 6 lines',
    }],
  }],
});

console.log('Tests passed!');
