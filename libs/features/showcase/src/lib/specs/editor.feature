Feature: Native File Editor
  As a user
  I want to open and save files from my local system
  So that I can use the app as a text editor without uploading data

  Scenario: Opening a local file
    Given I have a local file "notes.txt" with content "Buy milk"
    When I click "Open File" and select "notes.txt"
    Then the editor content should display "Buy milk"

  Scenario: Saving changes to a local file
    Given I have opened "notes.txt"
    And I have typed " and cookies" into the editor
    When I click "Save File"
    Then the local file "notes.txt" should contain "Buy milk and cookies"
