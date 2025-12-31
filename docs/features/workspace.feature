Feature: Workspace Structure
  As a developer
  I want a robust Monorepo structure
  So that I can scale the application with consistent standards

  Scenario: Workspace Configuration
    Given the workspace is initialized
    Then the "libs/core" library should exist
    And the "libs/tokens" library should exist
    And the "libs/primitives" directory should contain "anchor"
    And the "libs/primitives" directory should contain "dialog"
    And the "libs/primitives" directory should contain "focus"

  Scenario: Strict QA Standards
    Given I run the lint command
    Then all projects should pass without errors
    When I run the test command with coverage
    Then all projects should have 100% code coverage
    And all builds should pass successfully
