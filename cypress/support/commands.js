// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cypress/support/commands.js

import 'cypress-iframe';
import PageObject from "../page_objects/PageObject";
import DataStore from "./dataStore";
import 'cypress-xpath';

const dataStore = new DataStore();
Cypress.env('dataStore', dataStore);

Cypress.Commands.add('hoverOverElement', (selector) => {
    cy.get(selector).trigger('mouseover');
});

Cypress.Commands.add('hoverAndClickElement', (buttonText) => {
    cy.get('.user-account').trigger('mouseover').click();

    cy.get('.user-panel.logged-out').invoke('css', 'display', 'block');

    const loginLinkSelector = PageObject.LOGIN_LINK_SELECTOR.replace('%linkText%', buttonText);
    cy.get(loginLinkSelector).click();
});


Cypress.Commands.add('getIframe', (iframe) => {
    return cy.get(iframe).its('0.contentDocument.body').should('be.visible').then(cy.wrap);
});

Cypress.Commands.add('clickOnButtonUsingText', (buttonText) => {
    const regex = new RegExp(buttonText, "i"); // "i" flag makes it case-insensitive
    cy.contains('button', regex).click({force: true});
});

Cypress.Commands.add('enterEnvironmentVariableIntoInput', (envVariable, labelText) => {
    const inputValue = Cypress.env(envVariable);
    if (!inputValue) {
        throw new Error(`Environment variable ${envVariable} not found in .env file`);
    }
    console.log(`Value of ${envVariable}: ${inputValue}`);
    PageObject.typeTextIntoLabeledInput(labelText, inputValue);
});

Cypress.Commands.add('clickButtonWithTextOrSelector', (buttonTextToClick, selectorType) => {
    const regex = new RegExp(buttonTextToClick, 'i');

    switch (selectorType) {
        case 'text':
            cy.contains(PageObject.BUTTON_WITH_TEXT, regex).click({force: true});
            break;
        case 'selector':
            cy.get('button#add-card-submit:contains("' + buttonTextToClick + '")')
                .should('be.visible')
                .should('be.enabled') // Ensure it's clickable
                .click({force: true});
            break;
        default:
            throw new Error(`Unsupported selectorType: ${selectorType}`);
    }
});

Cypress.Commands.add('clickLinkWithText', (linkText) => {
    const linkSelector = PageObject.LINK_WITH_TEXT.replace('%linkText%', linkText);
    cy.get(linkSelector)
        .should('be.visible')
        .click();
});

Cypress.Commands.add('getH1WithText', (locatorType, text) => {
    switch (locatorType) {
        case 'main':
            return cy.get(PageObject.H1_WITH_TEXT_MAIN).contains(text);
        case 'global':
            return cy.get(PageObject.H1_WITH_TEXT_GLOBAL).contains(text);
        default:
            throw new Error(`Unsupported locatorType: ${locatorType}`);
    }
});

Cypress.Commands.add('typeTextIntoLabeledInput', (labelText, inputText) => {
    cy.contains('label', labelText).should('have.attr', 'for').then((forAttribute) => {
        const inputSelector = `input#${forAttribute}`;
        cy.get(inputSelector).should('exist').should('be.visible').type(inputText);
    });
});

Cypress.Commands.add('selectOptionFromDropdown', (labelText, optionText) => {
    cy.contains('label', labelText).should('have.attr', 'for').then((forAttribute) => {
        const selectSelector = `select#${forAttribute}`;
        cy.get(selectSelector).should('exist').should('be.visible').select(optionText); // Use .select() to choose the option by its visible text
    });
});

Cypress.Commands.add('generateRandomComputerName', () => {
    const randomSuffix = Math.floor(Math.random() * 10000);
    const now = new Date();
    const formattedDateTime = now.toISOString().replace(/[-T:.]/g, '').slice(0, 14);
    const computerName = `${randomSuffix}${formattedDateTime}`;

    dataStore.setValue('computerName', computerName);
    return computerName;
});

Cypress.Commands.add('getPast10YearsDates', () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear() - 10;
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
});

Cypress.Commands.add('getCurrentDate', () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
});

Cypress.Commands.add('clickButtonWithText', (buttonTextToClick, selectorType) => {
    const regex = new RegExp(buttonTextToClick, "i"); // "i" flag makes it case-insensitive

    switch (selectorType) {
        case "text":
            cy.contains(regex).click({force: true});
            break;
        case "selector":
            cy.get(`.btn:contains("${buttonTextToClick}")`).should('be.visible').should('be.enabled').click({force: true});
            break;
        default:
            // Handle other cases or provide an error message
            throw new Error(`Unsupported selectorType: ${selectorType}`);
    }
});

Cypress.Commands.add('clickNext', (n) => {
    const clickNext = (remainingClicks) => {
        if (remainingClicks <= 0) {
            return;
        }

        cy.contains('a', 'Next →').click();
        clickNext(remainingClicks - 1); // Recursive call to click the link again
    };

    clickNext(n); // Start the recursive clicking
});

Cypress.Commands.add('typeInSearchBox', (text) => {
    cy.get('#searchbox').type(text);
});

Cypress.Commands.add('clickElementByExpectedText', (expectedText, identifier) => {
    let cssSelector;

    switch (expectedText) {
        case "Delete this computer":
            cssSelector = identifier === "delete locator" ? "input[value='Delete this computer']" : null;
            break;
        case "Save this computer":
            cssSelector = identifier === "save locator" ? "input[value='Save this computer']" : null;
            break;
        default:
            throw new Error(`Unsupported expectedText: ${expectedText}`);
    }

    if (cssSelector) {
        cy.get(cssSelector).should('be.visible').should('be.enabled').click({ force: true });
    } else {
        throw new Error(`Unsupported identifier: ${identifier}`);
    }
});

Cypress.Commands.add('verifyAlertMessage', (identifierType) => {
    const dynamicPartPattern =
        identifierType === "Delete"
            ? /Computer\s[\w\/-]+\shas been deleted/
            : identifierType === "Create"
                ? /Computer\s[\w\/-]+\shas been created/
                : identifierType === "Update"
                    ? /Computer\s[\w\/-]+\shas been updated/
                : undefined;

    if (!dynamicPartPattern) {
        throw new Error(`Unexpected identifierType: ${identifierType}`);
    }

    cy.get('.alert-message.warning')
        .should('be.visible')
        .invoke('text')
        .then((text) => expect(text).to.match(dynamicPartPattern));
});

Cypress.Commands.add('clickNextAndUpdatePage', (nextButtonText, numberOfClicks) => {
    const itemsPerPage = 10;
    const pageDisplaySelector = 'a:contains("Displaying")';
    const clickNextButton = () => cy.contains('a', nextButtonText).click();
    const validatePageDisplay = (text) => {
        const matches = text.match(/(\d+) to (\d+) of (\d+)/);
        if (!matches) {
            cy.log('Unable to extract page information from the page display.');
            return;
        }
        const [, , endItem, newTotalItems] = matches.map(Number);
        const nextPage = Math.ceil(endItem / itemsPerPage);
        if (nextPage * itemsPerPage <= newTotalItems) {
            cy.log(`Page updated to ${nextPage}`);
        } else {
            cy.log('Page display did not update correctly.');
        }
    };

    cy.wrap(null).then(() => {for (let i = 0; i < numberOfClicks; i++) {clickNextButton();
            }
        }).then(() => cy.get(pageDisplaySelector).should('be.visible')).invoke('text').then(validatePageDisplay);
});
