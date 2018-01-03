'use strict';

const maxFunctionLines = require('./rules/max-function-lines.js');

module.exports = {
    rules: {
        'max-function-lines': maxFunctionLines,
    },
    rulesConfig: {
        'max-function-lines': [1, { maxLines: 25 }],
    },
};
