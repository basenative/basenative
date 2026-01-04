// Generated from: ..\..\docs\features\css-vars.feature
import { test } from 'playwright-bdd';

test.describe('CSS Custom Properties Resolution', () => {
  test('Critical CSS variables should resolve correctly', async ({
    Given,
    Then,
    And,
    page,
  }) => {
    await Given('I am on the home page', null, { page });
    await Then(
      'the CSS variable "--color-surface-base" should resolve to a valid value',
      null,
      { page },
    );
    await And(
      'the CSS variable "--color-primary" should resolve to a valid value',
      null,
      { page },
    );
    await And(
      'the CSS variable "--blur-glass-sm" should resolve to a valid value',
      null,
      { page },
    );
  });
});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [
    ({}, use) => use('..\\..\\docs\\features\\css-vars.feature'),
    { scope: 'test', box: true },
  ],
  $bddFileData: [({}, use) => use(bddFileData), { scope: 'test', box: true }],
});

const bddFileData = [
  // bdd-data-start
  {
    pwTestLine: 6,
    pickleLine: 3,
    tags: [],
    steps: [
      {
        pwStepLine: 7,
        gherkinStepLine: 4,
        keywordType: 'Context',
        textWithKeyword: 'Given I am on the home page',
        stepMatchArguments: [],
      },
      {
        pwStepLine: 8,
        gherkinStepLine: 5,
        keywordType: 'Outcome',
        textWithKeyword:
          'Then the CSS variable "--color-surface-base" should resolve to a valid value',
        stepMatchArguments: [
          {
            group: {
              start: 17,
              value: '"--color-surface-base"',
              children: [
                {
                  start: 18,
                  value: '--color-surface-base',
                  children: [{ children: [] }],
                },
                { children: [{ children: [] }] },
              ],
            },
            parameterTypeName: 'string',
          },
        ],
      },
      {
        pwStepLine: 9,
        gherkinStepLine: 6,
        keywordType: 'Outcome',
        textWithKeyword:
          'And the CSS variable "--color-primary" should resolve to a valid value',
        stepMatchArguments: [
          {
            group: {
              start: 17,
              value: '"--color-primary"',
              children: [
                {
                  start: 18,
                  value: '--color-primary',
                  children: [{ children: [] }],
                },
                { children: [{ children: [] }] },
              ],
            },
            parameterTypeName: 'string',
          },
        ],
      },
      {
        pwStepLine: 10,
        gherkinStepLine: 7,
        keywordType: 'Outcome',
        textWithKeyword:
          'And the CSS variable "--blur-glass-sm" should resolve to a valid value',
        stepMatchArguments: [
          {
            group: {
              start: 17,
              value: '"--blur-glass-sm"',
              children: [
                {
                  start: 18,
                  value: '--blur-glass-sm',
                  children: [{ children: [] }],
                },
                { children: [{ children: [] }] },
              ],
            },
            parameterTypeName: 'string',
          },
        ],
      },
    ],
  },
]; // bdd-data-end
