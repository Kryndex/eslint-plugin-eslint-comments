/**
 * @author Toru Nagashima
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require("eslint").RuleTester
const rule = require("../../../lib/rules/no-unused-enable")

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const tester = new RuleTester()

tester.run("no-unused-enable", rule, {
    valid: [
        `
/*eslint no-undef:error*/
/*eslint-disable*/
var a = b
/*eslint-enable*/
`,
        `
/*eslint no-undef:error*/
/*eslint-disable no-undef*/
var a = b
/*eslint-enable no-undef*/
`,
        `
/*eslint no-undef:error*/
/*eslint-disable no-undef*/
var a = b
/*eslint-enable*/
`,
        `
/*eslint no-undef:error, no-unused-vars:error*/
/*eslint-disable no-undef,no-unused-vars*/
var a = b
/*eslint-enable no-undef*/
`,
        `
/*eslint no-undef:error, no-unused-vars:error*/
/*eslint-disable no-undef,no-unused-vars*/
var a = b
/*eslint-enable*/
`,
    ],
    invalid: [
        {
            code: "/*eslint-enable*/",
            errors: [
                {
                    message: "ESLint rules are re-enabled but those have not been disabled.",
                    line: 1,
                    column: 0,
                    endLine: 1,
                    endColumn: 18,
                },
            ],
        },
        {
            code: "/*eslint-enable no-undef*/",
            errors: [
                {
                    message: "'no-undef' rule is re-enabled but it has not been disabled.",
                    line: 1,
                    column: 17,
                    endLine: 1,
                    endColumn: 25,
                },
            ],
        },
        {
            code: `
/*eslint-disable no-unused-vars*/
/*eslint-enable no-undef*/
`,
            errors: [
                {
                    message: "'no-undef' rule is re-enabled but it has not been disabled.",
                    line: 3,
                    column: 17,
                    endLine: 3,
                    endColumn: 25,
                },
            ],
        },
    ],
})
