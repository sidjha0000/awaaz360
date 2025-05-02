document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('requirementForm');
    const list = document.getElementById('requirementList');

    const loadRequirements = () => {
        const data = JSON.parse(localStorage.getItem('villageRequirements')) || [];
        list.innerHTML = '';
        data.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${item.title}</strong> (${item.category})<br>
                <p>${item.description}</p>
            `;
            list.appendChild(li);
        });
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('reqTitle').value;
        const description = document.getElementById('reqDescription').value;
        const category = document.getElementById('reqCategory').value;

        const newRequirement = { title, description, category };
        const existing = JSON.parse(localStorage.getItem('villageRequirements')) || [];
        existing.push(newRequirement);
        localStorage.setItem('villageRequirements', JSON.stringify(existing));

        form.reset();
        loadRequirements();
    });

    loadRequirements();
});
