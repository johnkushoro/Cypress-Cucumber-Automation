const dotenv = require("dotenv");

// Adjust the path to your .env file
dotenv.config({ path: "/Applications/AutomationSuite/Cypress-Cucumber-Automation/.env" });

module.exports = {
    ...process.env, // Load all environment variables from process.env
};


