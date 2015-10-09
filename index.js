/**
 * @fileoverview ESLint rules applicable to the uberVU org
 * @author uberVU
 * @copyright 2015 uberVU. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict';

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports = {
  rules: {
    'indent-function-args': require('./lib/rules/indent-function-args')
  },
  rulesConfig: {
    'indent-function-args': 0
  }
};
