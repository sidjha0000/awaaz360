window.onload = function () {
    const reportList = document.getElementById("reportList");
    let reports = JSON.parse(localStorage.getItem("reports")) || [];

    reports.forEach((report, index) => {
        const container = document.createElement("div");
        container.classList.add("report-card");

        container.innerHTML = `
            <h3>${report.title}</h3>
            <p>${report.description}</p>
            <p><strong>Status:</strong> ${report.status || 'Pending'}</p>
            <label>Upload Progress Image:
                <input type="file" onchange="handleImageUpload(event, ${index})">
            </label>
            <label>Progress (%):
                <input type="number" id="progress-${index}" value="${report.progress || 0}" min="0" max="100">
            </label>
            <button onclick="updateStatus(${index}, 'Under Progress')">Mark as Under Progress</button>
            <button onclick="updateStatus(${index}, 'Completed')">Mark as Completed</button>
        `;

        reportList.appendChild(container);
    });
};

function updateStatus(index, status) {
    let reports = JSON.parse(localStorage.getItem("reports")) || [];
    const progressInput = document.getElementById(`progress-${index}`);
    reports[index].status = status;
    reports[index].progress = progressInput.value;
    localStorage.setItem("reports", JSON.stringify(reports));
    location.reload();
}

function handleImageUpload(event, index) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        let reports = JSON.parse(localStorage.getItem("reports")) || [];
        reports[index].reviewImage = e.target.result;
        localStorage.setItem("reports", JSON.stringify(reports));
    };
    reader.readAsDataURL(file);
}
