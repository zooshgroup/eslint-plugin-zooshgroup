'use strict';

var DEFAULT_MAX_LINES = 25;

module.exports = maxFunctionLines;

function checkLimit(context, node) {
  const code = context.getSourceCode().getText(node);
  const sourceLength = code.match(/\n/g).length + 1;
  if (sourceLength > DEFAULT_MAX_LINES) {
    const difference = sourceLength - DEFAULT_MAX_LINES;
    const message = `Function exceeds the limit by ${difference} lines`;
    context.report(node, message);
  }
}

function maxFunctionLines(context) {
  const maxLines = (context.options[0] && context.options[0].maxLines) || DEFAULT_MAX_LINES;

  return {
    FunctionDeclaration: node => checkLimit(context, node),
    FunctionExpression: node => checkLimit(context, node),
  };
}

module.exports.schema = [{
  type: 'object',
  properties: {
    maxLines: { type: 'number' }
  },
  additionalProperties: false,
}];
