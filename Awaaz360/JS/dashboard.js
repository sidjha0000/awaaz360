// Load reports from localStorage when page loads
window.onload = () => {
    displayReports();
};

document.getElementById('reportForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('problemTitle').value;
    const description = document.getElementById('problemDescription').value;
    const fileInput = document.getElementById('problemFile');
    let fileName = '';

    // get the file name from the input
    if (fileInput.files.length > 0) {
        fileName = fileInput.files[0].name;
    }

    const newReport = {
        title,
        description,
        fileName,
        status: "Submitted",
        progress: 10
    };

    let reports = JSON.parse(localStorage.getItem("reports")) || [];
    reports.push(newReport);
    localStorage.setItem("reports", JSON.stringify(reports));

    // Clear form
    document.getElementById('reportForm').reset();
    displayReports();
});

function displayReports() {
    const reportList = document.getElementById('reportList');
    reportList.innerHTML = '';

    const reports = JSON.parse(localStorage.getItem("reports")) || [];

    if (reports.length === 0) {
        reportList.innerHTML = "<p>No reports submitted yet.</p>";
        return;
    }

    reports.forEach((report, index) => {
        const reportCard = document.createElement('div');
        reportCard.classList.add('report-card');

        reportCard.innerHTML = `
            <h3>${report.title}</h3>
            <p><strong>Description:</strong> ${report.description}</p>
            ${report.fileName ? `<p><strong>File:</strong> ${report.fileName}</p>` : ''}
            <p><strong>Status:</strong> ${report.status}</p>
            <p><strong>Progress:</strong> <progress value="${report.progress}" max="100"></progress></p>
        `;

        reportList.appendChild(reportCard);
    });
}
