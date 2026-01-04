// Generated from: ..\..\libs\primitives\a11y\src\lib\visually-hidden.feature
import { test } from 'playwright-bdd';

test.describe('Visually Hidden Component', () => {
  test('Hiding content', async ({ Given, When, Then, But, page }) => {
    await Given('I have a visually hidden component', null, { page });
    await When('I project content into it', null, { page });
    await Then('the content should not be visible on the screen', null, {
      page,
    });
    await But('the content should be present in the accessibility tree', null, {
      page,
    });
  });
});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [
    ({}, use) =>
      use('..\\..\\libs\\primitives\\a11y\\src\\lib\\visually-hidden.feature'),
    { scope: 'test', box: true },
  ],
  $bddFileData: [({}, use) => use(bddFileData), { scope: 'test', box: true }],
});

const bddFileData = [
  // bdd-data-start
  {
    pwTestLine: 6,
    pickleLine: 6,
    tags: [],
    steps: [
      {
        pwStepLine: 7,
        gherkinStepLine: 7,
        keywordType: 'Context',
        textWithKeyword: 'Given I have a visually hidden component',
        stepMatchArguments: [],
      },
      {
        pwStepLine: 8,
        gherkinStepLine: 8,
        keywordType: 'Action',
        textWithKeyword: 'When I project content into it',
        stepMatchArguments: [],
      },
      {
        pwStepLine: 9,
        gherkinStepLine: 9,
        keywordType: 'Outcome',
        textWithKeyword: 'Then the content should not be visible on the screen',
        stepMatchArguments: [],
      },
      {
        pwStepLine: 10,
        gherkinStepLine: 10,
        keywordType: 'Outcome',
        textWithKeyword:
          'But the content should be present in the accessibility tree',
        stepMatchArguments: [],
      },
    ],
  },
]; // bdd-data-end
