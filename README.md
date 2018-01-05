# eslint-plugin-zooshgroup

A set of custom plugins used at Zoosh Group

## Example

```js
{
    "plugins": ["zooshgroup"],
    "rules": {
        "zooshgroup/max-function-lines": ["error", { maxLines: 20 }],
        "zooshgroup/no-commented-lines": ["warning"]
    }
}
```

## Included rules

### `max-function-lines`

This rule checks see if the entire source code of a function is less
then the given limit. The limit defaults to 25 lines.

### `no-commented-code`

This rule checks if the code contains commented out source code. It uses `espree` to parse comments. Works for the `jsx` syntax and for `import`/`export` as well.

Block comments on consecutive lines are treated as one. This causes a known issue, where no error is showed when consecutive block comments contain code and non-code parts, like this:

```js
  // foo bar
  // for (let i = 0; i < array.length; i++) {
  //   array[i]
  // }
```

For more examples of the rules please see the tests.

## Installation

The module needs at least Node.js 6.x.

Install with `npm install eslint-plugin-zooshgroup --save-dev`

## Tests

`npm test`
