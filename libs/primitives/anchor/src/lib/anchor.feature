Feature: Anchor Positioning
  As a developer
  I want to anchor an element to a trigger element
  So that I can build tooltips, menus, and dropdowns

  Scenario: Basic positioning
    Given I have a trigger element
    And I have an anchor element linked to the trigger
    When the anchor is visible
    Then it should be positioned relative to the trigger
