/**
 * @fileoverview Blank test rule.
 * @author uberVU
 * @copyright 2015 uberVU. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/blank-rule'),

    RuleTester = require('eslint').RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('blank-rule', rule, {

  valid: [
    {
      code: 'var a = b;'
    }
  ],

  invalid: [
    {
      code: 'var a = c;',
      errors: [{
        message: 'a not initialized with b'
      }]
    }
  ]
});
