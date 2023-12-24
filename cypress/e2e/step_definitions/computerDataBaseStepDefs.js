/// <reference types="cypress" />

import {Given, When, Then,} from "@badeball/cypress-cucumber-preprocessor";
import '../../support/commands';
import 'cypress-iframe';
import ComputerDataBase from "../page_objects/ComputerDataBase";
import {getCurrentDate, getDateInPast10Years, Utilities} from "../../support/Utilities";
import {getAlertMessagePattern} from "../../support/Utilities";


const utilities = new Utilities();
const computerDataBase = new ComputerDataBase();

Given('I navigate to the website {string}', (urlParameter) => {
    const baseUrl = Cypress.env(urlParameter);
    if (!baseUrl) {
        throw new Error(`The ${urlParameter} environment variable is not set.`);
    }
    cy.visit(baseUrl);
});

When(/^I create and add a new computer$/, function () {
    computerDataBase.clickOnLinkWithText('Add a new computer');
    computerDataBase.displayedHeaderText('global', 'Add a computer').should('exist');
    computerDataBase.enterComputerData('Computer name', utilities.generateRandomProductName());
    computerDataBase.enterComputerData('Introduced', getDateInPast10Years());
    computerDataBase.enterComputerData('Discontinued', getCurrentDate());
    computerDataBase.selectCompanyTypeDropdownOption('Company', 'IBM');
    computerDataBase.clickPrimaryButton();
});

Then(/^I should see an alert message warning for "([^"]*)"$/, (identifierType) => {
    getAlertMessagePattern(identifierType);
});

When(/^I update an existing computer$/, () => {
    const dataStore = Cypress.env('dataStore');
    const storedComputerName = dataStore ? dataStore.getValue('computerName') : null;

    if (!storedComputerName) {
        throw new Error('Stored computer name not found in DataStore');
    }
    computerDataBase.enterSearchBar(storedComputerName);
});

When(/^I perform a search on the recently created$/, () => {
    const dataStore = Cypress.env('dataStore');
    const storedComputerName = dataStore ? dataStore.getValue('computerName') : null;

    if (!storedComputerName) {
        throw new Error('Stored computer name not found in DataStore');
    }
    computerDataBase.enterSearchBar(storedComputerName);
    computerDataBase.clickSearchFilterButton();
});

Then(/^the "([^"]*)" h1 header with the text containing "([^"]*)" is displayed$/, (locatorType, expectedText) => {
    computerDataBase.displayedHeaderText(locatorType, expectedText).should('be.visible');
});

When(/^I conduct an update on existing computer "([^"]*)"$/, (searchQuery) => {
    computerDataBase.enterSearchBar(searchQuery);
    computerDataBase.clickSearchFilterButton();
    computerDataBase.clickOnLinkWithText('ARRA');
    computerDataBase.displayedHeaderText('main', 'Edit computer').should('be.visible');
    computerDataBase.enterComputerData('Computer name', utilities.generateRandomProductName());
    computerDataBase.enterComputerData('Introduced', getDateInPast10Years());
    computerDataBase.enterComputerData('Discontinued', getCurrentDate());
    computerDataBase.selectCompanyTypeDropdownOption('Company', 'IBM');
    computerDataBase.clickPrimaryButton();
});

When(/^I perform a search with the query "([^"]*)"$/, (searchQuery) => {
    computerDataBase.enterSearchBar(searchQuery);
    computerDataBase.clickSearchFilterButton();
});

When(/^I conduct a search and select using the query "([^"]*)"$/, (searchQuery) => {
    computerDataBase.enterSearchBar(searchQuery);
    computerDataBase.clickSearchFilterButton();
    computerDataBase.clickOnLinkWithText('AN/FSQ-32');
});

Then(/^I click on the page delete button$/, () => {
    computerDataBase.clickDeleteButton();
});

When(/^I click the "([^"]*)" button and update the page number "([^"]*)" times$/, (nextButtonText, numberOfClicks) => {
    computerDataBase.clickNextAndUpdatePage(nextButtonText, parseInt(numberOfClicks));
});


Then(/^the displayed page number should be updated correctly$/, () => {
    cy.get('a').should('contain', 'Displaying'); // Check if the element contains the text "Displaying"
    cy.get('a').should('contain', 'of').should('contain', '574'); // Check if the element contains "of" and "574"
});

Then(/^the header text should match the number of page matches$/, () => {
    computerDataBase.compareHeaderAndPageMatches();
});

export {computerDataBase};