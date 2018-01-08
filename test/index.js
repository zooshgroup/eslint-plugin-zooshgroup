const RuleTester = require('eslint').RuleTester;
const maxFunctionLines = require('./max-function-lines');
const noCommentedCode = require('./no-commented-code');
const constUppercase = require('./const-uppercase');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
});

const tests = [
  ...maxFunctionLines,
  ...noCommentedCode,
  ...constUppercase
];

for (test of tests) {
  ruleTester.run(test.name, test.rule, {
    valid: test.valid,
    invalid: test.invalid,
  });
}

console.log('Tests passed!');
