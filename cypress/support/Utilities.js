import DataStore from "../../cypress/support/dataStore";

const dataStore = new DataStore();
Cypress.env('dataStore', dataStore);

export class Utilities {
   generateRandomProductName() {
        const randomSuffix = Math.floor(Math.random() * 10000);
        const now = new Date();
        const formattedDateTime = now.toISOString().replace(/[-T:.]/g, '').slice(0, 14);
        const computerName = `${randomSuffix}${formattedDateTime}`;

        // Use dataStore from Cypress.env
        Cypress.env('dataStore').setValue('computerName', computerName);
        return computerName;
    }
}

export function getDateInPast10Years() {
    const currentDate = new Date();
    const year = currentDate.getFullYear() - 10;
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function getAlertMessagePattern(actionType) {
    const actionPatterns = {
        "Delete": /Computer\s[\w\/-]+\shas been deleted/,
        "Create": /Computer\s[\w\/-]+\shas been created/,
        "Update": /Computer\s[\w\/-]+\shas been updated/
    };

    if (!(actionType in actionPatterns)) {
        throw new Error(`Unexpected actionType: ${actionType}`);
    }

    return actionPatterns[actionType];
}

