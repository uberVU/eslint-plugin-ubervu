/**
 * @fileoverview Blank test rule.
 * @author uberVU
 * @copyright 2015 uberVU. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

  // variables should be defined here

  //--------------------------------------------------------------------------
  // Helpers
  //--------------------------------------------------------------------------

  // any helper functions should go here or else delete this section

  //--------------------------------------------------------------------------
  // Public
  //--------------------------------------------------------------------------

  return {

    VariableDeclarator: function(node) {
      if (node.init.name !== 'b') {
        context.report({
          node: node,
          message: 'a not initialized with b'
        });
      }
    }

  };

};

module.exports.schema = [
    // fill in your schema
];
