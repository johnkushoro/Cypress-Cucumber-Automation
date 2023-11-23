/// <reference types="cypress" />

import {Given, When, Then,} from "@badeball/cypress-cucumber-preprocessor";
import PageObject from '../../page_objects/PageObject'; // Use "../../" to go up two levels
import '../../support/commands'; // Relative path to commands.js
import 'cypress-iframe';
import {Utilities} from '../../support/Utilities'; // Adjust the path as needed
import waitUntil from "cypress-wait-until";

const {useIframe, dontUseIframe} = require('../../support/Utilities');

Given(/^I enter the iframe with ID "([^"]*)"$/, (iframeId) => {
    useIframe(iframeId);
});

Then('I exit the iframe', () => {
    dontUseIframe();
});

Given(/^I navigate to the website "([^"]*)"$/, (baseUrlKey) => {
    const baseUrl = Cypress.env(baseUrlKey);
    cy.visit(baseUrl);
});
