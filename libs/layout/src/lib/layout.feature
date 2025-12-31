Feature: Layout Library
  The layout library provides structural primitives for organizing content.

  Background:
    Given the application is using the BaseNative Angular CDK

  @card
  Scenario: Card displays content in a contained surface
    Given I create an article with the card attribute
    Then the article should have the semantic-card class
    And it should support variant "outlined" by default
    And it should support variant "elevated" for shadow depth

  @card
  Scenario: Card sections organize header, content, and footer
    Given I use header with cardHeader attribute
    Then it should have the semantic-card-header class
    Given I use section with cardContent attribute
    Then it should have the semantic-card-content class
    Given I use footer with cardFooter attribute
    Then it should have the semantic-card-footer class

  @list
  Scenario: List displays items without default styling
    Given I create a ul or ol with the list attribute
    Then it should have the semantic-list class
    And default list styles should be removed

  @list
  Scenario: List items support multiple element types
    Given I use li with item attribute
    Then it should have the semantic-list-item class
    Given I use a with item attribute
    Then it should be an interactive list item with link styling
    Given I use button with item attribute
    Then it should be an interactive list item with button styling
