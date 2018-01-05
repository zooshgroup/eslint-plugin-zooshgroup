const maxFunctionLines = require('./rules/max-function-lines');
const noCommentedCode = require('./rules/no-commented-code');

module.exports = {
  rules: {
    'max-function-lines': maxFunctionLines,
    'no-commented-code': noCommentedCode,
  },
  rulesConfig: {
    'max-function-lines': [2, { maxLines: 25 }],
    'no-commented-code': 2,
  },
};
