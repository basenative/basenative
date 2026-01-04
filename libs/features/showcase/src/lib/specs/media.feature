Feature: Media Gallery & Sharing
  As a user
  I want to browse media with performant effects and share content
  So that the experience feels premium and integrated

  Scenario: 3D Scroll Effect
    Given I am viewing the media gallery
    When I scroll down the page
    Then the gallery items should transform with a 3D perspective tilt
    And the gallery items should fade in as they enter the viewport

  Scenario: Native Sharing
    Given the browser supports the Web Share API
    When I click the "Share" button
    Then the native share sheet should open with title "BaseNative Showcase"
    And the share status should display "Shared successfully!" if completed
