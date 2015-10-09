/**
 * @fileoverview Check for function args proper indentation.
 * @author uberVU
 * @copyright 2015 uberVU. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict';

var rule = require('../../../lib/rules/indent-function-args'),
    RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('indent-function-args', rule, {
  valid: [{
    code: 'foo(arg1, arg2);'
  }, {
    code: 'foobar(arg1,\n' +
          '    arg2);'
  }, {
    code: 'foo(arg1,\n' +
          '    arg2);'
  }, {
    code: 'foobar(arg1,\n' +
          '    arg2,\n' +
          '    arg3);'
  }, {
    code: 'foobar(arg1,\n' +
          '       arg2,\n' +
          '       arg3);'
  }, {
    code: 'foobar(arg1,\n' +
          '       arg2, arg3,\n' +
          '       arg4,\n' +
          '       arg5);'
  }, {
    code: 'var foo = bar(arg1, arg2,\n' +
          '    arg3, arg4);'
  }, {
    code: 'foo({\n' +
          '  a: 2,\n' +
          '  b: 3\n' +
          '}, arg2);'
  }],
  invalid: [{
    code: 'foobar(arg1,\n' +
          '    arg2,\n' +
          '       arg3);',
    errors: [{
      message: 'Wrong argument indentation. Expected 4 spaces but found 7.'
    }]
  }, {
    code: 'foobar(arg1,\n' +
          '       arg2,\n' +
          '    arg3);',
    errors: [{
      message: 'Wrong argument indentation. Expected 7 spaces but found 4.'
    }]
  }, {
    code: 'var foo = bar(arg1, arg2,\n' +
          'arg3);',
    errors: [{
      message: 'Indent at 4 spaces or parenthesis.'
    }]
  }]
});
