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
    ...validSnippets.map(addGlobalOption),
    ...lowerInvalidSnippets.map(decorateWithForLoop).map(addGlobalOption),
    ...upperInvalidSnippets.map(decorateWithForLoop).map(addGlobalOption),
    ...lowerInvalidSnippets.map(decorateWithFunction).map(addGlobalOption),
    ...upperInvalidSnippets.map(decorateWithFunction).map(addGlobalOption),
    ...lowerInvalidSnippets.map(decorateWithArrowFunction).map(addGlobalOption),
    ...upperInvalidSnippets.map(decorateWithArrowFunction).map(addGlobalOption)
  ],
  invalid: [
    ...lowerInvalidSnippets.map(addUpperError).map(addGlobalOption),
    ...upperInvalidSnippets.map(addLowerError).map(addGlobalOption)
  ],
}

const defaultTests = {
  name: 'const-uppercase with default setting',
  rule: constUppercase,
  valid: [
    ...validSnippets,
    ...validSnippets.map(decorateWithForLoop),
    ...validSnippets.map(decorateWithFunction),
    ...validSnippets.map(decorateWithArrowFunction)
  ],
  invalid: [
    ...lowerInvalidSnippets.map(addUpperError),
    ...upperInvalidSnippets.map(addLowerError),
    ...lowerInvalidSnippets.map(decorateWithForLoop).map(addUpperError),
    ...upperInvalidSnippets.map(decorateWithForLoop).map(addLowerError),
    ...lowerInvalidSnippets.map(decorateWithFunction).map(addUpperError),
    ...upperInvalidSnippets.map(decorateWithFunction).map(addLowerError),
    ...lowerInvalidSnippets.map(decorateWithArrowFunction).map(addUpperError),
    ...upperInvalidSnippets.map(decorateWithArrowFunction).map(addLowerError)
  ],
};

module.exports = [ defaultTests, globalOnlyTests ];
