Feature: Portal
  As a developer
  I want to render content in a different part of the DOM (e.g. body)
  So that I can avoid z-index and overflow issues for modals/overlays

  Scenario: Portaling content
    Given I have a portal outlet
    And I have content to portal
    When I attach the content to the portal
    Then the content should be rendered in the outlet container
