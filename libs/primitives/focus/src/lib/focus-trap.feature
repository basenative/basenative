Feature: Focus Trap
  As a keyboard user
  I want my focus to be trapped within a specific area (like a modal)
  So that I don't accidentally tab out of the context

  Scenario: Trapping focus
    Given I have a focus trap
    And the trap is active
    When I press tab on the last focusable element
    Then focus should move to the first focusable element

  Scenario: Initial focus
    Given I have a focus trap
    When the trap initializes
    Then focus should move to the specified initial element
