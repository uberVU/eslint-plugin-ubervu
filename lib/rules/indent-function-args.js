/**
 * @fileoverview Check for function args proper indentation.
 * @author uberVU
 * @copyright 2015 uberVU. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict';
var getNodeIndent = require('../get-node-indent.js');
var INDENT_SIZE = 4;

/**
 * Interface for indentation mode.
 *
 * @interface indentMode
 */

 /**
  * Checks if the indentation mode accepts a node's indentation as correct.
  *
  * @function
  * @name IndentMode#accepts
  *
  * @param {ASTNode|Token} node Node to examine
  * @param {ASTNode|Token} parent Parent node for the (node) param.
  * @param {Object} context Rule context object.
  *
  * @return {Boolean}
  *
  */

var allignedWithParen = {
      accepts: function(node, parent) {
        /**
         * Checks if argument is correctly alligned at parent parenthesis.
         *
         * @implements {IndentMode}
         */
        var argStartCol = node.loc.start.column,
            functionEndCol = parent.callee.loc.end.column;

        return argStartCol === functionEndCol + 1;
      }

    },
    at4spacesFromFunctionCall = {
      accepts: function(node, parent) {
        /**
         * Checks if argument is correctly alligned at INDENT_SIZE from parent
         * function call.
         *
         * @implements {IndentMode}
         */
        var argStartCol = node.loc.start.column,
            functionStartCol = parent.loc.start.column;

        return argStartCol === functionStartCol + INDENT_SIZE;
      }
    },
    at4spacesFromPrevLineIndent = {
      accepts: function(node, parent, context) {
        /**
         * Checks if argument is correctly alligned at INDENT_SIZE from prev
         * line indent.
         *
         * @implements {IndentMode}
         */
        var argStartCol = node.loc.start.column,
            functionIndent = getNodeIndent(parent, false, false, 'space',
                context);

        return argStartCol === functionIndent + INDENT_SIZE;
      }
    };

var indentModes = [
  at4spacesFromFunctionCall,
  at4spacesFromPrevLineIndent,
  allignedWithParen
];

module.exports = function(context) {

  function reportError(node, actualIndentation, requiredIndentation) {
    /**
    * Reports error for node and indentMode
    *
    * @param {ASTNode|Token} node Node to examine
    * @param {Object} context Rule context object.
    */
    if (actualIndentation && requiredIndentation) {
      context.report({
        node: node,
        message: 'Wrong argument indentation. Expected {{ requiredIndent }} ' +
                 'spaces but found {{ actualIndent }}.',
        data: {
          requiredIndent: requiredIndentation,
          actualIndent: actualIndentation
        }
      });
    } else {
      context.report({
        node: node,
        message: 'Indent at {{ indentSize }} 4 spaces or parenthesis.',
        data: {
          indentSize: INDENT_SIZE
        }
      });
    }
  }

  function getIndentationMode(node, parent) {
    var argIndenation = node.loc.start.column,
        returnIndentation = null;
    indentModes.forEach(function(mode) {
      if (mode.accepts(node, parent, context)) {
        returnIndentation = argIndenation;
      }
    });

    return returnIndentation;
  }

  return {
    CallExpression: function(node) {
      var functionLine = node.callee.loc.end.line,
          previousLine = functionLine,
          requiredIndentation = null;

      node.arguments.forEach(function checkIndent(argNode) {
        var newIndentation,
            childLine = argNode.loc.start.line;

        // We need to indent.
        if (previousLine !== childLine) {
          newIndentation = argNode.loc.start.column;

          if (!requiredIndentation) {
            requiredIndentation = getIndentationMode(argNode, node);
            if (!requiredIndentation) {
              reportError(argNode, null, null);
            }
          }

          // This line must be aligned in the same way as the previous line.
          if (newIndentation !== requiredIndentation) {
            reportError(argNode, newIndentation, requiredIndentation);
          }
        }

        previousLine = argNode.loc.end.line;
      });
    }
  };
};
