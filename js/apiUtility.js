(function () {
  class APIUtils {
    constructor() {
      this.baseUrl = "https://67ac62515853dfff53da77eb.mockapi.io/snowflake/v1/users";
    }

    // Fetch API and send data + headers to Apps Script
    async fetchAndSendData() {
      try {
        const response = await fetch(this.baseUrl);
        if (!response.ok) throw new Error("API request failed");

        const data = await response.json();
        const processedData = this.processData(data);
        const headers = this.extractHeaders(data);

        // Send headers & data to Apps Script
        google.script.run.plotDataToSheet(headers, processedData);
        console.log("Data sent to Apps Script:", { headers, processedData });

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    // Extract headers dynamically from object keys
    extractHeaders(data) {
      if (!Array.isArray(data) || data.length === 0) return [];
      return Object.keys(data[0]); // Get object keys as headers
    }

    // Process API response (Convert objects into 2D array for Sheets)
    processData(data) {
      return data.map(obj => Object.values(obj));
    }
  }

  // Expose globally
  window.APIUtils = new APIUtils();
})();
