document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsCard = document.getElementById("stats-card");

    const easyCircle = document.querySelector(".easy-progress");
    const mediumCircle = document.querySelector(".medium-progress");
    const hardCircle = document.querySelector(".hard-progress");

    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");

    function validateUsername(username) {
        if (username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,20}$/;
        if (!regex.test(username)) {
            alert("Invalid username format");
            return false;
        }
        return true;
    }

    function updateCircle(circle, label, solved, total) {
        const percent = total === 0 ? 0 : Math.round((solved / total) * 100);
        circle.style.background = `conic-gradient(#00ffcc ${percent}%, #333 ${percent}%)`;
        label.textContent = `${solved}/${total}`;
    }

    function displayUserData(data) {
        updateCircle(easyCircle, easyLabel, data.easySolved, data.totalEasy);
        updateCircle(mediumCircle, mediumLabel, data.mediumSolved, data.totalMedium);
        updateCircle(hardCircle, hardLabel, data.hardSolved, data.totalHard);

        statsCard.style.display = "flex";
        statsCard.innerHTML = `
            <p><strong>Total Solved:</strong> ${data.totalSolved}</p>
            <p><strong>Ranking:</strong> ${data.ranking}</p>
            <p><strong>Contribution Points:</strong> ${data.contributionPoints}</p>
        `;
    }

    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Unable to fetch user details.");
            }
            const data = await response.json();
            displayUserData(data);
        } catch (error) {
            statsCard.style.display = "flex";
            statsCard.innerHTML = `<p>No data found or invalid username.</p>`;
        } finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    searchButton.addEventListener("click", function () {
        const username = usernameInput.value;
        if (validateUsername(username)) {
            fetchUserDetails(username);
        }
    });
});
