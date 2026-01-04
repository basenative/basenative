Feature: System Status Monitoring
  As a user
  I want to see my device's battery and network status
  So that the app can adapt its behavior to my environment

  Scenario: Monitoring Battery Level
    Given the device battery level is 80%
    And the device is charging
    When I view the status page
    Then the battery gauge should show 80%
    And the charging indicator should be visible

  Scenario: Auto Low Power Mode
    Given the device battery level drops below 20%
    And the device is unplugged
    When the battery status updates
    Then the interface should switch to "Low Power Mode" automatically

  Scenario: Network Information
    Given my network connection is "4g"
    When I view the status page
    Then the network type should display "4g"
    And the downlink speed should be displayed
