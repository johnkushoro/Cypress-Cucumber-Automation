# Cypress Cucumber Automation

**Version:** 2.2.0

**Description:** This project serves as a template to kickstart your automation efforts with Cucumber and Cypress.

## Usage

### Scripts

- `cypress:runner`: Opens Cypress in Chrome for end-to-end testing.
- `cypress:runner:headed`: Runs Cypress tests in headless mode with Chrome.
- `cypress:execution`: Executes all Cypress tests located in the `cypress/e2e/features/` directory.
- `cypress:execution-tags`: Executes Cypress tests with the `@mobile` tag.
- `cypress:execution-allure`: Executes Cypress tests with Allure reporting enabled.
- `allure:clear`: Clears previous Allure results and reports.
- `allure:report`: Generates Allure HTML report from the results.
- `allure:history`: Moves Allure report history to the results directory and removes the previous report.
- `cypress:run:computerDataBase headed`: Runs tests for the `computerDataBase.feature` file in headless mode.

### Dependencies

- Cypress and various Cypress plugins for testing.
- Allure for test reporting.
- Other dependencies for test automation.

## Configuration

- `.env`: Environment variables file, including URLs and test data.
- `cypress.config.js`: Cypress configuration, including preprocessor setup.

## Author

Cucumber

## License

[ISC License](link-to-license-file)

# Computer Database Cypress Test Suite

This Cypress test suite is designed to automate testing for a computer database management application. It includes various scenarios to test different aspects of the application's functionality.

## Test Suite Structure

The test suite consists of the following key components:

### DataStore (`cypress/e2e/dataStore.js`)

The `DataStore` class is responsible for storing and retrieving values during test execution. It is used to store data that can be reused in different test scenarios.

```javascript
// Actual code snippet for DataStore
class DataStore {
    // ...constructor and methods...
}
export default DataStore;

Utilities (cypress/support/utilities.js)
The Utilities class provides utility functions for test automation, such as generating random addresses, UK postal codes, mobile numbers, and nicknames. It also includes functions for interacting with elements on the page.
// Actual code snippet for Utilities
class Utilities {
    // ...methods...
}
export default Utilities;

PageObject (cypress/page_objects/PageObject.js)
The PageObject class defines static locators and utility functions for interacting with elements on the page. It uses CSS selectors to identify page elements.
// Actual code snippet for PageObject
class PageObject {
    // ...methods...
}
export default PageObject;

Step Definitions (cypress/e2e/step_definitions/com_db_html_stepdefs.js)
This file contains step definitions for Cucumber scenarios defined in the feature file. It uses the utilities and page objects to interact with the application.
// Actual code snippet for Step Definitions
// ...step definitions...

Feature File (cypress/e2e/features/computerDataBase.feature)
The feature file defines scenarios for testing various aspects of computer database management. Each scenario specifies a set of steps that should be executed during the test.
# Example scenario
Scenario: Adding a New Computer
    Given I navigate to the computer database application
    When I create a new computer record
    Then the computer record should be saved successfully

Running the Tests
To run the tests, follow these steps:

1) Ensure you have Cypress installed.
2) Clone the repository.
3) Navigate to the project directory.
4) Run Cypress with the appropriate command.
For example:
# Run all tests
npm run cypress:execution

# Run specific test
npm run cypress:run:computerDataBase headed

Scenarios
Here are the scenarios covered by the test suite:

- Adding a New Computer: Ensures that a new computer record can be created successfully.
- Updating a Newly Created Computer: Verifies the ability to update a computer record after creation.
- Searching for a Newly Created Computer: Tests the search functionality for recently added computers.
- Updating Existing Computer Details: Checks if existing computer details can be updated.
- Searching for an Existing Computer: Verifies the search functionality for existing computers.
- Deleting an Existing Computer: Ensures that computer records can be deleted.
- Verifying Page Number Display After Clicking "Next" Button Multiple Times: Validates the pagination functionality.

For detailed steps and expected outcomes, refer to the feature file.




