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

      // Call Apps Script function & process response when received
      google.script.run
        .withSuccessHandler((rawResponse) => {
          const processedData = this.processData(rawResponse);
          const headers = this.extractHeaders(rawResponse);
          this.plotDataToSheet(headers, processedData);
        })
        .fetchDataFromAPI(requestDetails);
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
