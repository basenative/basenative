Feature: Asset Generation
  As a developer
  I want to generate PWA assets from a single SVG source
  So that I can maintain consistent branding across all platforms without manual work

  Scenario: Generate assets from source SVG
    Given I have a source SVG file "logo.svg"
    And I have an output directory "src/public"
    When I run the asset generator script
    Then I should see "favicon.ico" in the output directory
    And I should see "apple-touch-icon.png" with padding in the output directory
    And I should see "icon-192.png" with padding in the output directory
    And I should see "icon-512.png" with padding in the output directory
    And I should see "og-image.png" with centered logo and background in the output directory

  Scenario: Index HTML Configuration
    Given the assets have been generated
    When I check "index.html"
    Then the "favicon.svg" link tag should be present
    And the "apple-touch-icon" link tag should be present
    And the "og:image" meta tag should be present
    And the "theme-color" meta tags should be present for light and dark modes
