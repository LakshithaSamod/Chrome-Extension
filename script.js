//const apiKey="b90bc44c-977b-4559-b271-a20c05d0e744"
const apiKey="e11a3504-41bf-411e-9e4c-649c3c0057f2"

// Fetch match list from the API
fetch(`https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`)
    .then(response => response.json())
    .then(data => {
        const matchList = document.getElementById('match-list');

        const matchesList = data.data;

        if(!matchesList)return [];
        console.log({matchesList});

        //get all matchlist
        //const relevantData = matchesList.map(match => `${match.name}, ${match.status}`);

        // Filter the matches according to a series
        const relevantData = matchesList.filter(match => match.series_id == "81b588f0-afb5-49a6-99e5-15ea1ac127a9");

        // Display each match in the list
        matchesList.forEach(match => {
            const li = document.createElement('li');
            li.textContent = match.name;
            li.addEventListener('click', () => showMatchDetails(match));
            matchList.appendChild(li);
        });
    })
    .catch(error => console.log(error));

// Fetch and display match details
function showMatchDetails(match) {
    const pageHeading = document.getElementById('page-heading');
    const matchList = document.getElementById('match-list');
    const matchDetails = document.getElementById('match-details');
    const matchInfo = document.getElementById('match-info');
    const goBackButton = document.getElementById('go-back');

    // Update page heading and hide match list
    pageHeading.textContent = 'Match Details';
    matchList.style.display = 'none';

    // Show match details and populate with the clicked match
    matchDetails.style.display = 'block';
    const scoreHtml = match.score.map(inning => `
            <h3 class="light-blue">${inning.inning}</h3>
            <p>Runs: ${inning.r}</p>
            <p>Wickets: ${inning.w}</p>
            <p>Overs: ${inning.o}</p>
      `).join('');
    matchInfo.innerHTML = `
            <h2 class="light-green"><strong>${match.name}</strong></h2>
            <p><center>@ ${match.venue} - ${match.date}</center></p>
            <h3><center>Status</center></h3>
            <p><center>${match.status}</center></p>
            <p>${scoreHtml}</p>
        `;
    // Show the "Go Back" button
    goBackButton.style.display = 'block';

}

// Go back to match list
function goBack() {
    const pageHeading = document.getElementById('page-heading');
    const matchList = document.getElementById('match-list');
    const matchDetails = document.getElementById('match-details');
    const matchInfo = document.getElementById('match-info');
    const goBackButton = document.getElementById('go-back');

    // Update page heading and show match list
    pageHeading.textContent = 'Match List';
    matchList.style.display = 'block';

    // Hide match details and clear the content
    matchDetails.style.display = 'none';
    matchInfo.innerHTML = '';

    // Hide the "Go Back" button
    goBackButton.style.display = 'none';
}