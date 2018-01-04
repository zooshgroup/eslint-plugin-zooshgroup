const DEFAULT_MAX_LINES = 25;

function checkLimit(context, node) {
  const maxLines = (context.options[0] && context.options[0].maxLines) || DEFAULT_MAX_LINES;
  const code = context.getSourceCode().getText(node);

  const matches = code.match(/\n/g) || [];
  const lines = matches.length + 1;

  if (lines > maxLines) {
    const difference = lines - maxLines;
    const message = `Function exceeds the limit by ${difference} lines`;
    context.report(node, message);
  }
}

function maxFunctionLines(context) {
  return {
    FunctionDeclaration: node => checkLimit(context, node),
    FunctionExpression: node => checkLimit(context, node),
  };
}

module.exports = maxFunctionLines;
module.exports.schema = [{
  type: 'object',
  properties: {
    maxLines: { type: 'number' }
  },
  additionalProperties: false,
}];
