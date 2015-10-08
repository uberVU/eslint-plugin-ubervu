/**
 * @fileoverview Check for function args proper indentation.
 * @author uberVU
 * @copyright 2015 uberVU. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict';
var getNodeIndent = require('../get-node-indent.js');
var indentSize = 4;

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

  var allignedWithParen = {
        accepts: function(node, parent) {
          /**
           * Checks if argument is correctly alligned at parent parenthesis.
           *
           * @return {Boolean}
           */
          var argStartCol = node.loc.start.column,
              functionEndCol = parent.callee.loc.end.column;

          return argStartCol === functionEndCol + 1;
        }

      },
      at4spacesFromFunctionCall = {
        accepts: function(node, parent) {
          /**
           * Checks if argument is correctly alligned at indentSize from parent
           * function call.
           *
           * @return {Boolean}
           */
          var argStartCol = node.loc.start.column,
              functionStartCol = parent.loc.start.column;

          return argStartCol === functionStartCol + indentSize;
        }
      },
      at4spacesFromPrevLineIndent = {
        accepts: function(node, parent) {
          /**
           * Checks if argument is correctly alligned at indentSize from prev
           * line indent.
           *
           * @return {Boolean}
           */
          var argStartCol = node.loc.start.column,
              functionIndent = getNodeIndent(parent, false, false, 'space',
                  context);

          return argStartCol === functionIndent + indentSize;
        }
      };

  var indentModes = [
    at4spacesFromFunctionCall,
    at4spacesFromPrevLineIndent,
    allignedWithParen
  ];

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
        message: 'Indent at 4 spaces or parenthesis.'
      });
    }
  }

  function getIndentationMode(node, parent) {
    var argIndenation = node.loc.start.column,
        returnIndentation = null;
    indentModes.forEach(function(mode) {
      if (mode.accepts(node, parent)) {
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

      node.arguments.forEach(function(argNode) {
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
