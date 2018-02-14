const LOWER_MESSAGE = 'const should be in lower case';
const UPPER_MESSAGE = 'const should be in upper case';

function isUpper(str) {
  return str === str.toUpperCase();
}

function isConstant(node) {
  switch (node.type) {
    case 'Literal':
      return true;
    case 'TemplateLiteral':
      return true;
    case 'UnaryExpression':
      return isConstant(node.argument);
    case 'BinaryExpression':
      return isConstant(node.left) && isConstant(node.right);
  }
}

function checkDeclaration(context, node) {
  const globalsOnly = context.options[0] && context.options[0].globalsOnly;
  const enforceLower = context.options[0] && context.options[0].enforceLower;
  const isGlobal = node.parent.type === 'Program';
  const needsCheck = globalsOnly ? isGlobal : true;
  if (node.kind === 'const' && needsCheck) {
    node.declarations.forEach(declaration => {
      const {id: {name}, init} = declaration;
      const isNameUpper = name && isUpper(name);
      const isValueConstant = init && isConstant(init);

      if (isValueConstant && !isNameUpper) {
        context.report(node, UPPER_MESSAGE);
      }
      if (!isValueConstant && isNameUpper && enforceLower) {
        context.report(node, LOWER_MESSAGE);
      }
    });
  }
}

function constUppercase(context) {
  return {
    VariableDeclaration: node => checkDeclaration(context, node),
  };
}

module.exports = constUppercase;
module.exports.schema = [{
  type: 'object',
  properties: {
    globalsOnly: { type: 'boolean' },
    enforceLower: { type: 'boolean' }
  },
  additionalProperties: false,
}];
