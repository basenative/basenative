Feature: Welcome Component
  As a user
  I want to see a welcoming landing page
  So that I understand what BaseNative is

  Scenario: Welcome Page Display
    Given I open the showcase application
    Then I should see the "BaseNative" logo
    And I should see the version number "v0.1.0"
    And I should see links to "Components" and "Documentation"
    And the page title should be "BaseNative Showcase"
