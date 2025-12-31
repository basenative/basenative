Feature: Forms and Wizards

  As a user
  I want to interact with semantic forms and multi-step wizards
  So that I can provide data easily and intuitively

  Scenario: Basic Input Interaction
    Given I open the forms showcase page
    When I type "user@example.com" into the "Email" input
    Then the "Email" input should have the value "user@example.com"
    And the specific input should be valid

  Scenario: Form Wizard Navigation
    Given I open the forms showcase page
    Then I should see "Step 1" of the wizard
    When I click the "Next" button
    Then I should see "Step 2" of the wizard
    When I click the "Previous" button
    Then I should see "Step 1" of the wizard
