Feature: Signal Store and Demo

  Scenario: Creating a store with setup function
    Given I have a state interface "DemoState" with "count"
    When I create a signal store with "initialState" and a "setup" function
    And the "setup" function defines a computed signal "double" based on "count"
    Then the store should expose "count" as a readonly signal
    And the store should expose "double" as a readonly signal

  Scenario: Updating state with patchState
    Given I have a signal store with "count: 0"
    When I call "patchState" with "count: 1"
    Then the store state "count" should be 1

  Scenario: Async Resource Integration
    Given I have a signal store with a "resource" for "searchResults"
    And the resource depends on a "query" signal
    When I update the "query" signal to "angular"
    Then the "searchResults" resource should trigger a load
    And the "searchResults" value should eventually contain results for "angular"

  Scenario: Linked Signal for Input Binding
    Given I have a signal store with a "linkedSignal" for "activeQuery"
    And "activeQuery" is linked to source "query"
    When the source "query" changes
    Then "activeQuery" should update to match the source
    When I manually set "activeQuery"
    Then "activeQuery" should update to the manual value
