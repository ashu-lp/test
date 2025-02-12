(function () {
  class APIUtils {
    constructor() {
      this.baseUrl = "https://67ac62515853dfff53da77eb.mockapi.io/snowflake/v1/users";
    }

    // Send API Request Details to Apps Script
    async fetchAndSendData() {
      const requestDetails = {
        url: this.baseUrl,
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        body: null // No body for GET request
      };

      try {
        // Wait for Apps Script to fetch data
        const rawResponse = await this.fetchDataFromAppsScript(requestDetails);

        // Process API response
        const processedData = this.processData(rawResponse);
        const headers = this.extractHeaders(rawResponse);

        // Send processed data to Apps Script for plotting
        this.plotDataToSheet(headers, processedData);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    // Fetch data from Apps Script & return a Promise
    fetchDataFromAppsScript(requestDetails) {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler(resolve) // Resolve promise when data is received
          .withFailureHandler(reject) // Reject promise if there is an error
          .fetchDataFromAPI(requestDetails);
      });
    }

    // Extract headers dynamically from object keys
    extractHeaders(data) {
      if (!Array.isArray(data) || data.length === 0) return [];
      return Object.keys(data[0]); // Extract headers from the first object
    }

    // Process API response (Convert objects into 2D array for Sheets)
    processData(data) {
      return data.map(obj => Object.values(obj));
    }

    // Plot data to Google Sheets via Apps Script
    plotDataToSheet(headers, data) {
      google.script.run.plotDataToSheet(headers, data);
    }
  }

  // Expose globally
  window.APIUtils = new APIUtils();
})();
