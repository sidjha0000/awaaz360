document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('foodForm');
    const entryList = document.getElementById('entryList');

    // Load existing entries
    showEntries();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const entry = {
            name: document.getElementById('name').value,
            type: document.getElementById('type').value,
            description: document.getElementById('description').value,
            location: document.getElementById('location').value,
            time: new Date().toLocaleString()
        };

        let data = JSON.parse(localStorage.getItem('foodBankEntries')) || [];
        data.push(entry);
        localStorage.setItem('foodBankEntries', JSON.stringify(data));

        form.reset();
        showEntries();
    });

    function showEntries() {
        entryList.innerHTML = '';
        const entries = JSON.parse(localStorage.getItem('foodBankEntries')) || [];

        entries.reverse().forEach((entry, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${entry.type} by ${entry.name}</strong><br>
                            ${entry.description}<br>
                            📍 <em>${entry.location}</em> | 🕒 ${entry.time}`;
            entryList.appendChild(li);
        });
    }
});
