import { Before, After } from "@badeball/cypress-cucumber-preprocessor";

let startTime;

Before((scenario) => {
    startTime = new Date();
    cy.log(`Scenario ${scenario.pickle.name} started at: ${startTime}`);
});

After((scenario) => {
    const endTime = new Date();
    const duration = endTime - startTime;

    console.log(`Scenario ${scenario.pickle.name} Started at: ${startTime}`);
    console.log(`Scenario ${scenario.pickle.name} Ended at: ${endTime}`);
    console.log(`Scenario ${scenario.pickle.name} Duration: ${duration} milliseconds`);

    if (scenario.result.status === 'failed') {
        console.log(`Scenario ${scenario.pickle.name} FAILED with message: ${scenario.result.message}`);
    } else {
        console.log(`Scenario ${scenario.pickle.name} PASSED.`);
    }
});

