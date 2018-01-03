# eslint-plugin-zooshgroup

A set of custom plugins used at Zoosh Group

## Example

```js
{
    "rules": {
        "zooshgroup/max-function-lines": ["error", { maxLines: 20 }]
    }
}
```

Currently the rules in this module are:

### `max-function-lines`

This lint rule checks see if the entire source code of a function is less
then the given limit. The limit defaults to 25 lines.

## Installation

`npm install eslint-plugin-zooshgroup`

## Tests

`npm test`
