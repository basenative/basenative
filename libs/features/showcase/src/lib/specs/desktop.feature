Feature: Desktop Integration
  As a user
  I want to interact with the system clipboard and notifications
  So that the web app feels like a native desktop application

  Scenario: Copying content to clipboard
    Given I enter "Hello native world" into the clipboard input
    When I click the "Copy" button
    Then the system clipboard should contain "Hello native world"

  Scenario: Pasting content from clipboard
    Given the system clipboard contains "Pasted text"
    When I click the "Paste" button
    Then the pasted content display should show "Pasted text"

  Scenario: Requesting Notification Permission
    Given notification permission is "default"
    When I click "Request Permissions"
    Then the browser should prompt for notification access

  Scenario: Sending a Notification
    Given notification permission is "granted"
    When I click "Send Notification"
    Then a system notification should appear with title "BaseNative"
