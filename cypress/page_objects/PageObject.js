import sprintf from 'sprintf-js';
import 'cypress-iframe';


export default class PageObject {
    static CHECKBOX_LABEL_LOCATOR = 'label';
    static BUTTON_WITH_TEXT = 'button';
    static BUTTON_WITH_SELECTOR = 'button#add-card-submit:contains';
    static LOGIN_LINK_SELECTOR = '.user-links a[title="%linkText%"]';
    static H1_WITH_TEXT_MAIN = '#main > h1'; // for the h1 within #main
    static H1_WITH_TEXT_GLOBAL = 'h1'; // for all h1 elements
    static H3_WITH_TEXT = 'h3';
    static LINK_WITH_TEXT = 'a:contains("%linkText%")';
    static ERROR_MESSAGE = 'div.error-form';

    static css_sequences = {
        // Define your CSS sequences here

    };

    static css_sequence_with_text(requested_constant, text_list) {
        const texted_list = [];
        const sequence = PageObject.css_sequences[requested_constant];
        for (let ndx = 0; ndx < sequence.length; ndx++) {
            texted_list.push(sprintf(sequence[ndx], text_list[ndx]));
        }
        return texted_list;
    }

    static css_with_text(cssname, text) {
        return sprintf(PageObject[cssname], text);
    }

    static css_with_multiple(cssname, values) {
        return sprintf(PageObject[cssname], ...values);
    }

    static css_with_radio(cssname, label, option) {
        return sprintf(PageObject[cssname], label, option);
    }

    static typeTextIntoLabeledInput(labelText, inputText) {
        cy.contains('label', labelText).should('have.attr', 'for').then((forAttribute) => {
            const inputSelector = `input#${forAttribute}`;
            cy.get(inputSelector).should('exist').should('be.visible').type(inputText);
        });
    }

    static creditCardInputDetails(labelText, inputType, inputValue) {
        const inputSelectors = {
            cardNumber: 'encryptedCardNumber',
            expiryDate: 'encryptedExpiryDate',
            securityCode: 'encryptedSecurityCode',
        };

        if (!(inputType in inputSelectors)) {
            throw new Error(`Invalid input type: ${inputType}`);
        }

        const labelTextSelector = `span.adyen-checkout__label__text:contains("${labelText}")`;
        const iframeSelector = `div.adyen-checkout__input-wrapper span[data-cse="${inputSelectors[inputType]}"] iframe.js-iframe`;

        cy.get(labelTextSelector).should('be.visible');
        cy.getIframe(iframeSelector).find('[data-fieldtype^="encrypted"]').should('exist').focus().type(inputValue);
    }


}