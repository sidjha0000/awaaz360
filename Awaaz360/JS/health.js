document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('healthForm');
    const submittedList = document.getElementById('submittedIssues');

    // Load existing data
    showReports();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const report = {
            name: document.getElementById('name').value,
            issue: document.getElementById('issue').value,
            location: document.getElementById('location').value,
            time: new Date().toLocaleString()
        };

        let reports = JSON.parse(localStorage.getItem('healthReports')) || [];
        reports.push(report);
        localStorage.setItem('healthReports', JSON.stringify(reports));

        form.reset();
        showReports();
    });

    function showReports() {
        submittedList.innerHTML = '';
        const reports = JSON.parse(localStorage.getItem('healthReports')) || [];

        reports.reverse().forEach((report) => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${report.name}</strong> reported: ${report.issue} 
                            <br>📍 <em>${report.location}</em> | 🕒 ${report.time}`;
            submittedList.appendChild(li);
        });
    }
});
