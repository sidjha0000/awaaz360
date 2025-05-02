const form = document.getElementById("contribution-form");
const contributionsList = document.getElementById("contributions-list");
// get data from localstorage which is saved previously
document.addEventListener("DOMContentLoaded", function() {
    const savedContributions = JSON.parse(localStorage.getItem("communityContributions")) || [];
    savedContributions.forEach(contribution => {
        displayContribution(contribution.name, contribution.contribution);
    });
});
// user click on submit button
form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const contributionText = document.getElementById("contribution").value;

    if (name && contributionText) {
        const contribution = {
            name: name,
            contribution: contributionText
        };

        displayContribution(name, contributionText);

        saveContributionToLocalStorage(contribution);

        form.reset();
    } else {
        alert("Please fill in both fields!");
    }
});

// Function to display a contribution
function displayContribution(name, contribution) {
    const contributionDiv = document.createElement("div");
    contributionDiv.classList.add("contribution");

    const contributionName = document.createElement("div");
    contributionName.classList.add("name");
    contributionName.textContent = `Contributed by: ${name}`;
    
    const contributionText = document.createElement("p");
    contributionText.textContent = `Contribution: ${contribution}`;

    contributionDiv.appendChild(contributionName);
    contributionDiv.appendChild(contributionText);

    contributionsList.appendChild(contributionDiv);
}

// Function to save the contribution to localStorage
function saveContributionToLocalStorage(contribution) {
    let savedContributions = JSON.parse(localStorage.getItem("communityContributions")) || [];
    savedContributions.push(contribution);
    localStorage.setItem("communityContributions", JSON.stringify(savedContributions));
}
