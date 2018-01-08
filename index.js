const maxFunctionLines = require('./rules/max-function-lines');
const noCommentedCode = require('./rules/no-commented-code');
const constUppercase = require('./rules/const-uppercase');

module.exports = {
  rules: {
    'max-function-lines': maxFunctionLines,
    'no-commented-code': noCommentedCode,
    'const-uppercase': constUppercase,
  },
  rulesConfig: {
    'max-function-lines': [2, { maxLines: 25 }],
    'no-commented-code': 2,
    'const-uppercase': 2,
  },
};
