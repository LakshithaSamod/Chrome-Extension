async function getMatchData() {

    return await fetch("https://api.cricapi.com/v1/currentMatches?apikey=b90bc44c-977b-4559-b271-a20c05d0e744&offset=0")
        .then(data => data.json())
        .then(data => {
            if (data.status != "success")return;

            const matchesList = data.data;

            if(!matchesList)return [];
            console.log({matchesList});
            
            //get all matchlist
            //const relevantData = matchesList.map(match => `${match.name}, ${match.status}`);

            // Filter the matches according to a series
            const relevantData = matchesList.filter(match => match.series_id == "81b588f0-afb5-49a6-99e5-15ea1ac127a9");

            // Generate the HTML for each match
            const matchesHTML = relevantData.map(match => `
                <div class="match">
                    <div class="name">${match.name}</div>
                    <div class="venue">${match.venue}</div>
                    <div class="status">${match.status}</div>   
                    <br>
                </div>
            `).join('');


            // Set the HTML content in the respective sections
            document.getElementById("match-names").innerHTML = matchesHTML;


            return relevantData;

        })
        .catch(e => console.log(e));
}

getMatchData();
