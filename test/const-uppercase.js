const constUppercase = require('../rules/const-uppercase');

function decorateWithFunction(code) {
  return `function myFun() {
    ${code}
  }`;
}

function decorateWithArrowFunction(code) {
  return `() => {
    ${code}
  }`;
}

function decorateWithForLoop(code) {
  return `for (let i = 0; i < array.length; i++) {
    ${code}
  }`;
}

function addUpperError(snippet) {
  return {
    code: snippet,
    errors: [{
      message: 'const should be in upper case',
    }],
  };
}

function addLowerError(snippet) {
  return {
    code: snippet,
    errors: [{
      message: 'const should be in lower case',
    }],
  };
}

function addGlobalOption(snippet) {
  if (typeof snippet === 'string') {
    return {
      code: snippet,
      options: [{ globalsOnly: true }],
    };
  }
  return Object.assign({}, snippet, { options: [{ globalsOnly: true }] });
}

function addEnforceLowerOption(snippet) {
  if (typeof snippet === 'string') {
    return {
      code: snippet,
      options: [{ enforceLower: true }],
    };
  }
  return Object.assign({}, snippet, { options: [{ enforceLower: true }] });
}

const validSnippets = [
  `const foo = bar(3);`,
  `const FOO = 3;`,
  `const FOO = null;`,
  `const FOO = true;`,
  `const FOO = (3);`,
  `const FOO = 3 + 7 * 5;`,
  `const FOO = 4 + 3 * (-5 + 7)`,
  `const FOO = -5;`,
  `const FOO = 'bar';`,
  `const A = 'a', B = 3, c = () => {};`,
  `const foo = () => {}`,
  `const foo = bar ? 'baz' : qux`,
  `const foo = require('bar')`,
  `const foo = []`,
  `const foo = ['bar', 42]`,
  `const foo = {}`,
  `const foo = {bar: 42, baz: 'qux'}`,
  `const {FOO} = bar`,
  `const {foo} = bar`,
  `const foo = bar.baz()`,
  `const foo = bar => baz`,
  `const foo = bar.baz`,
  `const foo = new bar()`,
  `const foo = baz || qux`,
  'const foo = {bar: 42, baz: [`${qux} quux`]}',
  `const foo = require(bar)`
];

const lowerInvalidSnippets = [
  `const foo = false`,
  `const foo = null`,
  `const foo = 3;`,
  `const foo = (3);`,
  `const foo = 3 + 7 * 5;`,
  `const foo = 4 + 3 * (-5 + 7)`,
  `const foo = -5;`,
  `const foo = 'bar';`,
  `const A = 'a', b = 3, c = () => {};`,
  `const a = 'a', B = 3, c = () => {};`,
];

const upperInvalidSnippets = [
  `const FOO = [3];`,
  `const FOO = bar(3);`,
  `const FOO = 3 + 7 * bar;`,
  `const FOO = baz ? 5 : 3`,
  `const FOO = {foo: -5};`,
  `const FOO = bar.baz;`,
  `const FOO = new bar();`,
  `const FOO = bar => baz;`,
  `const FOO = bar || baz;`,
  `const FOO = 'bar'.concat(baz);`,
  `const A = 'a', B = 3, C = () => {};`,
];

const globalOnlyTests = {
  name: 'const-uppercase with globalsOnly option',
  rule: constUppercase,
  valid: [
    ...validSnippets,
    ...lowerInvalidSnippets.map(decorateWithForLoop),
    ...upperInvalidSnippets.map(decorateWithForLoop),
    ...lowerInvalidSnippets.map(decorateWithFunction),
    ...upperInvalidSnippets.map(decorateWithFunction),
    ...lowerInvalidSnippets.map(decorateWithArrowFunction),
    ...upperInvalidSnippets.map(decorateWithArrowFunction),
    ...upperInvalidSnippets.map(addLowerError),
  ].map(addGlobalOption),
  invalid: [
    ...lowerInvalidSnippets.map(addUpperError),
  ].map(addGlobalOption),
}

const enforceLowerTests = {
  name: 'const-uppercase with enforceLower option',
  rule: constUppercase,
  valid: [
    ...validSnippets,
    ...validSnippets.map(decorateWithForLoop),
    ...validSnippets.map(decorateWithFunction),
    ...validSnippets.map(decorateWithArrowFunction),
  ].map(addEnforceLowerOption),
  invalid: [
    ...lowerInvalidSnippets.map(addUpperError),
    ...upperInvalidSnippets.map(addLowerError),
    ...lowerInvalidSnippets.map(decorateWithForLoop).map(addUpperError),
    ...upperInvalidSnippets.map(decorateWithForLoop).map(addLowerError),
    ...lowerInvalidSnippets.map(decorateWithFunction).map(addUpperError),
    ...upperInvalidSnippets.map(decorateWithFunction).map(addLowerError),
    ...lowerInvalidSnippets.map(decorateWithArrowFunction).map(addUpperError),
    ...upperInvalidSnippets.map(decorateWithArrowFunction).map(addLowerError),
  ].map(addEnforceLowerOption),
};

const defaultTests = {
  name: 'const-uppercase with default setting',
  rule: constUppercase,
  valid: [
    ...validSnippets,
    ...validSnippets.map(decorateWithForLoop),
    ...validSnippets.map(decorateWithFunction),
    ...validSnippets.map(decorateWithArrowFunction),
    ...upperInvalidSnippets.map(addLowerError),
    ...upperInvalidSnippets.map(decorateWithForLoop).map(addLowerError),
    ...upperInvalidSnippets.map(decorateWithFunction).map(addLowerError),
    ...upperInvalidSnippets.map(decorateWithArrowFunction).map(addLowerError),
  ],
  invalid: [
    ...lowerInvalidSnippets.map(addUpperError),
    ...lowerInvalidSnippets.map(decorateWithForLoop).map(addUpperError),
    ...lowerInvalidSnippets.map(decorateWithFunction).map(addUpperError),
    ...lowerInvalidSnippets.map(decorateWithArrowFunction).map(addUpperError),
  ],
};

module.exports = [ defaultTests, globalOnlyTests, enforceLowerTests ];
