# eslint-plugin-zooshgroup

A set of custom plugins used at Zoosh Group

## Example

```js
{
    "plugins": ["zooshgroup"],
    "rules": {
        "zooshgroup/max-function-lines": ["error", { maxLines: 20 }],
        "zooshgroup/no-commented-lines": ["warning"],
        "zooshgroup/const-uppercase": ["error", { globalsOnly: true }],
    }
}
```

## Included rules

### `max-function-lines`

This rule checks see if the entire source code of a function or arrow function is less
then the given limit.

#### Options

##### `maxLines`
An integer that specifies the maximal length of a function that is considered ok. Defaults to `25`.

### `no-commented-code`

This rule checks if the code contains commented out source code. It uses `espree` to parse comments. Works for the `jsx` syntax and for `import`/`export` as well.

Block comments on consecutive lines are treated as one. This causes a known issue, where no error is showed when consecutive block comments contain code and non-code parts, like this:

```js
  // foo bar
  // for (let i = 0; i < array.length; i++) {
  //   array[i]
  // }
```

### `const-uppercase`

This rule checks if the `const` declarations that assign a constant value to the variable use uppercase notation. A value is treated as constant if it is only built from literals (i.e. `string`, `number`, `boolean` and `null`), unary operators and binary operators.

Valid examples:
```js
const FOO = 3;
const FOO = null;
const FOO = true;
const FOO = (3);
const FOO = 3 + 7 * 5;
const FOO = 4 + 3 * (-5 + 7);
const FOO = -5;
const FOO = 'bar';
const FOO = `bar`;
```

#### Options

##### `enforceLower`
A boolean that specifies if an error should be shown for uppercase non-constant variables. Defaults to `false`.

##### `globalsOnly`
A boolean that specifies if only variables defined in the module scope should be checked. Defaults to `false`.

**For more examples of the rules check out the tests.**

## Installation

The module needs at least Node.js 6.x.

Install with `npm install eslint-plugin-zooshgroup --save-dev`

## Tests

`npm test`
