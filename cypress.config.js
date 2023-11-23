
const { defineConfig } = require("cypress");
const dotenv = require("dotenv"); // Import the dotenv package

// Load environment variables from the .env file
dotenv.config({ path: "/Applications/cypress-cucumber-automation/.env" });

const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
      "file:preprocessor",
      createBundler({
        plugins: [createEsbuildPlugin.default(config)],
      })
  );
  allureWriter(on, config);

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  projectId: '9ui7rv',
  e2e: {
    setupNodeEvents,
    pageLoadTimeout: 120000,
    specPattern: "cypress/e2e/features/*.feature",
    supportFile: "cypress/support/commands.js",
    chromeWebSecurity: false,
    env: {
      CYPRESS_DISABLE_UNCAUGHT_EXCEPTION_HANDLER: "true", // Disable uncaught exception handler
      allureReuseAfterSpec: true,
      COMPUTER_DATABASE: process.env.COMPUTER_DATABASE,
    },
    viewportWidth: 1920, // Set the viewport width to a desktop size
    viewportHeight: 1080,
  },
});