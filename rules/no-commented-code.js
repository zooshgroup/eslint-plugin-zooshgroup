const espree = require('espree');
const MESSAGE = 'Commented out code!';

function isSingleWord(text) {
  return /^[\w-]*$/.test(text);
}

function isValidCode(text) {
  if (isSingleWord(text)) {
    return false;
  }

  try {
    const ast = espree.parse(text, {
      ecmaVersion: 7,
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
    });
    return !!ast;
  } catch (err) {
    return false;
  }
}

function trim(node) {
  return Object.assign({}, node, { value: node.value.trim() });
}

function mergeWith(dest, source) {
  return Object.assign({}, dest, {
    value: `${dest.value}\n${source.value}`,
    loc: {
      start: dest.loc.start,
      end: source.loc.end,
    }
  })
}

function mergeLineComments(lineComments = []) {
  if (!lineComments.length) {
    return [];
  }

  let merged = [trim(lineComments[0])];
  for (let i = 1; i < lineComments.length; i++) {
    const trimmed = trim(lineComments[i]);
    const startLine = trimmed.loc.start.line;
    const endLine = trimmed.loc.end.line;
    if (startLine === merged[merged.length -1].loc.end.line + 1) {
      merged[merged.length -1] = mergeWith(merged[merged.length - 1], trimmed);
    }
    else {
      merged.push(trimmed);
    }
  }
  return merged;
}

function noCommentedCode(context) {
  const comments = context.getAllComments();
  const lineComments = comments.filter(comment => comment.type === 'Line');
  const mergedLineComments = mergeLineComments(lineComments);
  const blockComments = comments.filter(comment => comment.type === 'Block');
  const commentsToCheck = [...mergedLineComments, ...blockComments];
  commentsToCheck
    .filter(comment => isValidCode(comment.value.trim()))
    .forEach(commentedCode => context.report({ loc: commentedCode.loc }, MESSAGE));
  return {};
}

module.exports = noCommentedCode;
