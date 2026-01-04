Feature: Visually Hidden Component
  As an accessibility-conscious developer
  I want to hide content visually but keep it available to screen readers
  So that I can provide context to assistive technology users without cluttering the UI

  Scenario: Hiding content
    Given I have a visually hidden component
    When I project content into it
    Then the content should not be visible on the screen
    But the content should be present in the accessibility tree
