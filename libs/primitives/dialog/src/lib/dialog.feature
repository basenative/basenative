Feature: Dialog
  As a developer
  I want to present content in a modal dialog
  So that I can focus user attention on a specific task

  Scenario: Opening a dialog
    Given I have a dialog template
    When I open the dialog
    Then the content should be rendered in a portal
    And focus should be trapped within the dialog
    And a backdrop should be visible

  Scenario: Closing a dialog
    Given an open dialog
    When I press Escape
    Then the dialog should close
    And focus should return to the prompt
