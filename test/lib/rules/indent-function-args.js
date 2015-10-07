/**
 * @fileoverview Check for function args proper indentation.
 * @author uberVU
 * @copyright 2015 uberVU. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/indent-function-args'),

    RuleTester = require('eslint').RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('indent-function-args', rule, {

  valid: [
    {
      code: 'foo(arg1, arg2);'
    },
    {
      code: 'foobar(arg1,\n' +
            '    arg2);'
    },
    {
      code: 'foo(arg1,\n' +
            '    arg2);'
    },
    {
      code: 'foobar(arg1,\n' +
            '    arg2,\n' +
            '    arg3);'
    },
    {
      code: 'foobar(arg1,\n' +
            '       arg2,\n' +
            '       arg3);'
    },
    {
      code: 'foobar(arg1,\n' +
            '       arg2, arg3,\n' +
            '       arg4,\n' +
            '       arg5);'
    },
    {
      code: 'var foo = bar(arg1, arg2,\n' +
            '    arg3, arg4);'
    },
    {
      code: 'foo({\n' +
            '  a: 2,\n' +
            '  b: 3\n' +
            '}, arg2);'
    }
  ],

  invalid: [
    {
      code: 'foobar(arg1,\n' +
            '    arg2,\n' +
            '       arg3);',
      errors: [{
        message: 'Indent at 4 spaces.'
      }]
    },
    {
      code: 'foobar(arg1,\n' +
            '       arg2,\n' +
            '    arg3);',
      errors: [{
        message: 'Indent at parent parenthesis.'
      }]
    },
    {
      code: 'var foo = bar(arg1, arg2,\n' +
            'arg3, arg4);',
      errors: [{
        message: 'Indent at 4 spaces or paren.'
      }]
    }
  ]
});
