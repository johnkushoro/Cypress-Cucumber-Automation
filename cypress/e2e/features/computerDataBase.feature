Feature: Computer Database Management

  Background:
    Given I navigate to the website "COMPUTER_DATABASE"

  Scenario: Adding a New Computer
    When I create and add a new computer
    Then I should see an alert message warning for "Create"

  Scenario: Updating a Newly Created Computer.
    When I update an existing computer

  Scenario: Searching for newly created Computer
    When I perform a search on the recently created
    Then the "main" h1 header with the text containing "computer found" is displayed

  Scenario: Updating Existing Computer Details
    When I conduct an update on existing computer "ARRA"
    Then I should see an alert message warning for "Update"

  Scenario: Searching for existing Computer
    When I perform a search with the query "AN/FSQ-32"
    Then the "main" h1 header with the text containing "computer found" is displayed

  Scenario: Delete Existing Computer
    When I conduct a search and select using the query "AN/FSQ-32"
    And I click on the "Delete this computer" button with the "delete locator"
    Then I should see an alert message warning for "Delete"

  Scenario: Verify Page Number Display After Clicking "Next" Button Multiple Times
    When I click the "Next →" button and update the page number "5" times
    Then the displayed page number should be updated correctly

  Scenario: Verify Consistency Between Header Text and Page Matches Number
    When I click the "Next →" button and update the page number "3" times
    Then the header text should match the number of page matches



