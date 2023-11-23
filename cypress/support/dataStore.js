// cypress/e2e/dataStore.js

class DataStore {
    constructor() {
        this.storedValues = {};
    }

    setValue(key, value) {
        this.storedValues[key] = value;
    }

    getValue(key) {
        return this.storedValues[key];
    }
}

export default DataStore;

