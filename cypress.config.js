
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const environmentVariables = require("./load-env.js");

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on(
      "file:preprocessor",
      createBundler({
        plugins: [createEsbuildPlugin.default(config)],
      })
  );
  allureWriter(on, config);

  return config;
}
module.exports = defineConfig({
  projectId: '9ui7rv',
  e2e: {
    setupNodeEvents,
    pageLoadTimeout: 120000,
    specPattern: "cypress/e2e/features/*.feature",
    video: true,
    screenshots: true,
    supportFile: "cypress/support/commands.js",
    chromeWebSecurity: false,
    env: {
      CYPRESS_DISABLE_UNCAUGHT_EXCEPTION_HANDLER: "true",
      allureReuseAfterSpec: true,
      ...environmentVariables,
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});
