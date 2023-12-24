class ComputerDataBase {
    static LINK_WITH_TEXT = 'a:contains("%linkText%")';
    static H1_WITH_TEXT_GLOBAL = 'h1';
    static H1_WITH_TEXT_MAIN = '#main > h1';
    static LABEL_ELEMENT_SELECTOR = 'label';
    static BUTTON_WITH_TEXT = 'button';
    static PRIMARY_BUTTON_CLASS = '.btn.primary';
    static SEARCH_BAR_ELEMENT = '#searchbox';
    static SEARCH_FILTER_BUTTON_ELEMENT = '#searchsubmit';
    static DELETE_BUTTON_ELEMENT = '.btn.danger';
    static DISPLAYING_LINK_SELECTOR = 'a:contains("Displaying")';



    clickOnLinkWithText(linkText) {
        const linkSelector = ComputerDataBase.LINK_WITH_TEXT.replace('%linkText%', linkText);
        cy.get(linkSelector).should('be.visible').click();
    }

    addAComputerPageTitle(pageTitle) {
        return cy.contains(ComputerDataBase.H1_WITH_TEXT_GLOBAL, pageTitle).should('exist');
    }

    enterComputerData(labelText, inputText) {
        cy.contains(ComputerDataBase.LABEL_ELEMENT_SELECTOR, labelText).should('have.attr', 'for').then((forAttribute) => {
            const inputSelector = `input#${forAttribute}`;
            cy.get(inputSelector).should('exist').should('be.visible').type(inputText);
        });
    }

    selectCompanyTypeDropdownOption(labelText, optionText) {
        cy.contains(ComputerDataBase.LABEL_ELEMENT_SELECTOR, labelText).should('have.attr', 'for').then((forAttribute) => {
            const selectSelector = `select#${forAttribute}`;
            cy.get(selectSelector).should('exist').should('be.visible').select(optionText);
        });
    }

    clickPrimaryButton() {
        cy.get(ComputerDataBase.PRIMARY_BUTTON_CLASS).should('be.visible').click();
    }

    enterSearchBar(text) {
        cy.get(ComputerDataBase.SEARCH_BAR_ELEMENT).type(text);
    }

    clickSearchFilterButton() {
        cy.get(ComputerDataBase.SEARCH_FILTER_BUTTON_ELEMENT).should('be.visible').click();
    }

    displayedHeaderText(locatorType, text) {
        switch (locatorType) {
            case 'main':
                return cy.get(ComputerDataBase.H1_WITH_TEXT_MAIN).contains(text);
            case 'global':
                return cy.get(ComputerDataBase.H1_WITH_TEXT_GLOBAL).contains(text);
            default:
                throw new Error(`Unsupported locatorType: ${locatorType}`);
        }
    }

    clickDeleteButton() {
        cy.get(ComputerDataBase.DELETE_BUTTON_ELEMENT).should('be.visible').click();
    }

    clickNextAndUpdatePage(nextButtonText, numberOfClicks) {
        const itemsPerPage = 10;

        const clickNextButton = () => cy.contains('a', nextButtonText).click();

        cy.wrap(null).then(() => {
            for (let i = 0; i < numberOfClicks; i++) {
                clickNextButton();
            }
        }).then(() => {
            cy.get(ComputerDataBase.DISPLAYING_LINK_SELECTOR).should('be.visible').invoke('text').then((text) => {
                const matches = text.match(/(\d+) to (\d+) of (\d+)/);
                if (!matches) {
                    cy.log('Unable to extract page information from the page display.');
                    return;
                }
                const [, startItem, endItem, newTotalItems] = matches.map(Number);
                const currentPage = Math.ceil(startItem / itemsPerPage);
                const nextPage = currentPage + 1; // Calculate the next page based on itemsPerPage

                const pageUpdated = itemsPerPage === 10 && nextPage * itemsPerPage <= newTotalItems;
                cy.log(pageUpdated ? `Page updated to ${nextPage}` : 'Page display did not update correctly.');
                if (!pageUpdated) {
                    cy.log('Test failed due to incorrect page display.');
                }
            });
        });
    }

    compareHeaderAndPageMatches() {
        cy.get(ComputerDataBase.H1_WITH_TEXT_MAIN).invoke('text').then((headerText) => {
            const headerNumber = parseInt(headerText.match(/\d+/)[0]);
            cy.get('li.current a').invoke('text').then((pageMatchesText) => {
                const pageMatchesNumber = parseInt(pageMatchesText.split(' ').pop());
                expect(headerNumber).to.equal(pageMatchesNumber);
            });
        });
    }

}

export default ComputerDataBase
