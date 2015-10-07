/**
 * @fileoverview Check for function args proper indentation.
 * @author uberVU
 * @copyright 2015 uberVU. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict';
var _ = require('lodash');
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

  // variables should be defined here
  var indentMode = 0;

  //--------------------------------------------------------------------------
  // Helpers
  //--------------------------------------------------------------------------

  function getNodeIndent(node, byLastLine, excludeCommas, indentType) {
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
  }

  function reportError(node, context) {
    /**
    * Reports error for node and indentMode
    *
    * @param {ASTNode|Token} node Node to examine
    * @param {Object} context Rule context object.
    */

    switch (indentMode) {
      case 'spaces':
      case 'line':
        context.report({
          node: node,
          message: 'Indent at 4 spaces.'
        });
        break;
      case 'paren':
        context.report({
          node: node,
          message: 'Indent at parent parenthesis.'
        });
        break;
      default:
        context.report({
          node: node,
          message: 'Indent at 4 spaces or paren.'
        });
    }
  }

  function checkIndent(mode) {
    /**
    * Checks the prev indentation (indentMode) against the current one (mode)
    *
    * @param {String} mode Current indentation mode.
    *     Can be 'line', 'paren', 'spaces'.
    * @param {String} indentMode The indentation that should be enforced across
    *     all other arguments. Can be 'line', 'paren', 'spaces' and by default
    *     0 (unset).
    *
    * @return {Boolean} Returns true if argument is ok indented or false if not.
    */
    switch (indentMode) {
      case 0:
        indentMode = mode;
        break;
      case mode:
        break;
      default:
        return false;
    }
    return true;
  }
  //--------------------------------------------------------------------------
  // Public
  //--------------------------------------------------------------------------

  return {

    CallExpression: function(node) {
      var functionStartCol = node.loc.start.column,
          functionEndCol = node.callee.loc.end.column,
          functionLine = node.callee.loc.end.line,
          functionIndent = getNodeIndent(node, false, false, 'space'),
          previousLine = functionLine;

      indentMode = 0;
      _.forEach(node.arguments, function(argNode) {
        var childStartCol = argNode.loc.start.column,
            childLine = argNode.loc.start.line,
            okIndent = false;

        // We need to indent.
        if (previousLine !== childLine) {
          switch (childStartCol) {
            // Check if 4 spaces from prev indent.
            case functionIndent + 4:
              okIndent = checkIndent('line');
              break;
            // Check if 4 spaces.
            case functionStartCol + 4:
              okIndent = checkIndent('spaces');
              break;
            // Check if paren.
            case functionEndCol + 1:
              okIndent = checkIndent('paren');
              break;
          }
          if (!okIndent) {
            reportError(argNode, context);
          }
        }
        previousLine = argNode.loc.end.line;
      });

    }

  };

};

module.exports.schema = [
  // fill in your schema
];
