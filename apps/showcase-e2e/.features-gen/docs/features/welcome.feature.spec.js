// Generated from: ..\..\docs\features\welcome.feature
import { test } from "playwright-bdd";

test.describe('Welcome Component', () => {

  test('Welcome Page Display', async ({ Given, Then, And, page }) => { 
    await Given('I open the showcase application', null, { page }); 
    await Then('I should see the "BaseNative" logo', null, { page }); 
    await And('I should see the version number "v0.1.0"', null, { page }); 
    await And('I should see links to "Components" and "Documentation"', null, { page }); 
    await And('the page title should be "BaseNative Showcase"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('..\\..\\docs\\features\\welcome.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I open the showcase application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then I should see the \"BaseNative\" logo","stepMatchArguments":[{"group":{"start":17,"value":"\"BaseNative\"","children":[{"start":18,"value":"BaseNative","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"And I should see the version number \"v0.1.0\"","stepMatchArguments":[{"group":{"start":32,"value":"\"v0.1.0\"","children":[{"start":33,"value":"v0.1.0","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"And I should see links to \"Components\" and \"Documentation\"","stepMatchArguments":[{"group":{"start":22,"value":"\"Components\"","children":[{"start":23,"value":"Components","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":39,"value":"\"Documentation\"","children":[{"start":40,"value":"Documentation","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"And the page title should be \"BaseNative Showcase\"","stepMatchArguments":[{"group":{"start":25,"value":"\"BaseNative Showcase\"","children":[{"start":26,"value":"BaseNative Showcase","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end