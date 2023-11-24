import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
import '../../support/commands';
import PageObject from "../../page_objects/PageObject";
import {Utilities} from "../../support/Utilities"; // Relative path to commands.js
import DataStore from '../../support/dataStore';

When(/^I create and add a new computer$/, () => {
    cy.clickLinkWithText('Add a new computer');
    cy.getH1WithText('global' ,'Add a computer').should('exist'); // Assert that the H1 element exists
    cy.generateRandomComputerName().then(randomComputerName => cy.typeTextIntoLabeledInput('Computer name', randomComputerName));
    cy.getPast10YearsDates().then(pastDates => cy.typeTextIntoLabeledInput('Introduced', pastDates));
    cy.getCurrentDate().then(currentDate => cy.typeTextIntoLabeledInput('Discontinued', currentDate));
    cy.selectOptionFromDropdown('Company', 'IBM');
    cy.clickButtonWithText("Create this computer", "text");
});

When(/^I update an existing computer$/, () => {
    const dataStore = Cypress.env('dataStore');
    const storedComputerName = dataStore ? dataStore.getValue('computerName') : null;

    if (!storedComputerName) {
        throw new Error('Stored computer name not found in DataStore');
    }
    cy.typeInSearchBox(storedComputerName);
});

When(/^I perform a search on the recently created$/, () => {
    const dataStore = Cypress.env('dataStore');
    const storedComputerName = dataStore ? dataStore.getValue('computerName') : null;

    if (!storedComputerName) {
        throw new Error('Stored computer name not found in DataStore');
    }
    cy.typeInSearchBox(storedComputerName);
    cy.clickButtonWithText('Filter by name', 'text');
});

Given(/^I select the link "([^"]*)" in the appropriate section$/, (linkText) => {
    cy.clickLinkWithTextOrNextPage(linkText);
});

When(/^I perform a search with the query "([^"]*)"$/, (searchQuery) => {
    cy.typeInSearchBox(searchQuery);
    cy.clickButtonWithText('Filter by name',"text");
});

Then(/^the "([^"]*)" h1 header with the text containing "([^"]*)" is displayed$/, (locatorType, expectedText) => {
    cy.getH1WithText(locatorType, expectedText).should('be.visible');
});

Then(/^I click on the "([^"]*)" button with the "([^"]*)"$/, (expectedText, identifier) => {
    cy.clickElementByExpectedText(expectedText, identifier);
});

When(/^I conduct a search and select using the query "([^"]*)"$/, (searchQuery) => {
    cy.typeInSearchBox(searchQuery);
    cy.clickButtonWithText('Filter by name',"text");
    cy.clickLinkWithText('AN/FSQ-32');
});

When(/^I conduct an update on existing computer "([^"]*)"$/, (searchQuery) => {
    cy.typeInSearchBox(searchQuery);
    cy.clickButtonWithText('Filter by name',"text");
    cy.clickLinkWithText('ARRA');
    cy.getH1WithText('main', 'Edit computer').should('be.visible');
    cy.generateRandomComputerName().then(randomComputerName => cy.typeTextIntoLabeledInput('Computer name', randomComputerName));
    cy.getPast10YearsDates().then(pastDates => cy.typeTextIntoLabeledInput('Introduced', pastDates));
    cy.getCurrentDate().then(currentDate => cy.typeTextIntoLabeledInput('Discontinued', currentDate));
    cy.selectOptionFromDropdown('Company', 'IBM');
    cy.clickElementByExpectedText("Save this computer", "save locator");
});

Then(/^I should see an alert message warning for "([^"]*)"$/, (ldentifirerType) => {
    cy.verifyAlertMessage(ldentifirerType);
});

When(/^I click the "([^"]*)" button and update the page number "([^"]*)" times$/, (nextButtonText, numberOfClicks) => {
    cy.clickNextAndUpdatePage(nextButtonText, parseInt(numberOfClicks));
});

Then(/^the displayed page number should be updated correctly$/, () => {
    cy.get('a').should('contain', 'Displaying'); // Check if the element contains the text "Displaying"
    cy.get('a').should('contain', 'of').should('contain', '574'); // Check if the element contains "of" and "574"
});

Then(/^the header text should match the number of page matches$/, () => {
    cy.compareHeaderAndPageMatches();
});