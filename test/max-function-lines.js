const maxFunctionLines = require('../rules/max-function-lines');

function generateLines(len) {
  let chars = [];
  for (let i = 0; i < len; i++) {
    chars[i] = '\n';
  }

  return chars.join('');
}

const defaultTests = {
  name: 'max-function-lines with default value',
  rule: maxFunctionLines,
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
};

const OPTIONS = [{ maxLines: 15 }];
const customTests = {
  name: 'max-function-lines with custom value',
  rule: maxFunctionLines,
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
};

module.exports = [ defaultTests, customTests ];
