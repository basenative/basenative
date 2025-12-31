Feature: Scroll Area
  As a user
  I want a scrollable area with custom styling capabilities
  So that I can view large content within a fixed container without native OS scrollbars clashing with the UI

  Scenario: Scrolling content
    Given I have a scroll area
    When the content exceeds the container dimensions
    Then the area should be scrollable
    And custom scrollbars should be visible
