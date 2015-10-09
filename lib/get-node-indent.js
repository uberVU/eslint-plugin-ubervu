/* Code adapted from https://github.com/eslint/eslint/blob/master/lib/rules/indent.js */

module.exports = function getNodeIndent(node, byLastLine, excludeCommas,
    indentType, context) {
  /**
  * Get node indent
  *
  * @param {ASTNode|Token} node Node to examine
  * @param {boolean} [byLastLine=false] get indent of node's last line
  * @param {boolean} [excludeCommas=false] skip comma on start of line
  * @returns {int} Indent
  */
  var token = byLastLine ? context.getLastToken(node)
                         : context.getFirstToken(node),
      src = context.getSource(token, token.loc.start.column),
      skip = excludeCommas ? ',' : '',
      regExp;

  if (indentType === 'space') {
    regExp = new RegExp('^[ ' + skip + ']+');
  } else {
    regExp = new RegExp('^[\t' + skip + ']+');
  }

  var indent = regExp.exec(src);
  return indent ? indent[0].length : 0;
};
