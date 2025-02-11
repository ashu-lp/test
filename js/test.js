(function () {
    class FormLibrary {
        constructor(containerId = 'form-container') {
            this.containerId = containerId;
        }

        createForm() {
            const container = document.getElementById(this.containerId);
            if (!container) {
                console.error(`Container with id '${this.containerId}' not found.`);
                return;
            }

            container.innerHTML = `
                <form id="basic-form">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                    <button type="submit">Submit</button>
                </form>
            `;

            document.getElementById('basic-form').addEventListener('submit', (event) => {
                event.preventDefault();
                const formData = new FormData(event.target);
                console.log('Form Submitted:', Object.fromEntries(formData.entries()));
            });
        }

        static utilities = {
            capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
            generateRandomNumber: (min = 0, max = 100) => Math.floor(Math.random() * (max - min + 1)) + min,
            formatDate: (date) => new Date(date).toLocaleDateString(),
        };
    }

    window.FormLibrary = FormLibrary;
})();
