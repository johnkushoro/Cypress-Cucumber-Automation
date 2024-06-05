import { Before, After } from "@badeball/cypress-cucumber-preprocessor";

let startTime, finishTime;

function formatDateTime(date) {
    // Format the date to show hours, minutes, and seconds in HH:mm:ss format
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function loadConfig() {
    return {};
}

function calculateDuration(start, end) {
    const diffInSeconds = Math.floor((end - start) / 1000);
    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;

    let durationString = '';

    if (hours > 0) {
        durationString += `${hours} ${hours > 1 ? 'hours' : 'hour'}`;
    }

    if (minutes > 0) {
        if (durationString) durationString += ', ';
        durationString += `${minutes} minutes`;
    }

    if (seconds > 0 || (!hours && !minutes)) {
        if (durationString) durationString += ', ';
        durationString += `${seconds} seconds`;
    }

    return durationString;
}

Before(() => {
    try {
        startTime = new Date();
        cy.log(`Test execution started at: ${formatDateTime(startTime)}`);

        const config = loadConfig();
        cy.log(`Loaded configuration: ${JSON.stringify(config)}`);

        cy.clearCookies();
        cy.clearLocalStorage();

        cy.log("Environment setup completed successfully.");
    } catch (error) {
        cy.log("Error during setup: " + error.message);
        throw error;
    }
});

After(() => {
    try {
        finishTime = new Date();
        cy.log(`Test execution finished at: ${formatDateTime(finishTime)}`);

        const duration = calculateDuration(startTime, finishTime);
        cy.log(`Total Test Time: ${duration}`);

        cy.log("Test teardown completed successfully.");
    } catch (error) {
        cy.log("Error during teardown: " + error.message);
        throw error;
    }
});