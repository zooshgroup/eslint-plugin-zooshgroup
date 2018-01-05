const noCommentedCode = require('../rules/no-commented-code');

const valid = [
  `// foo`,
  `// eslint-disable-line no-underscore-dangle`,
  `// eslint-disable-next-line no-underscore-dangle`,
  `/* bar */`,
  'const x = 3',
  '<bar foo="x">baz</bar>',
  `import foo from 'foo';`,
];

const invalidSnippets = [
  `// const a = 3;`,

  `// <bar foo="x">baz</bar>`,

  `// for (var i = 0; i < array.length; i++) {
   //   array[i]
   // }
   const z = 6;
   // foobar`,

  `/* for (var i = 0; i < array.length; i++) {
     array[i]
   } */`,

  `// for (var i = 0; i < array.length; i++) {
   //   array[i]
   // }`,

  `// import foo from 'foo';`,

  // `// bar foo baz
  //  // for (var i = 0; i < array.length; i++) {
  //  //  array[i]
  //  // }`,
];

const invalid = invalidSnippets.map(snippet => ({
  code: snippet,
  errors: [{
    message: 'Commented out code!',
  }],
}))

module.exports = [{
  name: 'no-commented-code',
  rule: noCommentedCode,
  valid,
  invalid,
}];
