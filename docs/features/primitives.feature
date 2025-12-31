Feature: Primitives Library
  Low-level UI primitives for building accessible components.

  Background:
    Given the application is using the BaseNative Angular CDK

  @anchor
  Scenario: Anchor directive establishes CSS anchor positioning
    Given I apply the anchor directive with an ID
    Then the element should have anchor-name CSS property set
    And the anchor name should be prefixed with "--"

  @anchor
  Scenario: Anchored directive positions content relative to anchor
    Given I apply the anchored directive with a target anchor ID
    Then the element should have position-anchor CSS property
    And the inset-area should reflect the position input
    And the margin should reflect the offset input
    And the popover attribute should be set by default

  @focus
  Scenario: FocusTrap keeps focus within an element
    Given I apply the focusTrap directive to a container
    When the directive is enabled
    Then the first focusable element should receive focus
    And sibling elements should become inert
    When the directive is disabled
    Then siblings should no longer be inert
    And focus should return to the previously focused element

  @dialog
  Scenario: Dialog component wraps native dialog element
    Given I create a dialog with the modal attribute
    When the open signal is set to true
    Then the native dialog should open as a modal
    When the open signal is set to false
    Then the native dialog should close

  @dialog
  Scenario: Dialog emits close events
    Given I have an open dialog
    When the dialog is closed
    Then the closed output should emit with the return value
