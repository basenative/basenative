Feature: Core Library
  The core library provides foundational utilities for the Angular CDK.

  Background:
    Given the application is using the BaseNative Angular CDK

  @coercion
  Scenario: Boolean coercion handles various inputs
    When I use coerceBooleanProperty with different values
    Then "true" should return true
    And "false" should return false
    And "" (empty string) should return true (attribute presence)
    And null should return false
    And undefined should return false

  @coercion
  Scenario: Number coercion handles various inputs
    When I use coerceNumberProperty with different values
    Then numeric strings like "42" should return 42
    And non-numeric strings should return the fallback value
    And null should return the fallback value
    And mixed strings like "123hello" should return the fallback value

  @di
  Scenario: Injection tokens provide browser globals
    When I inject DOCUMENT_REF
    Then I should receive the document object
    When I inject WINDOW_REF
    Then I should receive the window object

  @platform
  Scenario: Feature detection reports browser capabilities
    Given SUPPORTS is imported from feature-detection
    Then it should have boolean properties for:
      | Feature              |
      | anchorPositioning    |
      | popover              |
      | containerQueries     |
      | hasSelector          |
      | startingStyle        |
      | fieldSizing          |
      | dialog               |
      | inert                |

  @signals
  Scenario: Signal store manages reactive state
    Given I create a signal store with initial state
    When I call $update with a partial state
    Then the state should be merged, not replaced
    And computed signals for each property should reflect the update

  @signals
  Scenario: Async computed handles promises
    Given I use computedAsync with a promise-returning function
    Then the initial value should be returned immediately
    And after the promise resolves, the signal should update
