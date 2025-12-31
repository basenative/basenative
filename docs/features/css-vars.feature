Feature: CSS Custom Properties Resolution

  Scenario: Critical CSS variables should resolve correctly
    Given I am on the home page
    Then the CSS variable "--color-surface-base" should resolve to a valid value
    And the CSS variable "--color-primary" should resolve to a valid value
    And the CSS variable "--blur-glass-sm" should resolve to a valid value
