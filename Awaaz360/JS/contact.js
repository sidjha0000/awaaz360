document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name && email && message) {
        // Save to localStorage
        const contactEntry = {
            name: name,
            email: email,
            message: message,
            timestamp: new Date().toISOString()
        };

        let contacts = JSON.parse(localStorage.getItem("contactMessages")) || [];
        contacts.push(contactEntry);
        localStorage.setItem("contactMessages", JSON.stringify(contacts));

        // Confirmation
        document.getElementById("confirmationMsg").textContent = "Thanks for reaching out! 💚 We'll get back to you soon.";
        document.getElementById("contactForm").reset();
    }
});
